"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getPokemonDetail } from "@/lib/api-test";
import { theme } from "@/styles/theme";

interface Props {
  pokemonId: number;
}

const Container = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.background};
  min-height: 100vh;

  @media (min-width: 1024px) {
    max-width: 100%;
    padding: ${theme.spacing.xl} 10%;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing["2xl"]};
  flex-wrap: wrap;
`;

const BackButton = styled(Link)`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.textLight};
  color: white;
  text-decoration: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.9rem;
  transition: background 0.2s ease-in-out;
  min-height: 44px; /* Touch target */
  display: flex;
  align-items: center;

  &:hover {
    background: ${theme.colors.text};
  }
`;

const Navigation = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-left: auto;

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }
`;

const NavButton = styled.button<{ $disabled?: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${(props) =>
    props.$disabled ? theme.colors.background : theme.colors.primary};
  color: ${(props) => (props.$disabled ? theme.colors.textLight : "white")};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease-in-out;
  min-height: 44px; /* Touch target */
  min-width: 44px;

  &:hover:not(:disabled) {
    background: ${theme.colors.text};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const DetailCard = styled.div`
  background: ${theme.colors.card};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing["2xl"]};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
  }
`;

const PokemonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing["2xl"]};

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
    gap: ${theme.spacing.lg};
  }
`;

const ImageSection = styled.div`
  flex-shrink: 0;
`;

const InfoSection = styled.div`
  flex: 1;
`;

const PokemonName = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.sm} 0;
  text-transform: capitalize;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const PokemonNumber = styled.span`
  color: ${theme.colors.textLight};
  font-size: 1.1rem;
  font-weight: bold;
`;

const TypesContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin: ${theme.spacing.md} 0;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: ${theme.breakpoints.mobile}) {
    justify-content: flex-start;
  }
`;

const TypeBadge = styled.span<{ $typeName: string }>`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  text-transform: capitalize;
  background-color: ${(props) =>
    theme.colors.types[props.$typeName as keyof typeof theme.colors.types] ||
    "#68A090"};
`;

const Description = styled.p`
  color: ${theme.colors.text};
  line-height: 1.6;
  font-size: 1rem;
  margin: ${theme.spacing.lg} 0;
  font-style: italic;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing["2xl"]};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const StatSection = styled.div`
  background: ${theme.colors.background};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
`;

const SectionTitle = styled.h3`
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.md} 0;
  font-size: 1.1rem;
`;

const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.sm};
  background: ${theme.colors.card};
  border-radius: ${theme.borderRadius.sm};
`;

const StatName = styled.span`
  color: ${theme.colors.text};
  text-transform: capitalize;
  font-weight: 500;
`;

const StatValue = styled.span`
  color: ${theme.colors.primary};
  font-weight: bold;
`;

const StatRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};
`;

const StatInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 120px;
`;

const StatBar = styled.div`
  flex: 1;
  height: 8px;
  background: #e5e5e5;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const StatFill = styled(motion.div)<{ $percentage: number }>`
  height: 100%;
  border-radius: 4px;
  background: ${(props) => {
    if (props.$percentage >= 80) return "#4CAF50"; // Green for high stats
    if (props.$percentage >= 60) return "#8BC34A"; // Light green
    if (props.$percentage >= 40) return "#FF9800"; // Orange for medium stats
    if (props.$percentage >= 20) return "#FF5722"; // Red-orange
    return "#F44336"; // Red for low stats
  }};
`;

const StatNumber = styled.span`
  font-weight: bold;
  min-width: 35px;
  text-align: right;
  font-size: 0.9rem;
`;

const AbilitiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const AbilityBadge = styled.span<{ $isHidden?: boolean }>`
  padding: 0.25rem 0.75rem;
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
  background: ${(props) =>
    props.$isHidden ? "#F59E0B" : theme.colors.primary};
  color: white;
  text-transform: capitalize;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${theme.spacing["2xl"]};
  color: ${theme.colors.textLight};
`;

const ErrorState = styled.div`
  text-align: center;
  padding: ${theme.spacing["2xl"]};
  color: #dc2626;
