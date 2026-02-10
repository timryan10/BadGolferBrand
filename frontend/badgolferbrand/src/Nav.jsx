import logo from './Imgs/Badgolferlogo.png';
import { faCartShopping, faBars, faXmark, faChevronRight, faUser } from '@fortawesome/free-solid-svg-icons';
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
                    className="nav__backdrop"
                    onClick={toggleMenu}
                />
            )}

            {/* Sidebar Menu */}
            <div className={`nav__drawer ${isOpen ? 'nav__drawer--open' : ''}`}>
                <div className="nav__drawer-header">
                    <FontAwesomeIcon 
                        icon={faXmark} 
                        size="xl" 
                        className="nav__drawer-close"
                        onClick={toggleMenu}
                    />
                </div>

                <div className="nav__drawer-list">
                    <Link to="/golf-apparel" className="nav__drawer-link" onClick={toggleMenu}>
                        <span>Golf Apparel</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                    <Link to="/sweatshirts" className="nav__drawer-link" onClick={toggleMenu}>
                        <span>Longsleeves</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                    <Link to="/hats" className="nav__drawer-link" onClick={toggleMenu}>
                        <span>Hats</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                </div>
            </div>

            {/* Nav Bar */}
            <nav className="nav">
                <div className="nav__left">
                    <Link to="/" className="nav__brand">
                        <img src={logo} alt="Bad Golfer Logo" className="nav__logo" />
                        <h1 className="nav__title" style={{fontSize: '30px', fontFamily:'Oswald semi-bold'}}> <strong>bad golfer</strong></h1>
                    </Link>
                </div>
                <div className="nav__center">
                    <Link to="/golf-apparel" className="nav__link">Golf Apparel</Link>
                    <Link to="/hats" className="nav__link">Hats</Link>
                    <Link to="/sweatshirts" className="nav__link">Longsleeves</Link>
                </div>
                <div className="nav__right" style={{display:'flex', justifyContent:'space-evenly', fontSize:'24px'}}>
                    <Link to="/cart" className="nav__cart">
                        <FontAwesomeIcon icon={faCartShopping} />
                    </Link>
                    <FontAwesomeIcon icon={faUser} className="nav__user" />
                    <button className="nav__hamburger" type="button" onClick={toggleMenu} aria-label="Open menu">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Nav;