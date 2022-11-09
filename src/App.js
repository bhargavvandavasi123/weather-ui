import HomePage from "./components/HomePage.js";
import Clouds from "./components/Clouds.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const client = new QueryClient({});

  return (
    <QueryClientProvider client={client}>
      <div className=" overflow-hidden  bg-hero from-slte-100 to-slate-900  h-screen w-full relative bg-cover bg-center object-cover mix-blend-overlay ">
        <HomePage />
        <Clouds />
      </div>
    </QueryClientProvider>
  );
}

export default App;
