import { getElements } from "@src/helpers/getElements";

const hexLetters: string = "0123456789ABCDEF";

const changeColor = (): void => {
  const { colorHexText } = getElements();

  let hexColor: string = "#";

  for (let i: number = 0; i <= 5; i++) {
    hexColor += hexLetters.charAt(
      Math.floor(Math.random() * hexLetters.length)
    );
  }

  document.body.style.backgroundColor = `${hexColor}`;

  colorHexText.textContent = hexColor;
  colorHexText.style.color = hexColor;
};

const onInit = () => {
  const { btnFlip } = getElements();

  btnFlip.addEventListener("click", changeColor);
};

document.addEventListener("DOMContentLoaded", onInit);
