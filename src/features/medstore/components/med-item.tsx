import { useAddProductInBasketMutation, useCountUpMutation, useLazyGetProductInBasketQuery, type IMedicine } from "../medstore.api";

interface IProps{
    medicine:IMedicine
}
export const MedItem:React.FC<IProps> = ({medicine}) => {

    const [handleAdd] = useAddProductInBasketMutation()
    const [countUp] = useCountUpMutation()
    const [trigger] = useLazyGetProductInBasketQuery()

    

    return (
        <div className="bg-gray-700 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <img
                src={medicine.photoUrl}
                alt={medicine.name}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-white-800 mb-2">
                    {medicine.name}
                </h2>
                <p className="text-white-100 mb-1">
                    <span className="font-semibold text-white-600">Category:</span> {medicine.category}
                </p>
                <p className="text-white-100 mb-1">
                    <span className="font-semibold text-white-600">Price:</span> ${medicine.price.toFixed(2)}
                </p>
                <p className="text-gray-200 text-sm">
                    {medicine.description}
                </p>
                <button 
                    className="mt-4 w-full py-2 bg-indigo-400 text-white rounded hover:bg-indigo-500 transition-colors duration-200"
                    onClick={() => {
                        trigger(medicine.id)
                        .unwrap()
                        .then(response => {
                            if(Array.isArray(response) && response.length == 0) {
                                handleAdd({...medicine, count: 1})
                            }else if(Array.isArray(response) && response.length !== 0){
                                countUp({
                                    newCount: response[0].count + 1,
                                    id: response[0].id
                                })
                            }
                        })
                    }}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}