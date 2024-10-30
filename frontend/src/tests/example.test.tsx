import { beforeAll, describe, test, expectTypeOf, expect, afterAll, afterEach } from "vitest";
import { render } from "@testing-library/react";
import {graphql, http as mswHttp, HttpResponse } from "msw";
import { setupServer } from 'msw/node'
import { UserContext } from "@/stores/user.store";
import { http } from '../services/http.service';
import { useAuth } from '../stores/auth.store';

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
describe ("<InterceptionTest />", () => {
  let response: Response
  let body: UserContext
  beforeAll(async () => {
    response = await fetch(
      'https://api.spotify.com/v1/me',
    );
    body = await response.json();
  });
  test("Basic Return", async () => {
    expect(body.country).toEqual("America");
    expect(body.email).toEqual("email");
    expect(body.display_name).toEqual("john");
    expect(response.status).toEqual(200);
})
})

const userData = {
  country: "America",
  email: "email",
  display_name: "john",
  explicit_content: {
    filter_enabled: true,
    filter_locked: false,
  },
  external_urls: {
    spotify: "spotify",
  },
  followers: {
    href: "thing",
    total: "placeholder",
  },
  href: "href",
  id: "id",
  product: "damn",
  type: "type",
  uri: "url",
};

export const restHandlers = [
  mswHttp.get('https://api.spotify.com/v1/me', () => {
    return HttpResponse.json(userData)
  }),
]

const graphqlHandlers = [
  graphql.query('ListPosts', () => {
    return HttpResponse.json(
      {
        data: { userData },
      },
    )
  }),
]

const server = setupServer(...restHandlers, ...graphqlHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
