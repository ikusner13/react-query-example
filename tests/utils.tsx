import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { rest } from "msw";
import * as React from "react";
import { render } from "@testing-library/react";

export const handlers = [
  rest.get("/api/posts", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          content: "post 1",
        },
        {
          id: 2,
          content: "post 2",
        },
        {
          id: 3,
          content: "post 3",
        },
      ])
    );
  }),
  rest.get("/api/posts/:id", (req, res, ctx) => {
    const { id } = req.params;

    return res(
      ctx.status(200),
      ctx.json([
        {
          id,
          content: "mocked-react-query",
        },
      ])
    );
  }),
  rest.post("/api/posts", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 4,
        content: "test",
      })
    );
  }),
];

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: console.error, // or () => {} to mute
    },
  });

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();

  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );

  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();

  // eslint-disable-next-line react/display-name
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
