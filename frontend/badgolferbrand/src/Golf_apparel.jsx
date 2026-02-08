import { useState } from 'react';
import Men_Camogreen from './Imgs/Mens_Camogreen.PNG';
import Womens_Salmon from './Imgs/Womens_Salmon.PNG';
import Mens_Greenspots from './Imgs/Mens_Greenspots.PNG';
import Mens_lightblue from './Imgs/Mens_Lightblue.PNG';
import Mens_Oldschool from './Imgs/Mens_Oldschool.PNG';
import Mens_Palmtrees from './Imgs/Mens_Palmtrees.PNG';
import Mens_Stripedblue from './Imgs/Mens_Stripedblue.PNG';
import Mens_Triangles from './Imgs/Mens_Triangles.PNG';
import Mens_Wavyblue from './Imgs/Mens_Wavyblue.PNG';
import Mens_Wavygreen from './Imgs/Mens_Wavygreen.PNG';
import Womens_Blue_Wavy from './Imgs/Womens_Blue_Wavy.PNG';
import Womens_Lightblue from './Imgs/Womens_Lightblue.PNG';
import Womens_Lightgreen from './Imgs/Womens_Lightgreen.PNG';
import Womens_Royal_Blue from './Imgs/Womens_Royal_Blue.PNG';

function GolfApparel(){
    const [activeTab, setActiveTab] = useState('mens');

    const mensShirts = [
        { name: "Camo Green", image: Men_Camogreen },
        { name: "Green Spots", image: Mens_Greenspots },
        { name: "Light Blue", image: Mens_lightblue },
        { name: "Old School", image: Mens_Oldschool },
        { name: "Palm Trees", image: Mens_Palmtrees },
        { name: "Striped Blue", image: Mens_Stripedblue },
        { name: "Triangles", image: Mens_Triangles },
        { name: "Wavy Blue", image: Mens_Wavyblue },
        { name: "Wavy Green", image: Mens_Wavygreen }
    ];

    const womensShirts = [
        { name: "Salmon", image: Womens_Salmon },
        { name: "Blue Wavy", image: Womens_Blue_Wavy },
        { name: "Light Blue", image: Womens_Lightblue },
        { name: "Light Green", image: Womens_Lightgreen },
        { name: "Royal Blue", image: Womens_Royal_Blue }
    ];

    const currentShirts = activeTab === 'mens' ? mensShirts : womensShirts;

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

            {/* Product Grid */}
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
        </div>
    )
}

export default GolfApparel;