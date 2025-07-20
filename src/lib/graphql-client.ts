import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
  "https://graphql.pokeapi.co/v1beta2",
  {
    headers: {
      "Content-Type": "application/json",
    },
    requestMiddleware: (request) => {
      const body = typeof request.body === "string" ? request.body : "";
      let query = "";
      try {
        const parsed = JSON.parse(body);
        query = parsed.query ? parsed.query.split("\n")[0] : "";
      } catch {}
      return request;
    },
  }
);
