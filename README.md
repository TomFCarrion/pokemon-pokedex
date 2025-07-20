# 🔍 Pokemon Pokédex

A Pokemon database built with Next.js, featuring advanced search, sorting, and pagination capabilities. Browse through all 151 original Pokemon with detailed information.

![Pokemon Pokedex](https://img.shields.io/badge/Pokemon-Pokedex-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.4.2-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![React Query](https://img.shields.io/badge/React%20Query-5.83.0-red.svg)

## Demo: https://pokemon-pokedex-nu.vercel.app/

## ✨ Features

### 🎮 Core Functionality

- **Browse Pokemon**: Explore all 151 original Pokemon with card layouts
- **Advanced Search**: Search by Pokemon name or number with real-time results
- **Smart Sorting**: Sort by number (pokemon ID) or name with ascending/descending options
- **Pagination**: Navigate through Pokemon with responsive pagination controls
- **Pokemon Details**: Detailed pages for each Pokemon with stats, abilities, and descriptions

### 🔧 Technical Features

- **Server-Side Rendering (SSR)**: Fast initial page loads with pre-rendered content
- **GraphQL Integration**: Efficient data fetching with typed queries
- **State Persistence**: Search and sort preferences saved in localStorage
- **Type Safety**: Full TypeScript implementation throughout
- **Performance Optimized**: React Query for caching and background updates

## 🛠️ Tech Stack

### Frontend

- **[Next.js 15.4.2](https://nextjs.org/)** - React framework with SSR
- **[React 19.1.0](https://reactjs.org/)** - UI library
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type safety
- **[Styled Components 6.1.19](https://styled-components.com/)** - CSS-in-JS styling
- **[Framer Motion 12.23.6](https://www.framer.com/motion/)** - Animations

### Data & State Management

- **[React Query 5.83.0](https://tanstack.com/query/latest)** - Server state management
- **[GraphQL 16.11.0](https://graphql.org/)** - Query language
- **[GraphQL Request 7.2.0](https://github.com/jasonkuhrt/graphql-request)** - GraphQL client
- **[GraphQL Code Generator](https://the-guild.dev/graphql/codegen)** - Type generation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/TomFCarrion/pokemon-pokedex.git
   cd pokemon-pokedex

   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install

   ```

3. **Generate GraphQL types**

   ```bash
   npm run codegen
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── pokemon/[id]/      # Dynamic Pokemon detail pages
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/
│   ├── pokemon/           # Pokemon-specific components
│   │   ├── Pokedex.tsx   # Main Pokemon grid
│   │   ├── PokemonCard.tsx
│   │   └── PokemonDetailClient.tsx
│   ├── ui/                # Reusable UI components
│   │   ├── Pagination.tsx
│   │   └── SearchBar.tsx
│   └── providers/         # Context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and API
│   ├── generated/         # Auto-generated GraphQL types
│   ├── queries/          # GraphQL queries
│   └── api-test.ts       # API functions
├── styles/               # Styling utilities
└── types/               # TypeScript type definitions
```

## 🎯 Development Roadmap

The project was built incrementally with the following milestones:

### Phase 1: Foundation

- ✅ **Initial Setup**: Next.js project with TypeScript
- ✅ **GraphQL Integration**: API setup and type generation

### Phase 2: Core Features

- ✅ **Pokemon Grid**: Card layout and responsive design
- ✅ **Pagination**: Navigation between Pokemon pages
- ✅ **Search**: Real-time Pokemon search functionality
- ✅ **Sorting**: Multiple sort options with persistence

### Phase 3: Advanced Features

- ✅ **SSR Implementation**: Server-side rendering for performance
- ✅ **Pokemon Details**: Individual Pokemon information pages
- ✅ **UI Polish**: Final design improvements and animations

## 🔄 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint

# GraphQL
npm run codegen      # Generate TypeScript types
npm run codegen:watch # Watch for schema changes
```

## 🌟 Key Features Implementation

### Search & Sort Integration

- **Unified Interface**: Combined search and sort in a single, clean component
- **Real-time Search**: 300ms debounced search with instant results
- **Smart Sorting**: Persistent sort preferences with visual indicators

### Performance Optimizations

- **React Query**: Intelligent caching and background updates
- **SSR**: Pre-rendered pages for faster initial loads
- **Lazy Loading**: Optimized image loading for Pokemon sprites
- **Responsive Images**: Multiple image sizes for different devices

### User Experience

- **Fixed Navigation**: Header and pagination always accessible
- **Smooth Animations**: Framer Motion powered transitions
- **Loading States**: Clear feedback during data fetching
- **Error Handling**: Graceful error states and recovery

## 🎨 Design System

The project uses a consistent design system with:

- **Color Palette**: Type-based Pokemon colors with neutral grays
- **Typography**: Responsive font scales across device sizes
- **Spacing**: Consistent spacing tokens throughout
- **Components**: Reusable styled components with theme support

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pokemon Data**: Powered by Pokemon GraphQL API
- **Pokemon Images**: Official artwork from Pokemon sprites repository
- **Design Inspiration**: Modern web app design patterns
- **Community**: Open source libraries and tools used

---
