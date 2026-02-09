import useProducts from './hooks/useProducts';

function Hats(){
    const { data, loading, error } = useProducts();
    const hats = data.hats;

    return(
        <div>
            <h1 style={{marginTop:'20px', textAlign: 'center'}}>Hats</h1>
            
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
                    {hats.map((hat, index) => (
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
                                src={hat.image} 
                                alt={hat.name}
                                style={{
                                    width: '100%',
                                    height: '300px',
                                    objectFit: 'cover'
                                }}
                            />
                            <div style={{padding: '15px', textAlign: 'center'}}>
                                <h3 style={{margin: '0', fontSize: '16px'}}>{hat.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Hats;