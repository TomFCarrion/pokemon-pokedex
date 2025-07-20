import { graphqlClient } from "./graphql-client";
import {
  GetPokemonListDocument,
  SearchPokemonByNameDocument,
  SearchPokemonByIdDocument,
  GetPokemonDetailDocument,
  type GetPokemonListQuery,
  type SearchPokemonByNameQuery,
  type SearchPokemonByIdQuery,
  type Pokemon_Order_By,
  Order_By,
  type GetPokemonDetailQuery,
} from "./generated/graphql";

export const testAPI = async () => {
  const data = (await graphqlClient.request(GetPokemonListDocument, {
    limit: 20,
    offset: 0,
  })) as GetPokemonListQuery;

  return data.pokemon;
};

export const getPokemonPage = async (
  page: number,
  limit: number = 20,
  orderBy: Pokemon_Order_By[] = [{ id: Order_By.Asc }]
) => {
  const offset = (page - 1) * limit;

  const data = (await graphqlClient.request(GetPokemonListDocument, {
    limit,
    offset,
    orderBy,
  })) as GetPokemonListQuery;

  return {
    pokemon: data.pokemon,
    hasMore: data.pokemon.length === limit,
    totalItems: 151,
  };
};

export const searchPokemon = async (
  searchTerm: string,
  orderBy: Pokemon_Order_By[] = [{ id: Order_By.Asc }]
) => {
  if (!searchTerm.trim()) {
    return { pokemon: [], totalItems: 0 };
  }

  const term = searchTerm.trim();

  if (!isNaN(Number(term))) {
    const pokemonId = parseInt(term);

    const data = (await graphqlClient.request(SearchPokemonByIdDocument, {
      pokemonId: pokemonId,
      orderBy,
    })) as SearchPokemonByIdQuery;

    return {
      pokemon: data.pokemon,
      totalItems: data.pokemon.length,
    };
  } else {
    const namePattern = `%${term.toLowerCase()}%`;

    const data = (await graphqlClient.request(SearchPokemonByNameDocument, {
      namePattern: namePattern,
      orderBy,
    })) as SearchPokemonByNameQuery;

    return {
      pokemon: data.pokemon,
      totalItems: data.pokemon.length,
    };
  }
};

export const getPokemonDetail = async (id: number) => {
  const data = await graphqlClient.request(GetPokemonDetailDocument, { id });

  const pokemon = (data as GetPokemonDetailQuery).pokemon[0];

  if (!pokemon) {
    throw new Error(`Pokemon with ID ${id} not found`);
  }

  let sprites = null;
  if (pokemon.pokemonsprites?.[0]?.sprites) {
    try {
      sprites = JSON.parse(pokemon.pokemonsprites[0].sprites);
    } catch (error) {
      console.warn("Failed to parse sprites JSON:", error);
    }
  }

  return {
    ...pokemon,
    sprites: sprites || {
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      other: {
        "official-artwork": {
          front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        },
      },
    },
  };
};
