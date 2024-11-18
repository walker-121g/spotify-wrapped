import { beforeAll, describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import  nock  from 'nock';
import { UserContext } from "@/stores/user.store";
import { useAuth } from '@/stores/auth.store';

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
describe ("<Mock Test />", () => {
  let response: Response
  let body: UserContext
  beforeAll(async () => {
    response = await fetch(
      'https://api.spotify.com/v1/me',
    );
    body = await response.json();
  });
  test("Basic Return",() => {
    expect(body.country).toEqual("America");
    expect(body.email).toEqual("Email");
    expect(body.display_name).toEqual("John");
    expect(response.status).toEqual(200);
  });
  test("auth.store.ts test, useAuth invalid token", () => {
    const tok = useAuth.getState().token;
    expect(tok).toEqual(undefined);
  });
})

nock('http://localhost:8000/api')
  .get('/auth/token')
  .replyWithError({
    status: 400,
    message: "Error"
  })
  

nock('https://api.spotify.com')
  .get('/v1/me')
  .reply(200, {
      country: "America",
      email: "Email",
      display_name: "John",
      explicit_content: {
        filter_enabled: true,
        filter_locked: true,
      },
      external_urls: {
        spotify: "exturnal_url",
      },
      followers: {
        href: "href",
        total: 2,
      },
      href: "href",
      id: "id",
      images: {
        height: 1,
        url: "33",
        width: 2,
      },
      product: "product",
      type: "type",
      uri: "url",
  })
