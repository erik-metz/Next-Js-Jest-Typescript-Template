import { render, screen } from "@testing-library/react";
import Error from "@pages/_error";

describe("Error", () => {
  beforeEach(() => {
    render(<Error />);
  });

  describe("Header", () => {
    let h1: HTMLElement | undefined = undefined;
    beforeEach(() => {
      h1 = screen.getByRole("heading", { level: 1 });
    });
    it("to have an h1 tag", () => {
      expect(h1).toBeInTheDocument;
    });
    it("to have a defined h1 tag", () => {
      expect(h1).toBeDefined;
    });
    it("to have a visble h1 tag", () => {
      expect(h1).toBeVisible();
    });
    it(`h1 to contain 404 Error`, () => {
      const regexCompanyName = new RegExp(`\\b404 Error\\b`, "gi");
      expect(h1).toHaveTextContent(regexCompanyName);
    });
  });
});
