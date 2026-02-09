import { useState } from 'react';
import useProducts from './hooks/useProducts';

function GolfApparel(){
    const [activeTab, setActiveTab] = useState('mens');
    const { data, loading, error } = useProducts();
    const currentShirts = activeTab === 'mens' ? data.mens : data.womens;

    return(
        <div>
            <h1 style={{marginTop:'20px', textAlign: 'center'}}>Golf Apparel</h1>
            
            {/* Tab Navigation */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginTop: '30px',
                marginBottom: '30px'
            }}>
                <button
                    onClick={() => setActiveTab('mens')}
                    style={{
                        padding: '12px 40px',
                        fontSize: '18px',
                        fontWeight: '600',
                        border: 'none',
                        borderBottom: activeTab === 'mens' ? '3px solid black' : '3px solid transparent',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Men's
                </button>
                <button
                    onClick={() => setActiveTab('womens')}
                    style={{
                        padding: '12px 40px',
                        fontSize: '18px',
                        fontWeight: '600',
                        border: 'none',
                        borderBottom: activeTab === 'womens' ? '3px solid black' : '3px solid transparent',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Women's
                </button>
            </div>

            {error && (
                <p style={{ textAlign: 'center', color: 'crimson', marginBottom: '10px' }}>
                    {error}
                </p>
            )}

            {loading ? (
                <p style={{ textAlign: 'center' }}>Loading products...</p>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '30px',
                    padding: '20px 40px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {currentShirts.map((shirt, index) => (
                        <div key={index} style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}>
                            <img 
                                src={shirt.image} 
                                alt={shirt.name}
                                style={{
                                    width: '100%',
                                    height: '300px',
                                    objectFit: 'cover'
                                }}
                            />
                            <div style={{padding: '15px', textAlign: 'center'}}>
                                <h3 style={{margin: '0', fontSize: '16px'}}>{shirt.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default GolfApparel;