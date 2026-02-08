import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import MWgroup from './Imgs/M&W_Group.PNG';
import Womens_salmon_Model from './Imgs/Womens_Salmon_Model_Edited.png';
import Group_Bar from './Imgs/Group_Bar_Edited.png';
import Womens_Blue_Model from './Imgs/Womens_Blue_Model_Edited.png';
import Hat_Longsleeve from './Imgs/Hat_Longsleeve_Model_Edited.png';

function Slideshow() {

    const slideImages = [
        {
            url: MWgroup,
        },
        {
            url: Womens_salmon_Model,
        },
        {
            url: Group_Bar,
        },
        {
            url: Womens_Blue_Model,
        },
        {
            url: Hat_Longsleeve,
        }
    ];

    return (
        <div className='slide-container'>
            <Slide autoplay={true} duration={3000} transitionDuration={500} infinite={true}>
                {slideImages.map((slideImage, index)=> (
                <div key={index}>
                    <div style={{ backgroundImage: `url(${slideImage.url})`, height: '600px', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span>{slideImage.caption}</span>
                    </div>
                </div>
                ))}
            </Slide>
        </div>
    )
}

export default Slideshow;