"use client";
import Link from "next/link";
import { useRef } from "react";
import  axios from "axios";

export default function Home() {

  const title= useRef(null);
  const description= useRef(null);
  const price= useRef(null);
  const discountPercentage= useRef(null);
  const rating= useRef(null);
  const stock= useRef(null);
  const brand= useRef(null);
  const category= useRef(null);
  const thumbnail= useRef(null);
  const images= useRef(null);

  const resetForm = () => {
    title.current.value = "";
    description.current.value = "";
    price.current.value = "";
    discountPercentage.current.value = "";
    rating.current.value = "";
    stock.current.value = "";
    brand.current.value = "";
    category.current.value = "";
    thumbnail.current.value = "";
    images.current.value = "";
  };

  const submit = async(event) =>{
    event.preventDefault();
    const formData={
      title: title.current.value,
      description: description.current.value,
      price: parseFloat(price.current.value),
      discountPercentage: parseFloat(discountPercentage.current.value),
      rating: parseFloat(rating.current.value),
      stock: parseInt(stock.current.value, 10),
      brand: brand.current.value,
      category: category.current.value,
      thumbnail: thumbnail.current.value,
      images: images.current.value, 
    }
    console.log('data is ', formData)

    try{
      const response = await axios.post( "/api/products",  {inputData:formData} );
      console.log("response is :-", response.data)
  
        if (response.status === 201){
          console.log('data added')
          resetForm();

          
        }else{
          console.log('failed to add data')
        }
      } catch (error) {
          console.error('Error:', error.message);
        
      }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-24">
      <h1 className="font-extrabold ">Add data</h1>
      <Link href="/show" className="font-mono text-rose-600 hover:text-green-900">
      check data 
     </Link>
      <form className='bg-slate-400 border rounded-2xl' onSubmit={submit} >
       <div className='flex justify-center pt-7'>
       <label htmlFor="title" >Title :</label>
       <input className="rounded-2xl px-2" type='text'  id='title' ref={title} required />
       </div>
       
       <div className='flex justify-center pt-7'>
       <label htmlFor="description" >Description :</label>
       <textarea className="rounded-2xl px-2" type='text'id='description' ref={description} rows={2} cols={50} required />
       </div>
     
       <div className='flex justify-center pt-7'>
       <label htmlFor="price" >price :</label>
       <input className="rounded-2xl px-2" type='number' id='price' ref={price} required />
     
       </div>
      
       <div className='flex justify-center pt-7'>
       <label htmlFor="discountPercentage" >Discount Percentage :</label>
       <input className="rounded-2xl px-2" type='decimel' id='discountPercentage' ref={discountPercentage} step="0.01" required />
    
       </div>
       <div className='flex justify-center pt-7'>
       <label htmlFor="rating" >Rating :</label>
       <input className="rounded-2xl px-2" type='number'  id='rating'ref={rating} step="0.01" required />
      
       </div>
       <div className='flex justify-center pt-7'>
       <label htmlFor="stock" >Stock :</label>
       <input className="rounded-2xl px-2" type='number'  id='stock' ref={stock} required />
       
       </div>
       <div className='flex justify-center pt-7'>
       <label htmlFor="brand" >Brand :</label>
       <input className="rounded-2xl px-2" type='text'  id='brand' ref={brand} required />
       
       </div>
       <div className='flex justify-center pt-7'>
       <label htmlFor="category" >Category :</label>
       <input className="rounded-2xl px-2" type='text'  id='category' ref={category} required />
       
       </div>
       <div className='flex justify-center pt-7'>
       <label htmlFor="thumbnail" >Thumbnail :</label>
       <textarea className="rounded-2xl px-2 " type='text'  id='thumbnail' ref={thumbnail} rows={2} cols={50} required />
       </div>
       <div className='flex justify-center pt-7 m-2'>
       <label htmlFor="images" >Images :</label>
       <textarea className="rounded-2xl px-2" type='text'  id='images' ref={images} rows={5} cols={60} required />
       
       </div>
       <br />
       <div className='flex justify-center pb-3'>
       <button className='font-extrabold bg-gray-600 text-white p-2 border rounded-2xl hover:px-3' type='submit' >Submit</button>
       </div>
     </form>
    </main>
  );
}
