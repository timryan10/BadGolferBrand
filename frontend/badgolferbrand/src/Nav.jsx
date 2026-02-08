import logo from './Imgs/Badgolferlogo.png';
import { faCartShopping, faBars, faXmark, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Nav(){
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return(
        <>
            {/* Backdrop */}
            {isOpen && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 999
                    }}
                    onClick={toggleMenu}
                />
            )}

            {/* Sidebar Menu */}
            <div style={{
                position: 'fixed',
                top: 0,
                right: isOpen ? 0 : '-350px',
                width: '350px',
                height: '100%',
                backgroundColor: 'white',
                transition: 'right 0.3s ease',
                zIndex: 1000,
                boxShadow: isOpen ? '-2px 0 10px rgba(0,0,0,0.2)' : 'none',
                overflowY: 'auto'
            }}>
                {/* Close Button */}
                <div style={{
                    padding: '20px',
                    textAlign: 'right',
                    borderBottom: '1px solid #e5e5e5'
                }}>
                    <FontAwesomeIcon 
                        icon={faXmark} 
                        size="xl" 
                        style={{cursor: 'pointer'}} 
                        onClick={toggleMenu}
                    />
                </div>

                {/* Menu Items */}
                <div style={{padding: '20px 0'}}>
                    <Link to="/golf-apparel" style={{textDecoration: 'none', color: 'black'}} onClick={toggleMenu}>
                        <div style={{
                            padding: '20px 30px',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '18px',
                            fontWeight: '500'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                            <span>Golf Apparel</span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    </Link>

                    <Link to="/sweatshirts" style={{textDecoration: 'none', color: 'black'}} onClick={toggleMenu}>
                        <div style={{
                            padding: '20px 30px',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '18px',
                            fontWeight: '500'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                            <span>Sweatshirts</span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    </Link>

                    <Link to="/hats" style={{textDecoration: 'none', color: 'black'}} onClick={toggleMenu}>
                        <div style={{
                            padding: '20px 30px',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '18px',
                            fontWeight: '500'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                            <span>Hats</span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Nav Bar */}
            <nav style={{display: 'inline-flex', borderBottom: '2px solid black', width: '100%',height: '60px', justifyContent: 'space-between', alignItems: 'center', padding: '10px', position: 'relative'}}>
                <div style={{display: 'inline-flex', alignItems: 'center', gap: '20px'}}>
                    <Link to="/">
                        <img src={logo} alt="Bad Golfer Logo" style={{height:'50px', width:'50px', marginTop:'5px'}}/>
                    </Link>
                </div>
                <div>
                    <h1 style={{marginTop:'5px'}}>Bad Golfer Brand</h1>
                </div>
                <div style={{marginRight:'25px', display: 'inline-flex', alignItems: 'center', gap: '20px'}}>
                    <div>
                        <FontAwesomeIcon icon={faCartShopping} style={{cursor: 'pointer', height: '24px', width: '24px'}} />
                    </div>
                    <div style={{cursor: 'pointer'}} onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faBars} size="lg" />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav;