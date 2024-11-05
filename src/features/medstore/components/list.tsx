import { useEffect, useState } from "react"
import { useGetMedicinesQuery, useLazyGetMedicinesQuery } from "../medstore.api"
import { MedItem } from "./med-item"
import { Modal } from "./modal"

export const List = () => {

    const [page, setPage] = useState<number>(4)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [trigger, {data}] = useLazyGetMedicinesQuery()

    useEffect(() => {
        trigger(page)
    }, [page])
        
    
    return <div className="container mx-auto p-6">
        <h1 className="text-4xl uppercase font-bold text-center text-white-800 mb-6"> Available Medicines</h1>
        <img 
                src='https://cdn2.iconfinder.com/data/icons/shop-and-delivery/44/trolley-512.png'
                className="basket"
                onClick={() => setIsOpen(true)}
        />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
                data && data.map(med =>

                    <MedItem medicine={med} key={med.id} />
                )
            }
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setPage(page + 4)} 
            >Next</button>
        </div>

        {
            isOpen && <Modal onClose={() => setIsOpen(false)}/>
        }

        
    </div>
}