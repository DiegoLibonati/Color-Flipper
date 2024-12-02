import { getElements } from "./getElements";

const INITIAL_HTML: string = `
    <main>
        <div class="contenedor_div">
            Background color: <span class="colorHexText">#FFFFFF</span>
        </div>

        <button id="btnFlip" aria-label="flip color">Flip</button>
    </main>
`;

beforeEach(() => {
  const body = INITIAL_HTML;

  document.body.innerHTML = body;
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It must render the elements of the document that the 'getElements' function exports.", () => {
  const { btnFlip, colorHexText } = getElements();

  expect(btnFlip).toBeInTheDocument();
  expect(colorHexText).toBeInTheDocument();
});
