import { screen, within } from "@testing-library/dom";
import user from "@testing-library/user-event";

import fs from "fs";
import path from "path";

import { rgbToHex } from "./helpers/rgbToHex";

const INITIAL_HTML: string = fs.readFileSync(
  path.resolve(__dirname, "../index.html"),
  "utf8"
);
const INITIAL_COLOR = "#FFFFFF";

beforeEach(() => {
  jest.resetModules();

  const body = INITIAL_HTML.match(/<body[^>]*>([\s\S]*?)<\/body>/i)![1];
  document.body.innerHTML = body;

  require("./index.ts");
  document.dispatchEvent(new Event("DOMContentLoaded"));
});

afterEach(() => {
  document.body.innerHTML = "";
});

describe("When the page is rendered for the first time.", () => {
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
    const card = document.querySelector(".contenedor") as HTMLElement;

    expect(card).toBeInTheDocument();

    const color = within(card).getByText(new RegExp(INITIAL_COLOR));
    const btnFlip = within(card).getByRole("button", {
      name: /flip color/i,
    });

    expect(color).toBeInTheDocument();
    expect(btnFlip).toBeInTheDocument();
  });
});

describe("When the Flip button is touched.", () => {
  test("It must change the color of the body and must also change the color of the text.", async () => {
    const color = screen.getByText(new RegExp(INITIAL_COLOR));
    const btnFlip = screen.getByRole("button", {
      name: /flip color/i,
    });

    expect(color).toBeInTheDocument();
    expect(btnFlip).toBeInTheDocument();
    expect(document.body.style.backgroundColor).toBe("");

    await user.click(btnFlip);

    const newColorText = document.querySelector(".colorHexText")?.textContent;

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
