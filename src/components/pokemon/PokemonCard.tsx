"use client";

import Image from "next/image";
import styled from "styled-components";
import { theme } from "@/styles/theme";

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemontypes: Array<{
    type: { name: string };
  }>;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

const Card = styled.div<{ $typeName: string }>`
  background-color: ${(props) =>
    theme.colors.types[props.$typeName as keyof typeof theme.colors.types] ||
    "#68A090"};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.sm};
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  gap: 10px;
  align-items: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const RightColumn = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.h3`
  margin: 0;
  color: ${theme.colors.text};
  text-transform: capitalize;
  font-size: 1.1rem;
  font-weight: 600;
`;

const TypesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const TypeBadge = styled.span<{ $typeName: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
  text-transform: capitalize;
  background-color: ${(props) =>
    theme.colors.types[props.$typeName as keyof typeof theme.colors.types] ||
    "#68A090"};
  filter: brightness(1.1);
  width: fit-content;
`;

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <Card $typeName={pokemon.pokemontypes[0]?.type.name || "normal"}>
      <LeftColumn>
        <Header>
          <Name>{pokemon.name}</Name>
        </Header>

        <TypesContainer>
          {pokemon.pokemontypes.map((typeInfo, index) => (
            <TypeBadge
              key={index}
              $typeName={pokemon.pokemontypes[0]?.type.name || "normal"}
            >
              {typeInfo.type.name}
            </TypeBadge>
          ))}
        </TypesContainer>
      </LeftColumn>

      <RightColumn>
        <Image
          src={spriteUrl}
          alt={`${pokemon.name} sprite`}
          width={100}
          height={100}
          style={{ objectFit: "contain", marginTop: "25px" }}
        />
      </RightColumn>
    </Card>
  );
}
