import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faInstagram, faTiktok} from '@fortawesome/free-brands-svg-icons';

function Footer(){
    return(
        <div className="footer">
            <p>&copy; 2024 Bad Golfer Brand. All rights reserved.</p>
            <div className="footer__socials">
                <Link to= 'https://www.instagram.com/badgolfer.brand?igsh=eWQ1djQ1Mnl3ejhp&utm_source=qr' style={{color: 'white', fontSize:'24px'}}>
                    <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link to='https://www.tiktok.com/@badgolfer.brand?_r=1&_t=ZT-93lDn5PwRyw' style={{color: 'white', fontSize: '24px'}}>
                    <FontAwesomeIcon icon={faTiktok} />
                </Link>
            </div>
        </div>
    )
}

export default Footer;