import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getPokemonPage } from "@/lib/api-test";
import Pokedex from "@/components/pokemon/Pokedex";
import { Order_By } from "@/lib/generated/graphql";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["pokemon-page", 1, [{ id: Order_By.Asc }]],
    queryFn: () => getPokemonPage(1, 20, [{ id: Order_By.Asc }]),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Pokedex />
    </HydrationBoundary>
  );
}

export const metadata = {
  title: "Pokédex - Discover All 151 Original Pokémon",
  description:
    "Browse, search, and sort through all 151 original Pokémon with detailed information including types, stats, and official artwork.",
  keywords: "pokemon, pokedex, nintendo, game, creatures, stats, types",
  openGraph: {
    title: "Pokédex",
    description: "Complete database of original Pokémon",
    type: "website",
  },
};
