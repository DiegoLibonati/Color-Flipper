// let colors = ["red", "blue", "yellow"];

let hexLetters = "0123456789ABCDEF";

const btn = document.getElementById("hola")
const color = document.querySelector(".color")



btn.addEventListener('click', () =>{
// let random = Math.floor(Math.random() * colors.length);
hexColor = "#";

for (let i = 0; i<=5; i++){
    hexColor += hexLetters.charAt(Math.floor(Math.random() * hexLetters.length))
}

document.body.style.backgroundColor = `${hexColor}`;

color.textContent = hexColor;

color.style.color = hexColor;

});

