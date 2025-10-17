import { hexLetters } from "@src/constants/vars";

import "@src/pages/ColorFlipperPage/ColorFlipperPage.css";

const changeColor = (): void => {
  const colorFlipperPage = document.querySelector<HTMLElement>(
    ".color-flipper-page"
  );
  const colorHexText = document.querySelector<HTMLSpanElement>(".card__hex");

  let hexColor: string = "#";

  for (let i: number = 0; i <= 5; i++) {
    hexColor += hexLetters.charAt(
      Math.floor(Math.random() * hexLetters.length)
    );
  }

  colorFlipperPage!.style.backgroundColor = `${hexColor}`;

  colorHexText!.textContent = hexColor;
  colorHexText!.style.color = hexColor;
};

export const ColorFlipperPage = (): HTMLElement => {
  const main = document.createElement("main");
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
                aria-label="flip"
                aria-label="flip color"
            >
                Flip
            </button>
        </div>
    </section>
  `;

  const btnFlip = main.querySelector<HTMLButtonElement>(".card__btn-flip");

  btnFlip?.addEventListener("click", changeColor);

  return main;
};
