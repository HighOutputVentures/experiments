/**
 * @jest-environment jsdom
 */

 import "@testing-library/jest-dom";
 import Layout from "../routes/__layout.svelte";
 import { render } from "@testing-library/svelte";

 describe("Test if Jest is working", () => {
    test("Welcome", () => {
      const { getByText } = render(Layout);
      expect(getByText("HOV Labs - Svelte with TDD")).toBeInTheDocument();
    });
  });
