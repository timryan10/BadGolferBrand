import Solid_Black_Hat from './Imgs/Solid_Black_Hat.PNG';
import Green_Hat from './Imgs/Green_Hat.PNG';
import Dark_Blue_Hat from './Imgs/Dark_Blue_Hat.PNG';
import Camo_Hat from './Imgs/Camo_Hat.PNG';
import Blue_Red_Hat from './Imgs/Blue_Red_Hat.PNG';
import Blue_Gray_Hat from './Imgs/Blue_Gray_Hat.PNG';
import Black_Green_Hat from './Imgs/Black_Green_Hat.PNG';

function Hats(){
    const hats = [
        { name: "Solid Black Hat", image: Solid_Black_Hat },
        { name: "Green Hat", image: Green_Hat },
        { name: "Dark Blue Hat", image: Dark_Blue_Hat },
        { name: "Camo Hat", image: Camo_Hat },
        { name: "Blue Red Hat", image: Blue_Red_Hat },
        { name: "Blue Gray Hat", image: Blue_Gray_Hat },
        { name: "Black Green Hat", image: Black_Green_Hat }
    ];

    return(
        <div>
            <h1 style={{marginTop:'20px', textAlign: 'center'}}>Hats</h1>
            
            {/* Product Grid */}
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
        </div>
    )
}

export default Hats;