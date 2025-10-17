import { ColorFlipperPage } from "@src/pages/ColorFlipperPage/ColorFlipperPage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const colorFlipperPage = ColorFlipperPage();
  app.appendChild(colorFlipperPage);
};

document.addEventListener("DOMContentLoaded", onInit);
