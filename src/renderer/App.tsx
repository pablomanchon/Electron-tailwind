import { useEffect, useState } from 'react'
import './App.css'
import { findAllProducts, findProductById } from './db/dbProducts'
import { Producto } from '../main/database/entities/Producto'

function App() {
      const [products, setProducts] = useState<Producto[]>([])
      useEffect(() => {
            console.log("Prueba")
            const getData = async () => {
                  try {
                        setProducts(await findAllProducts());
                  } catch (error) {
                        console.log(error);
                  }
            }
            getData();
      }, [])
      useEffect(() => {
            console.log(products)
      }, [products])

      const handleClick = async (id: number) => {
            const res = await findProductById(id);
            console.log(res);
      }

      return (
            <>
                  <div className='p-2 h-screen bg-gray-800 flex items-center justify-center'>
                        {products.map((p) => <div onClick={() => handleClick(p.id)} key={p.id} className="p-10 bg-blue-800 rounded shadow-sm shadow-black transition-all duration-1000 animate-pulse hover:bg-yellow-600 hover:p-14 ">
                        </div>)}
                  </div>
            </>
      )
}

export default App
