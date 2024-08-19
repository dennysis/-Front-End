import React, { useEffect, useState } from "react";

export default function Instock() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState({});
  const [sales, setSales] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5555/products");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data);
        }
        setItems(data);
        fetchCategories();
        getSales();
      } catch (error) {
        console.log(error);
        setError("Failed to load items");
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5555/categories");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data);
        }
        const categoryMap = data.reduce((acc, category) => {
          acc[category.id] = category.name; // Adjust based on the actual response structure
          return acc;
        }, {});
        setCategories(categoryMap);
      } catch (error) {
        console.log(error);
        setError("Failed to load categories");
      }
    };

    const getSales = async () => {
      try {
        const res = await fetch("http://localhost:5555/product_sales");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data);
        }
        const salesMap = data.reduce((acc, sale) => {
          acc[sale.product] = sale.total_quantity;
          return acc;
        }, {});
        setSales(salesMap);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to load sales data");
      }
    };

    getItems();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
        <table class="w-full text-sm text-left text-black border-collapse">
          <thead class="text-xs text-black uppercase bg-gray-100">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center">
                  <label for="checkbox-all-search" class="sr-only">Checkbox</label>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">Product ID</th>
              <th scope="col" class="px-6 py-3">Product</th>
              <th scope="col" class="px-6 py-3">Sales</th>
              <th scope="col" class="px-6 py-3">Category</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                class="bg-white border-b hover:bg-gray-50"
              >
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <label for="checkbox-table-search-1" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td class="px-6 py-4">{item.id}</td>
                <td class="px-6 py-4 font-medium text-black">
                  {item.name}
                </td>
                <td class="px-6 py-4">{sales[item.name] || "No Sales"}</td>
                <td class="px-6 py-4">{categories[item.category_id] || "Loading..."}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      
      )}
    </>
  );
}