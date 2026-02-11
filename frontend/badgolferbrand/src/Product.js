import { Link, useParams } from 'react-router-dom';
import useProducts from './hooks/useProducts';
import { useState, useEffect } from 'react';

function Product(){
    const { filename } = useParams();
    const { data, loading, error } = useProducts();
    const decodedFilename = decodeURIComponent(filename || '');
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const addToCart = (product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        console.log('Added to cart:', product);
    }

    const allProducts = [
        ...data.mens,
        ...data.womens,
        ...data.hats,
        ...data.hoodies
    ];

    const product = allProducts.find((item) => item.filename === decodedFilename);

    return(
        <div style={{padding: '30px 20px', maxWidth: '1000px', margin: '0 auto'}}>
            <Link to="/" style={{textDecoration: 'none', color: 'black'}}>&larr; Back</Link>
            {error && (
                <p style={{ color: 'crimson', marginTop: '20px' }}>{error}</p>
            )}
            {loading ? (
                <p style={{ marginTop: '20px' }}>Loading product...</p>
            ) : product ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '30px',
                    alignItems: 'start',
                    marginTop: '20px'
                }}>
                    <div style={{border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden'}}>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{width: '100%', height: '420px', objectFit: 'cover'}}
                        />
                    </div>
                    <div style={{textAlign: 'left'}}>
                        <h1 style={{marginTop: 0}}>{product.name}</h1>
                        <p style={{color: '#666'}}>Product ID: {product.filename}</p>
                        <button onClick={() => addToCart(product)}
                            type="button"
                            style={{
                                marginTop: '20px',
                                padding: '12px 24px',
                                backgroundColor: 'black',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ) : (
                <p style={{ marginTop: '20px' }}>Product not found.</p>
            )}
        </div>
    )
}

export default Product;