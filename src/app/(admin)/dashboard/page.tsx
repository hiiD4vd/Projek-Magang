"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("RED");
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchProducts();
    }
  }, [status, router]);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        currentPrice: price,
        type,
        imagePath: imagePath || "/wine (1).png",
        icons: "🍷✨",
      })
    });
    setShowModal(false);
    fetchProducts();
  };

  if (status === "loading" || loading) return <div className="p-10 text-center font-sans">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-zinc-500 text-sm mt-1">Logged in as {session?.user?.email}</p>
          </div>
          <button onClick={() => signOut()} className="px-5 py-2.5 bg-zinc-100 text-zinc-700 font-semibold rounded-xl hover:bg-zinc-200 transition-colors">
            Log Out
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
          <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-zinc-800">Products Catalog</h2>
            <button onClick={() => setShowModal(true)} className="bg-zinc-900 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-zinc-800 transition-colors shadow-sm">
              + Add New Wine
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 text-zinc-500 text-sm border-b border-zinc-100">
                  <th className="p-4 font-semibold">Product</th>
                  <th className="p-4 font-semibold">Type</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {products.map((product: any) => (
                  <tr key={product.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="p-4 flex items-center gap-4">
                      <img src={product.imagePath} alt={product.name} className="w-12 h-12 object-cover rounded-lg bg-zinc-100" />
                      <div>
                        <p className="font-semibold text-zinc-900">{product.name}</p>
                        <p className="text-xs text-zinc-500 line-clamp-1 w-64">{product.description}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${product.type === 'RED' ? 'bg-red-50 text-red-600' : product.type === 'WHITE' ? 'bg-yellow-50 text-yellow-700' : 'bg-pink-50 text-pink-600'}`}>
                        {product.type}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-700 font-medium">Rp {product.currentPrice.toLocaleString('id-ID')}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700 font-semibold text-sm px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">Delete</button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-zinc-500">No products found. Start by adding one!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-zinc-900 tracking-tight">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Name</label>
                <input required type="text" className="w-full border border-zinc-200 rounded-xl p-3 focus:ring-2 focus:ring-black outline-none transition-all" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Description</label>
                <textarea required className="w-full border border-zinc-200 rounded-xl p-3 focus:ring-2 focus:ring-black outline-none h-24 transition-all" value={description} onChange={e => setDescription(e.target.value)}></textarea>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Price (Rp)</label>
                  <input required type="number" className="w-full border border-zinc-200 rounded-xl p-3 focus:ring-2 focus:ring-black outline-none transition-all" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Type</label>
                  <select className="w-full border border-zinc-200 rounded-xl p-3 focus:ring-2 focus:ring-black outline-none bg-white transition-all cursor-pointer" value={type} onChange={e => setType(e.target.value)}>
                    <option value="RED">RED</option>
                    <option value="WHITE">WHITE</option>
                    <option value="ROSE">ROSE</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Image</label>
                <CldUploadWidget uploadPreset="ml_default" onSuccess={(result: any) => setImagePath(result.info.secure_url)}>
                  {({ open }) => {
                    return (
                      <button type="button" onClick={() => open()} className="w-full border-2 border-dashed border-zinc-300 rounded-xl p-4 text-zinc-500 hover:bg-zinc-50 hover:border-zinc-800 transition-colors font-medium">
                        {imagePath ? "✅ Image Uploaded! (Click to change)" : "Upload Image to Cloudinary"}
                      </button>
                    );
                  }}
                </CldUploadWidget>
              </div>
              <div className="flex gap-3 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 border border-zinc-200 rounded-xl font-semibold hover:bg-zinc-50 text-zinc-700 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-zinc-900 text-white rounded-xl font-semibold hover:bg-zinc-800 transition-colors shadow-md">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
