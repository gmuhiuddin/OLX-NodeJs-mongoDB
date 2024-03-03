import { useState, useEffect } from 'react';
import { getDateFromDb } from '../../Config/mongoDb';
import './style.css';
import Loader from '../Loader';
import CategoryCartsContainer from '../../Component/Category-carts-container';

function CartContainer() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        checkTheCategories();
    }, [products]);

    async function getProducts() {
        const result = await getDateFromDb();
        
        setProducts(result.data);
    };

    const checkTheCategories = () => {
        let arr = [...categories];

        products.forEach(res => {
            let alreadyExist = false;

            arr.forEach(result => {
                if (res?.category == result) {
                    alreadyExist = true;
                };
            });

            if (!alreadyExist) {
                arr.push(res?.category);

                setCategories(arr);
            };


        })
    };

    if (!categories.length) {
        return <Loader />
    };

    return (
        <div className="carts-container">
            {categories.map((res, key) => {
                return <CategoryCartsContainer key={key} products={products} category={res} />
            })}
        </div>
    )
};

export default CartContainer;