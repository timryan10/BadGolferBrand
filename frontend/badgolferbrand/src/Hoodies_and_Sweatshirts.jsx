import useProducts from './hooks/useProducts';
import { Link } from 'react-router-dom';

function Hoodies(){
    const { data, loading, error } = useProducts();
    const items = data.hoodies;

    return(
        <div>
            <h1 style={{marginTop:'20px', textAlign: 'center'}}>Hoodies and Sweatshirts</h1>
            
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
                    padding: '40px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            to={`/product/${encodeURIComponent(item.filename)}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div style={{
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
                                    src={item.image} 
                                    alt={item.name}
                                    loading="lazy"
                                    decoding="async"
                                    style={{
                                        width: '100%',
                                        height: '300px',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div style={{padding: '15px', textAlign: 'center'}}>
                                    <h3 style={{margin: '0', fontSize: '16px'}}>{item.name}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Hoodies;