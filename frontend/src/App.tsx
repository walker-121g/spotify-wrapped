import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { createRouter } from "./router";
import { useAuth } from "./stores/auth.store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  const isLoggedIn = useAuth(s => s.isAuthed);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={createRouter()} context={{ isLoggedIn }} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
