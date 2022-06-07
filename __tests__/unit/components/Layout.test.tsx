import { render, screen, waitFor } from "@testing-library/react";
import Layout from "@components/Layout";
import { companyName } from "@constants/company";
import Image from "next/image";
import styles from "@styles/index.module.css";
import Head from "next/head";

function getMeta(metaName: string): string | null {
  const metas = document.getElementsByTagName("meta");
  // console.log({ metas });
  // console.log({ length: metas.length });
  for (let i = 0; i < metas.length; i += 1) {
    const meta = metas[i];
    // console.log({ meta });
    if (meta.getAttribute("name") === metaName) {
      return meta.getAttribute("content");
    }
  }
  return null;
}

// jest.mock("next/router"); // https://www.youtube.com/watch?v=yPBtVxDEC0w

jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      //   console.log({ children: <>{children}</> });
      return <>{children}</>;
    },
  };
});

describe("Layout", () => {
  describe("Head", () => {
    let headers: any | undefined = undefined;
    // let headers: HTMLCollectionOf<HTMLElement> | undefined = undefined;
    beforeEach(() => {
      render(
        <Layout>
          <div>Test children</div>
        </Layout>
      );
      headers = document.getElementsByTagName("head");
    });
    it("to have a head tag", () => {
      // console.log({ headers });
      expect(headers).toBeInTheDocument;
      expect(headers).toBeDefined;
    });
    it("to have only one header defined", () => {
      // console.log({ headersLength: headers?.length });
      expect(headers?.length).not.toEqual(0);
      expect(headers?.length).toEqual(1);
      expect(headers?.length).not.toBeGreaterThan(1);
    });
    it("to have a visble head tag", () => {
      if (headers) {
        // console.log({ header0: headers[0] });
        expect(headers[0]).not.toBeVisible();
      }
    });
    it(`title to contain ${companyName}`, async () => {
      await waitFor(() => {
        // console.log({ title: document.title });
        expect(document.title).not.toEqual(null);
        expect(document.title).toContain(companyName);
        expect(document.title).not.toContain(companyName + "a");
      });
    });
    it("to have a description", async () => {
      await waitFor(() => {
        const description = getMeta("description");
        // console.log({ description });
        // console.log({ type: typeof description });
        expect(description).toBeDefined();
        expect(description).not.toEqual(null);
        //   expect(getMeta("robots")).toEqual("noindex, nofollow")
      });
    });
    it("to have a robots.txt", async () => {
      await waitFor(() => {
        const robots = getMeta("robots");
        // console.log({ robots });
        // console.log({ type: typeof robots });
        expect(robots).toEqual("index, follow");
      });
    });
  });
  describe("Body", () => {
    beforeEach(() => {
      render(
        <Layout>
          <div>Test children</div>
        </Layout>
      );
    });
    describe("Main", () => {
      let main: HTMLElement | undefined = undefined;
      beforeEach(() => {
        main = screen.getByRole("main");
      });
      it("to have a main tag", () => {
        expect(main).toBeInTheDocument;
      });
      it("to have a defined main tag", () => {
        expect(main).toBeDefined;
      });
      it("to have a visble main tag", () => {
        expect(main).toBeVisible();
      });
    });
    describe("Footer", () => {
      let footer: HTMLElement | undefined = undefined;
      beforeEach(() => {
        footer = screen.getByRole("contentinfo");
      });
      it("to have a footer tag", () => {
        expect(footer).toBeInTheDocument;
      });
      it("to have a defined footer tag", () => {
        expect(footer).toBeDefined;
      });
      it("to have a visble footer tag", () => {
        expect(footer).toBeVisible();
      });
      describe("Copyright", () => {
        const year = new Date(Date.now()).getFullYear();
        const copyrightText = `Copyright © ${year}`;
        let copyright: HTMLElement | undefined = undefined;
        beforeEach(() => {
          copyright = screen.getByText(/copyright/i);
        });
        it("to have a copyright tag", () => {
          expect(copyright).toBeInTheDocument;
        });
        it("to have a defined copyright tag", () => {
          expect(copyright).toBeDefined;
        });
        it("to have a visble copyright tag", () => {
          expect(copyright).toBeVisible();
        });
        it(`to equal ${copyrightText}`, () => {
          expect(copyright).toHaveTextContent(copyrightText);
        });
      });
    });
  });
});
