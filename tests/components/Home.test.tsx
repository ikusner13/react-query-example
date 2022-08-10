// tests Home component

import { rest } from "msw";
import { renderWithClient } from "../utils";
import { server } from "../../jest.setup";
import Home from "../../components/Home";
import { fireEvent } from "@testing-library/react";

describe("Home", () => {
  describe("Fetching Posts", () => {
    it("successful query displays posts", async () => {
      const result = renderWithClient(<Home />);

      expect(await result.findByText(/post 1/i)).toBeInTheDocument();
      expect(await result.findByText(/post 2/i)).toBeInTheDocument();
      expect(await result.findByText(/post 3/i)).toBeInTheDocument();
    });

    it("failure query component", async () => {
      server.use(
        rest.get("*", (req, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      const result = renderWithClient(<Home />);

      expect(await result.findByText(/Error!/i)).toBeInTheDocument();
    });
  });

  describe("Creating Posts", () => {
    it("successful mutation displays message", async () => {
      const result = renderWithClient(<Home />);

      fireEvent.click(await result.findByText(/Add Post/i));

      expect(await result.findByText(/post added/i)).toBeInTheDocument();
    });
  });
});
