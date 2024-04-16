"use client";
import { useEffect, useState } from 'react';


const Show = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/show", { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json(); 
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [setData]);
  return (
    <div className="container mx-auto mt-8">
      <h1 className=" align-middletext-3xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(item => (
          <div key={item.id} className="border p-4 rounded-lg shadow-xl">
            <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <div className="flex justify-between items-center">
              <div> 
              <p className="text-gray-800 font-bold">${item.price}</p>
                </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Show;
