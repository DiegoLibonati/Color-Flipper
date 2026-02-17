import type { Page } from "@/types/pages";

import { hexLetters } from "@/constants/vars";

import "@/pages/ColorFlipperPage/ColorFlipperPage.css";

export const ColorFlipperPage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "color-flipper-page";

  main.innerHTML = `
    <section class="card-wrapper">
        <div class="card">
            <h2 class="card__text">
                Background color: <span class="card__hex">#FFFFFF</span>
            </h2>

            <button
                id="btnFlip"
                class="card__btn-flip"
                aria-label="flip color"
            >
                Flip
            </button>
        </div>
    </section>
  `;

  const btnFlip = main.querySelector<HTMLButtonElement>(".card__btn-flip");

  const changeColor = (): void => {
    const colorHexText = main.querySelector<HTMLSpanElement>(".card__hex");

    if (!colorHexText) return;

    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
      hexColor += hexLetters.charAt(
        Math.floor(Math.random() * hexLetters.length)
      );
    }

    main.style.backgroundColor = hexColor;
    colorHexText.textContent = hexColor;
    colorHexText.style.color = hexColor;
  };

  btnFlip?.addEventListener("click", changeColor);

  main.cleanup = (): void => {
    btnFlip?.removeEventListener("click", changeColor);
  };

  return main;
};
