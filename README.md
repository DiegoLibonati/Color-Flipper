# Color-Flipper-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

## Description

I made a web page that allows to generate a random color every time we click on `Flip`, it will be put as background and it will also tell us the color in hex to be able to use it anywhere.

## Technologies used

1. Javascript
2. CSS3
3. HTML5

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/78`](https://www.diegolibonati.com.ar/#/project/78)

## Video

https://user-images.githubusercontent.com/99032604/198900630-8a4972c8-96b3-4d91-8f44-cf2e904a4e1b.mp4

## Documentation

In this case we get the button that will be activated every time we want to change the background color:

```
const btnFlip = document.getElementById("btnFlip");
const colorHexText = document.querySelector(".colorHexText");
```

Let us assign to the variable `hexLetters` all possible letters without repeating that can be found in a hexadecimal color:

```
const hexLetters = "0123456789ABCDEF";
```

To the `btnFlip` we assign a click event that when receiving a click will set a variable that will be the color to assign. Then it will go through the maximum amount of letters that has a hexdecimal, in each iteration will be added to the `hexColor` a random character of `hexLetters` at the end of iteration will be assigned the background and the text pertinent to the color:

```
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
```
