// tests Home component

import { rest } from "msw";
import { renderWithClient } from "../utils";
import { server } from "../../jest.setup";
import Home from "../../components/Home";

describe("Home", () => {
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
