import Green_lonsleeve from './Imgs/Green_Longsleeve.PNG';
import White_hoodie from './Imgs/White_Hoodie.jpg';
import Longsleeve_Bad_Golfer_Brand from './Imgs/Longsleeve_Bad_Golfer_Brand.PNG';
import Longsleeve_Logo from './Imgs/Longsleeve_Logo.PNG';

function Hoodies(){
    const items = [
        { name: "Green Longsleeve", image: Green_lonsleeve },
        { name: "White Hoodie", image: White_hoodie },
        { name: "Longsleeve Bad Golfer Brand", image: Longsleeve_Bad_Golfer_Brand },
        { name: "Longsleeve Logo", image: Longsleeve_Logo }
    ];

    return(
        <div>
            <h1 style={{marginTop:'20px', textAlign: 'center'}}>Hoodies and Sweatshirts</h1>
            
            {/* Product Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '30px',
                padding: '40px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {items.map((item, index) => (
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
                            src={item.image} 
                            alt={item.name}
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
                ))}
            </div>
        </div>
    )
}

export default Hoodies;