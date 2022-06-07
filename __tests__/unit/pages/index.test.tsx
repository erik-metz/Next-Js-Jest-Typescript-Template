import { render, screen } from "@testing-library/react";
import Home from "@pages/index";
import { companyName } from "@constants/company";

// describe("Home", () => {
//   beforeEach(() => {
//     render(<Home />);
//   });
//   describe("Header", () => {
//     let heading: HTMLElement | undefined = undefined;
//     beforeAll(() => {
//       heading = screen.getByRole("heading", { level: 1 });
//     });
//     // it("to have an h1 tag", () => {
//     //   expect(heading).toBeDefined();
//     // });
//     // it("h1 to contain webpage name", () => {
//     //   const webpageName = companyName;
//     //   expect(heading).toBe(webpageName);
//     // });
//   });
// });
describe("Home", () => {
  beforeEach(() => {
    render(<Home />);
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
    it(`h1 to contain ${companyName}`, () => {
      const regexCompanyName = new RegExp(`\\b${companyName}\\b`, "gi");
      expect(h1).toHaveTextContent(regexCompanyName);
    });
  });
});
