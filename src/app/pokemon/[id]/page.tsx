import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getPokemonDetail } from "@/lib/api-test";
import PokemonDetailClient from "@/components/pokemon/PokemonDetailClient";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PokemonDetailPage({ params }: Props) {
  const { id } = await params;
  const pokemonId = parseInt(id);

  if (isNaN(pokemonId) || pokemonId < 1 || pokemonId > 151) {
    notFound();
  }

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["pokemon-detail", pokemonId],
      queryFn: () => getPokemonDetail(pokemonId),
      staleTime: 30 * 60 * 1000, // 30 minutes
    });
  } catch (error) {
    console.error("Failed to fetch Pokemon:", error);
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonDetailClient pokemonId={pokemonId} />
    </HydrationBoundary>
  );
}

export async function generateStaticParams() {
  return Array.from({ length: 151 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const pokemonId = parseInt(id);

  if (isNaN(pokemonId) || pokemonId < 1 || pokemonId > 151) {
    return {
      title: "Pokemon Not Found",
    };
  }

  try {
    const pokemon = await getPokemonDetail(pokemonId);

    return {
      title: `${
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
      } - Pokédex`,
      description: `Learn about ${pokemon.name}, a ${pokemon.pokemontypes
        .map((t) => t.type?.name)
        .join(
          "/"
        )} type Pokémon. View stats, abilities, and detailed information.`,
      openGraph: {
        title: `${pokemon.name} - Pokédex`,
        description: `Detailed information about ${pokemon.name}`,
        images: [pokemon.sprites?.other?.["official-artwork"]?.front_default],
      },
    };
  } catch (error) {
    console.error("Failed to generate metadata:", error);
    return {
      title: "Pokemon Not Found",
    };
  }
}
