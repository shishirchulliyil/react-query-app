# Tanstack Query(React Query) v5 Demo 
# Build on React + TypeScript + Vite

- Small react project demonstrating react query features like
  - useQuery
  - useQueries
  - useMutation
  - invalidating Queries
  - useInfiniteQuery
  - Query Client (staleTime, gcTime, refetchOnWindowFocus, retry, retryDelay are some of the options explored!)
  - React Query Dev Tool
  - Pagination

- Uses below packages
  - "@tanstack/react-query": "^5.17.10",
  - "@tanstack/react-query-devtools": "^5.17.10",
  - "axios": "^1.6.5",
  - "@tanstack/eslint-plugin-query" (dev)

- How to run this application ?
  - created a local JSON Server and added a db.json to maintian a local list of dummy todos, products and projects. JSONPlaceholder can be used as an alternative.
  - created a react vite application with Typescript support.
  - "npm start" for both these projects to start the application locally.
