import { useState, useEffect } from 'react';
import { getDateFromDb } from '../../Config/mongoDb';
import './style.css';
import Loader from '../Loader';
import CategoryCartsContainer from '../../Component/Category-carts-container';
import { useSelector } from 'react-redux';
import { getDataOfAddToCart } from '../../Config/mongoDb';

function CartContainer() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const res = useSelector(res => res.userSlice.userInfo);
    
    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        const result = await getDateFromDb();
        const dataOfCart = await getDataOfAddToCart(res.userId);

        result.data.forEach(element => {

            for (let i = 0; i < dataOfCart.length; i++) {

                if (element._id == dataOfCart[i]) {
                    element.liked = true;
                };

            };
        });

        setProducts(result.data);

        let arr = [];
        
        result.data.forEach(res => {
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