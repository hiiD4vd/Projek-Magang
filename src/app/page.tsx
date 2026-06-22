import HomeClient from "./components/HomeClient";
import { getProducts } from "./actions/productActions";

export default async function Home() {
  const { success, data: wines, error } = await getProducts();

  if (!success || !wines) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#1a1a1a] text-white">
        <p>Failed to load products: {error}</p>
      </div>
    );
  }

  return <HomeClient wines={wines} />;
}
