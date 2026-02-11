import { useState } from 'react';

function Cart(){

    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    return(
        <div>
            <h1>{cart.length === 0 ? "Your cart is empty" : `You have ${cart.length} items in your cart`}</h1>
            {cart.length > 0 && (
                <div style={{
                    marginTop: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}>
                    {cart.map((item, index) => (
                        <div key={`${item.filename}-${index}`} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            paddingBottom: '16px',
                            borderBottom: '1px solid #ddd'
                        }}>
                            <img
                                src={item.image}
                                alt={item.name}
                                loading="lazy"
                                decoding="async"
                                style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: '6px' }}
                            />
                            <div style={{ textAlign: 'left' }}>
                                <h3 style={{ margin: 0, fontSize: '18px' }}>{item.name}</h3>
                                <p style={{ margin: '6px 0 0', color: '#666' }}>{item.filename}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Cart;