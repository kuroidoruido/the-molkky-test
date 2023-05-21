import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: () =>
      import("./features/dashboard/DashboardPage").then((m) => ({
        Component: m.default,
      })),
  },
  {
    path: "/new-game",
    lazy: () =>
      import("./features/new-game/NewGamePage").then((m) => ({
        Component: m.default,
      })),
  },
  {
    path: "/current-game/:gameId",
    lazy: () =>
      import("./features/current-game/CurrentGamePage").then((m) => ({
        Component: m.default,
      })),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
