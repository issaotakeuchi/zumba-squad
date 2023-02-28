import './Card.scss'
import { useState, useEffect } from "react";
import { convertNumber } from '../utils/convertNumber'
import axios from "axios";

import { Heart, Star, MapPin, WifiHigh, Shower, PawPrint, Television, CookingPot, Car, Bathtub, Wind } from 'phosphor-react'


import { Link, useNavigate } from "react-router-dom";

export function Card({
    id,
    hostings,
    type,
    category,
    quantity,
    img,
    favorite,
    stars,
    title,
    grade,
    location,
    differential,
    description,

}) {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState(favorite);
    //const [descriptionText, setDescriptionText] = useState(description);



    function descriptionText() {
        if (description.length > 82) {
            return description.slice(0, 75)
        } else {
            return description
        }
    }

    function saibaMais() {
        navigate('/login')
    }

    function chooseCategory(id, category) {
        console.log(id);
        console.log(category);
        //console.log(hostings);
    }

    function favoriteToggle() {
        //setFavorites(!favorites)
        console.log(id);
    }

    function avaliacao() {

        if (grade <= 2.5) {
            return 'Ruim'
        } else if (grade > 2.5 && grade <= 5) {
            return 'Regular'
        } if (grade > 5 && grade <= 7.5) {
            return 'Bom'
        } if (grade > 7.5) {
            return 'Muito bom'
        } if (grade === undefined) {
            return 'Não avaliado'
        }
    }




    return (
        <>

            {type === 'category' &&

                <div type='category' onClick={() => chooseCategory(id, category)} className='cardBodyStyle'>
                    <section className='thumbStyle'>
                        <img className='imgStyle' src={img} />
                    </section>

                    <section className='textSection'>
                        <h2 >{category}</h2>
                        <p>{convertNumber(quantity)} hotéis</p>
                    </section>
                </div>}


            {(type === 'recomendations') &&
                <div type='recomendations' className='cardBodyStyle'>
                    <section className='thumbStyle'>
                        <img className='imgStyle' src={img} />
                        <a className='heartIconStyle' onClick={favoriteToggle}>
                            <input type="checkbox" id={`checkbox${id}`} onClick={favoriteToggle} className='inputFavStyle' />
                            <label htmlFor={`checkbox${id}`} className='labelStyle'>
                                <svg className="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
                                    <g className="Group" fill='none' fillRule="evenodd" transform="translate(467 392)">
                                        <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" className="heart" />
                                        <circle className="main-circ" fill='#E2264D' opacity="0" cx="29.5" cy="29.5" r="1.5" />
                                        <g className="grp7" opacity="0" transform="translate(7 6)">
                                            <circle className="oval1" fill='#9CD8C3' cx="2" cy="6" r="2" />
                                            <circle className="oval2" fill='#8CE8C3' cx="5" cy="2" r="2" />
                                        </g>
                                        <g className="grp6" opacity="0" transform="translate(0 28)">
                                            <circle className="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                                            <circle className="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
                                        </g>
                                        <g className="grp3" opacity="0" transform="translate(52 28)">
                                            <circle className="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                                            <circle className="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
                                        </g>
                                        <g className="grp2" opacity="0" transform="translate(44 6)">
                                            <circle className="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                                            <circle className="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
                                        </g>
                                        <g className="grp5" opacity="0" transform="translate(14 50)">
                                            <circle className="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
                                            <circle className="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
                                        </g>
                                        <g className="grp4" opacity="0" transform="translate(35 50)">
                                            <circle className="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
                                            <circle className="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
                                        </g>
                                        <g className="grp1" opacity="0" transform="translate(24)">
                                            <circle className="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
                                            <circle className="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
                                        </g>
                                    </g>
                                </svg>
                            </label>
                        </a>
                    </section>

                    <section className='detailsStyle'>

                        <section className='section1'>
                            <div className='titleStyle'>
                                <div className='starsStyle'>
                                    <h4>Hotel</h4>
                                    <div className='stars'>
                                        {stars.map((iten, index) => (
                                            <Star key={index} size={14} color="#1DBEB4" weight="fill" />
                                        ))}
                                    </div>
                                </div>
                                <h1>{title}</h1>
                            </div>

                            <div className='gradesStyle'>
                                <div className='grade'>{grade}</div>
                                <p className='text-small gradeText'>{avaliacao()}</p>
                            </div>
                        </section>

                        <section className='section2'>
                            <p className='locationText text-normal'>
                                <MapPin size={20} color="#545776" weight="fill" />
                                {location} -
                                <Link to={'/createUser'} className='linkStyle'>MOSTRAR NO MAPA</Link>
                            </p>

                            <div className='diferentialsStyle'>
                                <WifiHigh size={20} color="#383b58" />
                                <Shower size={20} color="#383b58" />
                                <PawPrint size={20} color="#383b58" weight="fill" />
                                <Television size={20} color="#383b58" />
                                <CookingPot size={20} color="#383b58" />
                                <Car size={20} color="#383b58" />
                                <Bathtub size={20} color="#383b58" />
                                <Wind size={20} color="#383b58" />
                            </div>
                        </section>

                        <section className='section3 text-normal'>
                            <p className='textStyle'>
                                {descriptionText()}
                                {description.length > 82 && <Link to={'/login'} className='maisTexto '>mais...</Link>}
                            </p>
                        </section>

                        <button className='btn'>Ver mais</button>

                    </section>
                </div>

            }
        </>
    )
}