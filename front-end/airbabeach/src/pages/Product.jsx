import "./Product.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-toastify';
import { products } from '/public/cardsMock.js'
import { ShareNetwork, X, CaretLeft, Star, MapPin, WifiHigh, PawPrint, Television, CookingPot, Car, Bathtub, Wind } from 'phosphor-react'
import { gradeStatus } from '../utils/gradeStatus'
import { breakLines } from '../utils/breakLines'
import { Carousel } from "../Components/Carousel";

import Swal from 'sweetalert2'
import { HeartIcon } from "../Components/HeartIcon";



export function Product() {
    const { id } = useParams()
    //const navigate = useNavigate();
    //const [productData, setProductData] = useState(recomendations[0]);
    const [productData, setProductData] = useState('');
    const [modal, setModal] = useState(false);
    //const [lines, setLines] = useState('');
    //const [details, setDetails] = useState('');
    //const [differential, setDifferential] = useState('');


    //useffect usado para simular a requisição
    useEffect(() => {
        let produtoSelecionado = products.find((item) => {
            return item.id == id
        })
        console.log(produtoSelecionado);
        setProductData(produtoSelecionado)

        //setLines(produtoSelecionado.description.text.replaceAll('. ', '. \n').split('\n'))
        //setLines(produtoSelecionado.description.text)
        //setDetails(produtoSelecionado.details)
        //setDifferential(produtoSelecionado.differential)
    }, [])

    /* useEffect(() => {

        let url = `https://www.airbabeach/product/${id}`;

        axios.get(url).then((response) => {
            console.log(response);
            setProductData(response)

        }, (error) => {
            console.log(error.code);

            if (error.status == 404) return toast.error('Houve um problema, recarregue a página');
            if (error.code === 'ERR_NETWORK') return toast.error('Verifique a sua conexão com a internet.');
        });
    }, []) */






    return (
        <>
            {productData !== '' &&

                <section className="productContainer">
                    {modal &&
                        <div className="carouselContainer" >
                            <div className="controle" onClick={() => setModal(!modal)}></div>
                            <Carousel imgs={productData.img} />
                            <X size={32} className='closeIcon' color="#ffffff" weight="bold" onClick={() => setModal(!modal)} />

                        </div>
                    }

                    <section className="headerSection">
                        <div className="headerText">
                            <p className="h4">Hotel</p>
                            <p className='title h1'>{productData.title}</p>
                        </div>

                        <Link to={'/home'}><CaretLeft className="caretLeftIcon" size={32} color="#ffffff" weight="bold" /></Link>
                    </section>

                    <section className="locationSection">
                        <div className="locationText">
                            <MapPin className="mapPinStyle" size={20} color="#545776" weight="fill" />
                            <p className="text-normal">Buenos Aires, Cidade Autônoma de Buenos Aires, Argentina
                                940 m para o centro</p>
                        </div>

                        <div className="locationGrade">
                            <div className="gradeRating">
                                <p className='text-small gradeText'>{gradeStatus(productData.grade)}</p>
                                <div className='stars'>
                                    <Star size={14} color="#1DBEB4" weight="fill" />
                                    <Star size={14} color="#1DBEB4" weight="fill" />
                                    <Star size={14} color="#1DBEB4" weight="fill" />
                                    <Star size={14} color="#1DBEB4" weight="fill" />
                                    <Star size={14} color="#b6b9b9" weight="fill" />
                                </div>
                            </div>
                            <div className='grade'>{productData.grade.toFixed(1)}</div>
                        </div>
                    </section>

                    <section className="shareSection">
                        <ShareNetwork size={24} color="#000000" style={{ "cursor": "pointer" }} />
                        <HeartIcon className='heartIconStyle' id={productData.id} border={true} favorite={productData.favorite} />
                    </section>

                    <section className="imgsSection">

                        <div className="desktopStyle">
                            <img className="img0" src={productData.img[0]} />
                            <img className="img1" src={productData.img[1]} />
                            <img className="img2" src={productData.img[2]} />
                            <img className="img3" src={productData.img[3]} />
                            <img className="img4" src={productData.img[4]} />
                        </div>

                        {/* {productData.img.length > 5 &&
                            <div className="seeMoreStyle">
                                <a onClick={() => setModal(!modal)}>Ver mais</a>
                            </div>
                        } */}

                        <div className="seeMoreStyle">
                            <a onClick={() => setModal(!modal)}>Ver mais</a>
                        </div>


                        <div className='carouselComponent'>
                            <Carousel imgs={productData.img} />
                        </div>
                    </section>

                    <section className="descriptionSection">
                        <h1 className=".h1 descriptionTitle">{productData.description.title}</h1>

                        {breakLines(productData.description.text).map((itens, index) => (
                            <p key={index} className='text-normal'>{itens}</p>
                        ))}

                    </section>

                    <section className="diferentialSection">
                        <h1 className="h1">O que esse lugar oferece?</h1>
                        <hr />
                        <div className="diferentialItens">
                            {productData.differential.includes('wi-fi') && <p className="iconsText text-normal"><WifiHigh size={20} color="#383b58" /> - Wi-Fi</p>}
                            {productData.differential.includes('pool') && <div className="iconsText text-normal"><p className='poolIcon'></p> - Piscina</div>}
                            {productData.differential.includes('pets') && <p className="iconsText text-normal"><PawPrint size={20} color="#383b58" weight="fill" /> - Pet friendly</p>}
                            {productData.differential.includes('tv') && <p className="iconsText text-normal"><Television size={20} color="#383b58" /> - Televisão</p>}
                            {productData.differential.includes('kitchen') && <p className="iconsText text-normal"><CookingPot size={20} color="#383b58" /> - Cozinha</p>}
                            {productData.differential.includes('parking') && <p className="iconsText text-normal"><Car size={20} color="#383b58" /> - Estacionamento</p>}
                            {productData.differential.includes('jacuzzi') && <p className="iconsText text-normal"><Bathtub size={20} color="#383b58" /> - Jacuzzi</p>}
                            {productData.differential.includes('air-conditioning') && <p className="iconsText text-normal"><Wind size={20} color="#383b58" /> - Ar condicionado</p>}
                        </div>
                    </section>

                    <section className="mapSection">
                        <h1 className="h1">Localização</h1>
                    </section>

                    <section className="availabilitySection">
                        <h1 className="h1">Datas disponíveis</h1>
                    </section>

                    <section className="politicsSection">
                        <h1 className="h1">O que você precisa saber:</h1>

                        <section className="politicDetails">
                            <section>
                                <h2 className="h3">Regras da casa</h2>

                                {breakLines(productData.details.houseRules).map((itens, index) => (
                                    <p key={index} className='text-normal detailText'>{itens}</p>
                                ))}


                            </section>

                            <div>
                                <h2 className="h3">Saúde e Segurança</h2>
                                {breakLines(productData.details.healthSafety).map((itens, index) => (
                                    <p key={index} className='text-normal detailText'>{itens}</p>
                                ))}

                            </div>

                            <div>
                                <h2 className="h3">Política de cancelamento</h2>
                                {breakLines(productData.details.refundPolitics).map((itens, index) => (
                                    <p key={index} className='text-normal detailText'>{itens}</p>
                                ))}

                            </div>
                        </section>


                    </section>

                </section>
            }
        </>
    )
}