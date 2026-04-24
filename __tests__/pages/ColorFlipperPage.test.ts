import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import ColorFlipperPage from "@/pages/ColorFlipperPage/ColorFlipperPage";

const renderPage = (): Page => {
  const element = ColorFlipperPage();
  document.body.appendChild(element);
  return element;
};

describe("ColorFlipperPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    it("should display the initial hex color as #FFFFFF", () => {
      renderPage();
      expect(screen.getByText("#FFFFFF")).toBeInTheDocument();
    });

    it("should render the flip button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: /flip background color/i })
      ).toBeInTheDocument();
    });

    it("should render the flip button with Flip as its visible text", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: /flip background color/i })
      ).toHaveTextContent("Flip");
    });
  });

  describe("behavior", () => {
    describe("when Math.random returns 0", () => {
      beforeEach(() => {
        jest.spyOn(Math, "random").mockReturnValue(0);
      });

      it("should change the hex color text when the button is clicked", async () => {
        const user = userEvent.setup();
        renderPage();

        await user.click(
          screen.getByRole("button", { name: /flip background color/i })
        );

        expect(screen.getByText("#000000")).toBeInTheDocument();
      });

      it("should update the hex span text color when the button is clicked", async () => {
        const user = userEvent.setup();
        renderPage();

        await user.click(
          screen.getByRole("button", { name: /flip background color/i })
        );

        expect(screen.getByText("#000000")).toHaveStyle({ color: "#000000" });
      });

      it("should update the page background color when the button is clicked", async () => {
        const user = userEvent.setup();
        const page = renderPage();

        await user.click(
          screen.getByRole("button", { name: /flip background color/i })
        );

        expect(page).toHaveStyle({ backgroundColor: "#000000" });
      });
    });

    it("should generate a valid hex color format on click", async () => {
      const user = userEvent.setup();
      renderPage();

      await user.click(
        screen.getByRole("button", { name: /flip background color/i })
      );

      expect(screen.getByText(/^#[0-9A-F]{6}$/)).toBeInTheDocument();
    });
  });

  describe("cleanup", () => {
    it("should have a cleanup method", () => {
      const page = renderPage();
      expect(typeof page.cleanup).toBe("function");
    });

    it("should not throw when cleanup is called", () => {
      const page = renderPage();
      expect(() => page.cleanup?.()).not.toThrow();
    });

    it("should not change the color after cleanup when the button is clicked", async () => {
      const user = userEvent.setup();
      const page = renderPage();

      page.cleanup?.();

      await user.click(
        screen.getByRole("button", { name: /flip background color/i })
      );

      expect(screen.getByText("#FFFFFF")).toBeInTheDocument();
    });
  });
});
