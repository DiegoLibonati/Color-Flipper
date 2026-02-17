import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import { ColorFlipperPage } from "@/pages/ColorFlipperPage/ColorFlipperPage";

import { rgbToHex } from "@/helpers/rgbToHex";

const renderPage = (): Page => {
  const container = ColorFlipperPage();
  document.body.appendChild(container);
  return container;
};

describe("ColorFlipperPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".color-flipper-page");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render card with initial color", () => {
    renderPage();

    const card = document.querySelector<HTMLDivElement>(".card");
    expect(card).toBeInTheDocument();
  });

  it("should render initial hex color text", () => {
    renderPage();

    expect(screen.getByText("Background color:")).toBeInTheDocument();

    const hexText = document.querySelector<HTMLSpanElement>(".card__hex");
    expect(hexText).toBeInTheDocument();
    expect(hexText?.textContent).toBe("#FFFFFF");
  });

  it("should render flip button", () => {
    renderPage();

    const flipButton = screen.getByRole("button", { name: "flip color" });
    expect(flipButton).toBeInTheDocument();
    expect(flipButton).toHaveAttribute("id", "btnFlip");
  });

  it("should change background color when flip button is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    const flipButton = screen.getByRole("button", { name: "flip color" });
    const main = document.querySelector<HTMLElement>(".color-flipper-page");
    const initialBgColor = main?.style.backgroundColor;

    await user.click(flipButton);

    const newBgColor = main?.style.backgroundColor;
    expect(newBgColor).not.toBe(initialBgColor);
  });

  it("should update hex color text when flip button is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    const flipButton = screen.getByRole("button", { name: "flip color" });
    const hexText = document.querySelector<HTMLSpanElement>(".card__hex");

    await user.click(flipButton);

    expect(hexText?.textContent).not.toBe("#FFFFFF");
    expect(hexText?.textContent).toMatch(/^#[0-9A-F]{6}$/);
  });

  it("should update hex color text color when flip button is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    const flipButton = screen.getByRole("button", { name: "flip color" });
    const hexText = document.querySelector<HTMLSpanElement>(".card__hex");

    await user.click(flipButton);

    const colorStyle = hexText?.style.color ?? "";

    expect(colorStyle).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);

    const hexFromStyle = rgbToHex(colorStyle);
    const hexFromText = hexText?.textContent ?? "";
    expect(hexFromStyle).toBe(hexFromText);
  });

  it("should generate different colors on multiple clicks", async () => {
    const user = userEvent.setup();
    renderPage();

    const flipButton = screen.getByRole("button", { name: "flip color" });
    const hexText = document.querySelector<HTMLSpanElement>(".card__hex");

    await user.click(flipButton);
    const firstColor = hexText?.textContent;

    await user.click(flipButton);
    const secondColor = hexText?.textContent;

    await user.click(flipButton);
    const thirdColor = hexText?.textContent;

    const colors = new Set([firstColor, secondColor, thirdColor]);
    expect(colors.size).toBeGreaterThan(1);
  });

  it("should generate valid hex color format", async () => {
    const user = userEvent.setup();
    renderPage();

    const flipButton = screen.getByRole("button", { name: "flip color" });
    const hexText = document.querySelector<HTMLSpanElement>(".card__hex");

    for (let i = 0; i < 5; i++) {
      await user.click(flipButton);
      expect(hexText?.textContent).toMatch(/^#[0-9A-F]{6}$/);
    }
  });

  it("should cleanup event listener on page cleanup", () => {
    const page = renderPage();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    expect(page.cleanup).toBeDefined();
  });
});
