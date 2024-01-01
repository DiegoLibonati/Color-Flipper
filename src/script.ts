const btnFlip = document.getElementById("btnFlip") as HTMLButtonElement;
const colorHexText = document.querySelector(".colorHexText") as HTMLSpanElement;

const hexLetters: string = "0123456789ABCDEF";

btnFlip.addEventListener("click", () => {
  let hexColor: string = "#";

  for (let i: number = 0; i <= 5; i++) {
    hexColor += hexLetters.charAt(
      Math.floor(Math.random() * hexLetters.length)
    );
  }

  document.body.style.backgroundColor = `${hexColor}`;

  colorHexText.textContent = hexColor;

  colorHexText.style.color = hexColor;
});
