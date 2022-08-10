import { rest } from "msw";
import { renderHook, waitFor } from "@testing-library/react";
import { server } from "../../jest.setup";
import { createWrapper } from "../utils";
import useFetchAllPosts from "../../hooks/useFetchAllPosts";

describe("useFetchAllPosts", () => {
  test("successful query", async () => {
    const { result } = renderHook(() => useFetchAllPosts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.length).toBe(3);
  });

  test("query error", async () => {
    server.use(
      rest.get("*", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { result } = renderHook(() => useFetchAllPosts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
