import useFetchAllPosts from "../../hooks/useFetchAllPosts";
import useCreatePost from "../../hooks/useCreatePost";
import Home from "../../components/Home";
import { renderWithClient } from "../utils";

jest.mock("../../hooks/useFetchAllPosts", () => jest.fn());

jest.mock("../../hooks/useCreatePost", () => jest.fn());

const useFetchAllPostsMock = useFetchAllPosts as jest.Mock;
const useCreatePostMock = useCreatePost as jest.Mock;

describe("Home", () => {
  beforeEach(() => {
    useFetchAllPostsMock.mockImplementation(() => ({}));
    useCreatePostMock.mockImplementation(() => ({}));
  });
  it("successful query displays posts", async () => {
    useFetchAllPostsMock.mockImplementation(() => ({
      data: [
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
      ],
    }));
    const result = renderWithClient(<Home />);

    expect(await result.findByText(/post 1/i)).toBeInTheDocument();
  });

  it("failure query component", async () => {
    useFetchAllPostsMock.mockImplementation(() => ({
      isError: true,
    }));

    const result = renderWithClient(<Home />);

    expect(await result.findByText(/Error!/i)).toBeInTheDocument();
  });
});
