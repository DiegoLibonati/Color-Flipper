import { screen, within } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { OFFICIAL_BODY } from "./tests/jest.constants";

import { rgbToHex } from "./helpers/rgbToHex";

describe("index.ts", () => {
  describe("When the page is rendered for the first time.", () => {
    const INITIAL_COLOR = "#FFFFFF";

    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;

      require("./index.ts");
      document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It must render the header with your title and author's name.", () => {
      const nav = screen.getByRole("navigation");

      expect(nav).toBeInTheDocument();

      const title = within(nav).getByRole("heading", {
        name: /color flipper/i,
      });
      const hexColors = within(nav).getByText(/hexcolors/i);
      const author = within(nav).getByText(/diegolibonati/i);

      expect(title).toBeInTheDocument();
      expect(hexColors).toBeInTheDocument();
      expect(author).toBeInTheDocument();
    });

    test("It should render the container showing the default color #FFFFFF and the button to change color.", () => {
      const card = document.querySelector(".card") as HTMLElement;

      expect(card).toBeInTheDocument();

      const color = within(card).getByText(new RegExp(INITIAL_COLOR));
      const btnFlip = within(card).getByRole("button", {
        name: /flip/i,
      });

      expect(color).toBeInTheDocument();
      expect(btnFlip).toBeInTheDocument();
    });
  });

  describe("When the Flip button is touched.", () => {
    const INITIAL_COLOR = "#FFFFFF";

    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;

      require("./index.ts");
      document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It must change the color of the body and must also change the color of the text.", async () => {
      const color = screen.getByText(new RegExp(INITIAL_COLOR));
      const btnFlip = screen.getByRole("button", {
        name: /flip/i,
      });

      expect(color).toBeInTheDocument();
      expect(btnFlip).toBeInTheDocument();
      expect(document.body.style.backgroundColor).toBe("");

      await user.click(btnFlip);

      const newColorText =
        document.querySelector(".card__hex")?.textContent;

      expect(color.textContent).toBe(newColorText);
      expect(
        color.style.color.startsWith("#")
          ? color.style.color
          : rgbToHex(color.style.color)
      ).toBe(newColorText);
      expect(
        document.body.style.backgroundColor.startsWith("#")
          ? document.body.style.backgroundColor
          : rgbToHex(document.body.style.backgroundColor)
      ).toBe(newColorText);
    });
  });
});
