import { graphqlClient } from "./graphql-client";
import {
  GetPokemonListDocument,
  type GetPokemonListQuery,
} from "./generated/graphql";

export const testAPI = async () => {
  const data = (await graphqlClient.request(GetPokemonListDocument, {
    limit: 20,
    offset: 0,
  })) as GetPokemonListQuery;

  return data.pokemon;
};

export const getPokemonPage = async (page: number, limit: number = 20) => {
  const offset = (page - 1) * limit;

  const data = (await graphqlClient.request(GetPokemonListDocument, {
    limit,
    offset,
  })) as GetPokemonListQuery;

  return {
    pokemon: data.pokemon,
    hasMore: data.pokemon.length === limit,
    totalItems: 151,
  };
};
