"use client";

import Image from "next/image";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import Link from "next/link";

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

const PokeballIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        fill="currentColor"
        d="M118.6,10.2c-26.6,1.9-52.4,13.5-72,32.4C38.9,50,34.4,55.4,28.8,64c-10.2,15.7-17.1,35.5-18.4,52.8l-0.4,5.1h31h31l0.7-3.7c4.7-24.7,24-42.9,48.6-46c15.8-2,32.6,3.5,44.4,14.3c8.8,8.1,14.7,18.6,17,30.1l1,5l31.1,0.2c26.9,0.1,31.1,0,31.1-0.7c0-0.5-0.4-4-0.9-7.8c-5.3-40.2-29.7-74.1-66.1-91.7c-8.8-4.3-19.8-8-28.8-9.6c-5.8-1.1-20.1-2.5-23.5-2.3C125.8,9.7,122.2,9.9,118.6,10.2z"
      />
      <path
        fill="currentColor"
        d="M122,85.1c-17,2.3-31.7,15.4-36.2,32.2c-1.4,5.2-1.4,16.4,0,21.6c3.3,12.3,11.8,22.7,22.9,28.1c7.2,3.5,11.1,4.3,19.6,4.3c6.6-0.1,7.8-0.2,12.6-1.8c7.5-2.6,12.1-5.4,17.8-11.2c4.2-4.2,5.5-6,7.8-10.6c3.9-7.8,4.7-12,4.3-21.4c-0.4-10.2-2.2-15.6-7.7-23.4C154,90,137.7,82.9,122,85.1z M133,110c6.6,1.8,12.1,7.8,13.5,14.7c1.7,8-2.8,16.7-10.4,20.5c-2.9,1.4-4,1.6-8.3,1.6c-4-0.1-5.4-0.3-7.6-1.4c-4.4-2.3-6.7-4.5-8.8-8.3c-3.8-7.1-2.8-15.7,2.5-21.4C119.3,109.9,125.7,107.9,133,110z"
      />
      <path
        fill="currentColor"
        d="M10.4,139.6c1.6,21.1,11.6,45.6,25.4,62.5c4,4.9,13.4,14.3,18.3,18.3c35.7,28.9,85.4,34.2,126.7,13.5c12.1-6.1,20.9-12.5,30.7-22.3c19.8-19.8,31.4-44.6,34.2-73.1l0.4-3.6h-31.2h-31.2l-0.8,4.2c-3,17.6-17.2,34.9-33.9,41.4c-8.2,3.2-11.8,3.8-21.1,3.8c-7,0-9.4-0.2-13.5-1.3c-22-5.9-37.9-23.3-41.8-45.9l-0.4-2.2H41.1H10L10.4,139.6z"
      />
    </g>
  </svg>
);

const Card = styled.div<{ $typeName: string }>`
  position: relative;
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
  overflow: hidden;

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
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.h3`
  margin: 0;
  color: white;
  text-transform: capitalize;
  font-size: 1.1rem;
  font-weight: 600;
`;

const TypesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Number = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 0.8rem;
  color: white;
  opacity: 0.6;
  font-weight: 600;
`;

const PokeballBackground = styled.div`
  position: absolute;
  bottom: -30px;
  right: -30px;
  color: white;
  opacity: 0.3;
  transform: rotate(-15deg);
  z-index: 0;
  pointer-events: none;
`;

const PokemonImage = styled(Image)`
  position: relative;
  z-index: 1;
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
    <Link href={`/pokemon/${pokemon.id}`}>
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
          <Number>#{pokemon.id}</Number>
          <PokeballBackground>
            <PokeballIcon />
          </PokeballBackground>
          <PokemonImage
            src={spriteUrl}
            alt={`${pokemon.name} sprite`}
            width={100}
            height={100}
            style={{ objectFit: "contain", marginTop: "25px" }}
          />
        </RightColumn>
      </Card>
    </Link>
  );
}
