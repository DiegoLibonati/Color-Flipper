const btnFlip = document.getElementById("btnFlip");
const colorHexText = document.querySelector(".colorHexText");

const hexLetters = "0123456789ABCDEF";

btnFlip.addEventListener("click", () => {
  let hexColor = "#";

  for (let i = 0; i <= 5; i++) {
    hexColor += hexLetters.charAt(
      Math.floor(Math.random() * hexLetters.length)
    );
  }

  document.body.style.backgroundColor = `${hexColor}`;

  colorHexText.textContent = hexColor;

  colorHexText.style.color = hexColor;
});
