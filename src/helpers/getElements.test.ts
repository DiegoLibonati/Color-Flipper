import { getElements } from "./getElements";

import { OFFICIAL_BODY } from "../../tests/jest.constants";

describe("getElements.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It must render the elements of the document that the 'getElements' function exports.", () => {
      const { btnFlip, colorHexText } = getElements();

      expect(btnFlip).toBeInTheDocument();
      expect(colorHexText).toBeInTheDocument();
    });
  });
});
