import React from 'react';
import Carts from '../Carts';

function CategoryCartsContainer({ products, category }) {

    const res = products.filter(res => res?.category == category);

    const category1stletter = category[0].toUpperCase();
    const categorywithout1stletter = category.slice(1);

    return (
        <div style={{ width: '100%' }}>
            <h1 style={{ textAlign: 'left', marginLeft: 19 }}>{category1stletter + categorywithout1stletter}</h1>

            <div style={{ display: 'flex', justifyContent:'center', flexWrap: 'wrap' }}>
                {res.map((element, id) => {
                    return <Carts key={id} cartInfo={element} />
                })}
            </div>
        </div>
    )
}

export default CategoryCartsContainer;