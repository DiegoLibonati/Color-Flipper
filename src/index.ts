import "@/index.css";
import { ColorFlipperPage } from "@/pages/ColorFlipperPage/ColorFlipperPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const colorFlipperPage = ColorFlipperPage();
  app.appendChild(colorFlipperPage);
};

document.addEventListener("DOMContentLoaded", onInit);
