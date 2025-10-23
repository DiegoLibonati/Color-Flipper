import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { ColorFlipperPage } from "@src/pages/ColorFlipperPage/ColorFlipperPage";

import { rgbToHex } from "@src/helpers/rgbToHex";

import { hexLetters } from "@src/constants/vars";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const container = ColorFlipperPage();
  document.body.appendChild(container);
  return { container: container };
};

jest.mock("@src/constants/vars", () => ({
  hexLetters: "0123456789ABCDEF",
}));

describe("ColorFlipperPage.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  describe("General Tests.", () => {
    test("It should render the main component structure", () => {
      const { container } = renderComponent();

      expect(container).toBeInstanceOf(HTMLElement);
      expect(container.className).toBe("color-flipper-page");
      expect(container.querySelector(".card-wrapper")).toBeInTheDocument();
    });

    test("It should render card with title and button", () => {
      renderComponent();

      const title = screen.getByText(/Background color:/i);
      const button = screen.getByRole("button", { name: /flip/i });

      expect(title).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    test("It should render initial hex color text", () => {
      renderComponent();

      const hexText = document.querySelector<HTMLSpanElement>(".card__hex");

      expect(hexText).toBeInTheDocument();
      expect(hexText?.textContent).toBe("#FFFFFF");
    });

    test("It should have correct initial background color", () => {
      const { container } = renderComponent();

      expect(container.style.backgroundColor).toBe("");
    });

    test("It should have flip button with correct attributes", () => {
      renderComponent();

      const button = screen.getByRole("button", { name: /flip/i });

      expect(button).toHaveClass("card__btn-flip");
      expect(button.id).toBe("btnFlip");
      expect(button.textContent?.trim()).toBe("Flip");
    });
  });

  describe("Color Change Tests.", () => {
    test("It should change background color when flip button is clicked", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      const { container } = renderComponent();

      const button = screen.getByRole("button", { name: /flip/i });
      await user.click(button);

      const bgColor = rgbToHex(container.style.backgroundColor);
      expect(bgColor).toBe("#000000");
    });

    test("It should update hex text when flip button is clicked", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderComponent();

      const button = screen.getByRole("button", { name: /flip/i });
      await user.click(button);

      const hexText = document.querySelector<HTMLSpanElement>(".card__hex");
      expect(hexText?.textContent).toBe("#000000");
    });

    test("It should update hex text color to match background", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderComponent();

      const button = screen.getByRole("button", { name: /flip/i });
      await user.click(button);

      const hexText = document.querySelector<HTMLSpanElement>(".card__hex");
      const textColor = rgbToHex(hexText!.style.color);
      expect(textColor).toBe("#000000");
    });

    test("It should generate valid hex color format", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0.5);
      renderComponent();

      const button = screen.getByRole("button", { name: /flip/i });
      await user.click(button);

      const hexText = document.querySelector<HTMLSpanElement>(".card__hex");
      const hexPattern = /^#[0-9A-F]{6}$/;

      expect(hexText?.textContent).toMatch(hexPattern);
    });

    test("It should generate different colors on multiple clicks", async () => {
      const randomValues = [0, 0.5, 0.99];
      let callIndex = 0;

      jest.spyOn(Math, "random").mockImplementation(() => {
        const value = randomValues[callIndex % randomValues.length];
        callIndex++;
        return value;
      });

      renderComponent();

      const button = screen.getByRole("button", { name: /flip/i });
      const hexText = document.querySelector<HTMLSpanElement>(".card__hex");

      await user.click(button);
      const firstColor = hexText?.textContent;

      jest.spyOn(Math, "random").mockReturnValue(0.99);

      await user.click(button);
      const secondColor = hexText?.textContent;

      expect(firstColor).not.toBe(secondColor);
    });
  });

  describe("Multiple Interactions Tests.", () => {
    test("It should handle multiple consecutive clicks", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0.25);
      const { container } = renderComponent();

      const button = screen.getByRole("button", { name: /flip/i });

      await user.click(button);
      await user.click(button);
      await user.click(button);

      const hexText = document.querySelector<HTMLSpanElement>(".card__hex");

      expect(container.style.backgroundColor).toBeTruthy();
      expect(hexText?.textContent).toMatch(/^#[0-9A-F]{6}$/);
    });

    test("It should maintain color consistency across all elements", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0.75);
      const { container } = renderComponent();

      const button = screen.getByRole("button", { name: /flip/i });
      await user.click(button);

      const hexText = document.querySelector<HTMLSpanElement>(".card__hex");
      const expectedColor = hexText?.textContent;
      const bgColor = rgbToHex(container.style.backgroundColor);
      const textColor = rgbToHex(hexText!.style.color);

      expect(bgColor).toBe(expectedColor);
      expect(textColor).toBe(expectedColor);
    });
  });

  describe("Random Color Generation Tests.", () => {
    test("It should use hexLetters constant for color generation", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderComponent();

      const button = screen.getByRole("button", { name: /flip/i });
      await user.click(button);

      const hexText = document.querySelector<HTMLSpanElement>(".card__hex");
      const generatedColor = hexText?.textContent || "";

      const colorChars = generatedColor.substring(1);
      for (const char of colorChars) {
        expect(hexLetters).toContain(char);
      }
    });

    test("It should generate 6 character hex color (plus #)", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0.33);
      renderComponent();

      const button = screen.getByRole("button", { name: /flip/i });
      await user.click(button);

      const hexText = document.querySelector<HTMLSpanElement>(".card__hex");
      expect(hexText?.textContent?.length).toBe(7);
    });
  });
});
