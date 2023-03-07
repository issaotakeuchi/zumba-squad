import './Card.scss'
import { useState, useEffect } from "react";
import { convertNumber } from '../utils/convertNumber'
import axios from "axios";
import { gradeStatus } from '../utils/gradeStatus'
import { toast } from 'react-toastify';
import { Star, MapPin, WifiHigh, Shower, PawPrint, Television, CookingPot, Car, Bathtub, Wind } from 'phosphor-react'
import { Link, useNavigate } from "react-router-dom";
import { HeartIcon } from './HeartIcon';


export function Card({
    id,
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

   

    function descriptionText() {
        if (description.length > 75) {
            return description.slice(0, 75)
        } else {
            return description
        }
    }

    function chooseCategory(id, category) {
        console.log(id);
        console.log(category);
    }

   /*  function favoriteToggle() {

        if (!compareToken()) {
            toast.error('Você precisa estar logado para favoritar os itens')
        }else {
            return console.log('Favorito salvo');
        }
    } */

    

    return (
        <>

            {type === 'category' &&


                <Link to={`/category/${id}`} type='category' className='cardBodyStyle'>
                    <section className='thumbStyle'>
                        <img className='imgStyle' src={img} />
                    </section>

                    <section className='textSection'>
                        <h2>{category}</h2>
                        <p>{convertNumber(quantity)} hotéis</p>
                    </section>
                </Link>}


            {(type === 'recomendations') &&
                <div type='recomendations' className='cardBodyStyle'>
                    <section className='thumbStyle'>
                        <img className='imgStyle' src={img} />
                        <HeartIcon className='heartIconStyle' id={id} favorite={favorite}/>
                    </section>

                    <section className='detailsStyle'>

                        <section className='section1'>
                            <div className='titleStyle'>
                                <div className='starsStyle'>
                                    <h4>Hotel</h4>
                                    <div className='stars'>
                                        {/* {stars.map((iten, index) => (
                                            <Star key={index} size={14} color="#1DBEB4" weight="fill" />
                                        ))} */}

                                        <Star size={14} color="#1DBEB4" weight="fill" />
                                        <Star size={14} color="#1DBEB4" weight="fill" />
                                        <Star size={14} color="#1DBEB4" weight="fill" />
                                        <Star size={14} color="#1DBEB4" weight="fill" />
                                        <Star size={14} color="#b6b9b9" weight="fill" />
                                    </div>
                                </div>
                                <h1 className='title'>{title}</h1>
                            </div>

                            <div className='gradesStyle'>
                                <div className='grade'>{grade.toFixed(1)}</div>
                                <p className='text-small gradeText'>{gradeStatus(grade)}</p>
                            </div>
                        </section>

                        <section className='section2'>
                            <p className='locationText text-normal'>
                                <MapPin size={20} color="#545776" weight="fill" />
                                {location} -
                                <Link to={'/createUser'} className='linkStyle'>MOSTRAR NO MAPA</Link>
                            </p>

                            <div className='diferentialsStyle'>
                                {differential.includes('wi-fi') && <WifiHigh size={20} color="#383b58" />}
                                {differential.includes('pool') && <div  className='poolIcon'/>}
                                {differential.includes('pets') && <PawPrint size={20} color="#383b58" weight="fill" />}
                                {differential.includes('tv') && <Television size={20} color="#383b58" />}
                                {differential.includes('kitchen') && <CookingPot size={20} color="#383b58" />}
                                {differential.includes('parking') && <Car size={20} color="#383b58" />} 
                                {differential.includes('jacuzzi') && <Bathtub size={20} color="#383b58" />}
                                {differential.includes('air-conditioning') && <Wind size={20} color="#383b58" />} 
                            </div>
                        </section>

                        <section className='section3 text-normal'>
                            <p className='textStyle'>
                                {descriptionText()}
                                {description.length > 75 && <Link to={`/product/${id}`} className='maisTexto '>mais...</Link>}
                            </p>
                        </section>
                        <Link to={`/product/${id}`}><button className='btn'>Ver mais</button></Link>
                    </section>
                </div>

            }
        </>
    )
}