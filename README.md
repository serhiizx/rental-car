# RentalCar

A frontend test task for RentalCar, a car rental company. The app lets
visitors browse the fleet, filter it by brand, price and mileage, view a
car's details, and submit a booking request.

## Live demo

_Not deployed yet — link will be added here after deployment._

## Features

- **Home page** — a hero section with a call to action into the catalog.
- **Catalog** (`/catalog`) — a paginated list of cars filtered on the
  backend by brand, price and mileage. Filter state lives in the URL, so a
  filtered link can be shared and survives a page reload. More cars are
  fetched with a "Load more" button (`useInfiniteQuery`), keeping the active
  filters applied. The first screen is prefetched on the server
  (`prefetchInfiniteQuery` + `HydrationBoundary`), so it renders with data
  already in place instead of flashing a loader.
- **Car details** (`/catalog/[carId]`) — opens in a new tab from the
  catalog's "Read more" link, and also works as a direct URL.
- **Booking form** — built with Formik and Yup, validates the input and
  shows a success/error toast (`react-hot-toast`) on submit.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [React](https://react.dev) 19, TypeScript (strict mode)
- [TanStack Query](https://tanstack.com/query) 5 — `useInfiniteQuery` for
  pagination, server-side prefetch + hydration for the catalog
- [Formik](https://formik.org) + [Yup](https://github.com/jquense/yup) — the
  booking form and its validation schema
- CSS Modules with a shared design-token stylesheet
- [React Icons](https://react-icons.github.io/react-icons/)
- [react-hot-toast](https://react-hot-toast.com)

Backend: `https://car-rental-api.goit.study`

## Project structure

The project follows Feature-Sliced Design on top of the Next.js App Router:

- `src/app` — Next.js routes: thin pages, metadata, loading/error/not-found
- `src/views` — page-level compositions (the FSD `pages` layer, renamed to
  avoid clashing with the Next.js `pages` concept)
- `src/widgets` — larger self-contained UI blocks composed from features
  and entities (header, car list)
- `src/features` — user-facing actions (filtering the catalog, booking a
  car)
- `src/entities` — domain data and its UI (the `car` entity: types, API
  calls, card component)
- `src/shared` — reusable primitives with no domain knowledge: API client,
  design tokens, UI kit, config

Each slice exposes its public API through an `index.ts`; imports only ever
point down the layer stack.

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Scripts

| Script              | Description                           |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Start the dev server                  |
| `npm run build`     | Build for production                  |
| `npm start`         | Serve the production build            |
| `npm run lint`      | Run ESLint                            |
| `npm run format`    | Format the codebase with Prettier     |
| `npm run typecheck` | Run the TypeScript compiler (no emit) |
| `npm test`          | Run the unit tests                    |

## Environment variables

| Variable                   | Required | Default                             |
| -------------------------- | -------- | ----------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | No       | `https://car-rental-api.goit.study` |

Copy `.env.example` to `.env.local` if you need to point at a different
backend; the app works out of the box without it.

## Author

Serhii Zhdaniuk — jdanuk@gmail.com
