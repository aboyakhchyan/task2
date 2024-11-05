import { useCountUpMutation, useGetProductsInBasketQuery } from "../medstore.api"

interface IProp {
    onClose: () => void
}

export const Modal: React.FC<IProp> = ({onClose}) => {

    const {data} = useGetProductsInBasketQuery()
    const [countUp] = useCountUpMutation()
    

    return (
        <>
            <div className="modal-head">
                <p onClick={onClose}>X</p>
                <h2 style={{color: 'black'}}>Basket</h2>
                <div className="modal-content">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th>id</th>
                                    <th>name</th>
                                    <th>price</th>
                                    <th>count</th>
                                    <th>actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                data && data.map(prod => 
                                    <tr key={prod.id}>
                                        <td>{prod.id}</td>
                                        <td>{prod.name}</td>
                                        <td>{prod.price * prod.count}</td>
                                        <td>{prod.count}</td>
                                        <td>
                                            <button 
                                                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                                                onClick={() => countUp({
                                                    newCount: prod.count + 1,
                                                    id: prod.id
                                                })}
                                            >Count up</button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                </div>
            </div>
        </>
    )
}