`;

export default function PokemonDetailClient({ pokemonId }: Props) {
  const router = useRouter();

  // Set body background to match container
  React.useEffect(() => {
    document.body.style.background = "#f8f9fa"; // theme.colors.background equivalent
    return () => {
      document.body.style.background = "";
    };
  }, []);

  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pokemon-detail", pokemonId],
    queryFn: () => getPokemonDetail(pokemonId),
    staleTime: 30 * 60 * 1000,
  });

  const handleNavigation = (direction: "prev" | "next") => {
    const newId = direction === "prev" ? pokemonId - 1 : pokemonId + 1;
    if (newId >= 1 && newId <= 151) {
      router.push(`/pokemon/${newId}`);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingState>Loading Pokémon details...</LoadingState>
      </Container>
    );
  }

  if (isError || !pokemon) {
    return (
      <Container>
        <ErrorState>
          Failed to load Pokémon details:{" "}
          {error?.message || "Pokemon not found"}
        </ErrorState>
      </Container>
    );
  }

  const description =
    pokemon.pokemonspecy?.pokemonspeciesflavortexts?.[0]?.flavor_text;
  const spriteUrl =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  return (
    <Container>
      <Header>
        <BackButton href="/">← Back to Pokédex</BackButton>
        <Navigation>
          <NavButton
            onClick={() => handleNavigation("prev")}
            $disabled={pokemonId <= 1}
            title="Previous Pokemon"
          >
            ← #{(pokemonId - 1).toString().padStart(3, "0")}
          </NavButton>
          <NavButton
            onClick={() => handleNavigation("next")}
            $disabled={pokemonId >= 151}
            title="Next Pokemon"
          >
            #{(pokemonId + 1).toString().padStart(3, "0")} →
          </NavButton>
        </Navigation>
      </Header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <DetailCard>
          <PokemonHeader>
            <ImageSection>
              <Image
                src={spriteUrl}
                alt={`${pokemon.name} artwork`}
                width={200}
                height={200}
                style={{ objectFit: "contain" }}
                priority
              />
            </ImageSection>

            <InfoSection>
              <PokemonName>{pokemon.name}</PokemonName>
              <PokemonNumber>
                #{pokemonId.toString().padStart(3, "0")}
              </PokemonNumber>

              <TypesContainer>
                {pokemon.pokemontypes?.map((typeInfo) =>
                  typeInfo.type ? (
                    <TypeBadge
                      key={typeInfo.slot}
                      $typeName={typeInfo.type.name}
                    >
                      {typeInfo.type.name}
                    </TypeBadge>
                  ) : null
                )}
              </TypesContainer>

              {description && (
                <Description>
                  {description.replace(/\f/g, " ").replace(/\n/g, " ")}
                </Description>
              )}
            </InfoSection>
          </PokemonHeader>

          <StatsGrid>
            <StatSection>
              <SectionTitle>Basic Info</SectionTitle>
              <StatsList>
                <StatItem>
                  <StatName>Height</StatName>
                  <StatValue>
                    {pokemon.height ? `${pokemon.height / 10}m` : "N/A"}
                  </StatValue>
                </StatItem>
                <StatItem>
                  <StatName>Weight</StatName>
                  <StatValue>
                    {pokemon.weight ? `${pokemon.weight / 10}kg` : "N/A"}
                  </StatValue>
                </StatItem>
                <StatItem>
                  <StatName>Base Experience</StatName>
                  <StatValue>{pokemon.base_experience || "N/A"}</StatValue>
                </StatItem>
                {pokemon.pokemonspecy?.capture_rate && (
                  <StatItem>
                    <StatName>Capture Rate</StatName>
                    <StatValue>{pokemon.pokemonspecy.capture_rate}</StatValue>
                  </StatItem>
                )}
              </StatsList>
            </StatSection>

            <StatSection>
              <SectionTitle>Base Stats</SectionTitle>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    },
                  },
                }}
              >
                {pokemon.pokemonstats?.map((stat, index) =>
                  stat.stat ? (
                    <motion.div
                      key={stat.stat.name}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <StatRow>
                        <StatInfo>
                          <StatName>
                            {stat.stat.name.replace("-", " ")}
                          </StatName>
                          <StatNumber>{stat.base_stat}</StatNumber>
                        </StatInfo>
                        <StatBar>
                          <StatFill
                            $percentage={(stat.base_stat / 200) * 100}
                            initial={{ width: 0 }}
                            animate={{
                              width: `${Math.min(
                                (stat.base_stat / 200) * 100,
                                100
                              )}%`,
                            }}
                            transition={{
                              duration: 1,
                              delay: 0.3 + index * 0.1,
                              ease: "easeOut",
                            }}
                          />
                        </StatBar>
                      </StatRow>
                    </motion.div>
                  ) : null
                )}
              </motion.div>
            </StatSection>

            <StatSection>
              <SectionTitle>Abilities</SectionTitle>
              <AbilitiesList>
                {pokemon.pokemonabilities?.map((abilityInfo) =>
                  abilityInfo.ability ? (
                    <AbilityBadge
                      key={abilityInfo.slot}
                      $isHidden={abilityInfo.is_hidden}
                    >
                      {abilityInfo.ability.name.replace("-", " ")}
                      {abilityInfo.is_hidden && " (Hidden)"}
                    </AbilityBadge>
                  ) : null
                )}
              </AbilitiesList>
            </StatSection>
          </StatsGrid>
        </DetailCard>
      </motion.div>
    </Container>
  );
}
