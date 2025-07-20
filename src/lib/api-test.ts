import { graphqlClient } from "./graphql-client";
import {
  GetPokemonListDocument,
  type GetPokemonListQuery,
} from "./generated/graphql";

export const testAPI = async () => {
  const data = (await graphqlClient.request(GetPokemonListDocument, {
    limit: 30,
    offset: 0,
  })) as GetPokemonListQuery;

  return data.pokemon;
};
