import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const client = new QueryClient();

/**
QueryClient and QueryClientProvider are required for components that use useQuery or useMutation hooks.
The first test in this file shows an example of a component that uses useQuery.
The second test shows an example of a component that does not need to be wrapped.
*/

const ExampleWithQuery = () => {
  const query = useQuery({
    queryKey: ["example"],
    queryFn: () => {
      return 2;
    },
  });
  return (
    <div>
      <div>status: {query.status}</div>
      <div>data: {query.data}</div>
      <p>Example</p>
    </div>
  );
};

const ExampleWithoutQuery = () => {
  return <p>Example</p>;
};

describe("<Example />", () => {
  test("Example with query contains 'Example' text", () => {
    const { getByText } = render(
      <QueryClientProvider client={client}>
        <ExampleWithQuery />
      </QueryClientProvider>,
    );

    expect(getByText("Example")).toBeTruthy();
  });

  test("Example without query contains 'Example' text", () => {
    const { getByText } = render(<ExampleWithoutQuery />);
    expect(getByText("Example")).toBeTruthy();
  });
});
