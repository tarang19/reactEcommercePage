# Closet - Fashion Content Filter

A modern React + TypeScript web app for browsing and filtering fashion content with advanced search, pricing, and sorting options.

## Features

- Beautiful, responsive UI with Tailwind CSS
- Filter by pricing (Paid, Free, View Only)
- Keyword search and sorting (name, price)
- Price range slider for paid items
- Infinite scroll & "Load More" pagination
- State synced with URL for shareable filters
- Fast, production-ready build with Vite

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) (state management)
- [Lucide React](https://lucide.dev/) (icons)

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run the development server:**
   ```sh
   npm run dev
   ```

3. **Build for production:**
   ```sh
   npm run build
   ```

4. **Run tests:**
   ```sh
   npm test
   ```

## Project Structure

- `src/components/` – UI components (cards, grid, filters, search)
- `src/store/` – Zustand store for content and filters
- `src/services/` – API integration
- `src/hooks/` – Custom React hooks
- `src/types/` – TypeScript types and enums

## API

Content is fetched from:  
`https://closet-recruiting-api.azurewebsites.net/api/data`

## License

MIT
