import { products } from '/public/cardsMock.js'

import "./Product.scss";
import { useState, useEffect, useRef } from "react";
import { Link, useParams } from 'react-router-dom'
import { Copy, ShareNetwork, X, CaretLeft, Star, MapPin, WifiHigh, PawPrint, Television, CookingPot, Car, Bathtub, Wind } from 'phosphor-react'
import { Carousel } from "../Components/Carousel";
import { HeartIcon } from "../Components/HeartIcon";
import { Map } from "../Components/Map";
import { gradeStatus } from '../utils/gradeStatus'
import { breakLines } from '../utils/breakLines'

import axios from "axios";
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import Litepicker from 'litepicker';

import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

import {
    FacebookIcon,
    FacebookMessengerIcon,
    LinkedinIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";
import { StarRate } from '../Components/StarRate';



export function Product() {
    const { id } = useParams()
    const [productData, setProductData] = useState('');
    const [modal, setModal] = useState(false);
    const [share, setShare] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const [datePicker, setDatePicker] = useState(false);

    //const [date, setDate] = useState('');
    const litepickerRef = useRef(null);


    function createDatepicker() {
        if (datePicker) {
            litepickerRef.current.destroy()
        }

        const lockedDates = [
            '2023-03-01', '2023-03-05', '2023-03-08',
            '2023-03-12', '2023-03-15', '2023-03-19',
        ];

        litepickerRef.current = new Litepicker({
            element: document.getElementById('datepicker'),
            numberOfMonths: 2,
            numberOfColumns: 2,
            //mobileFriendly: true,
            //splitView: true,
            selectForward: true,
            singleMode: false,
            lang: "pt-BR",
            format: "DD MMM",
            autoApply: true,
            autoClose: true,
            tooltipText: { "one": "dia", "other": "dias" },
            inlineMode: true,

            lockDaysFilter: (date1, date2, pickedDates) => {
                return lockedDates.includes(date1.format('YYYY-MM-DD'));
            },

            setup: (picker) => {

                /* picker.on('destroy', (tooltip, day) => {
                    console.log("destruido")
                }); */
                /* picker.on('selected', (date1, date2) => {
                    console.log("selecionado");
                }); */
                picker.on('render', (ui) => {
                    setDatePicker(true)
                });

            },
        });

        const mediaQuery = window.matchMedia("(max-width: 640px)");
        if (mediaQuery.matches) {
            litepickerRef.current.setOptions({ numberOfColumns: 1 });
            litepickerRef.current.setOptions({ numberOfMonths: 1 });
        } else {
            litepickerRef.current.setOptions({ numberOfColumns: 2 });
            litepickerRef.current.setOptions({ numberOfMonths: 2 });
        }
    }


    //useffect usado para simular a requisição
    useEffect(() => {
        let produtoSelecionado = products.find((item) => {
            return item.id == id
        })
        //console.log(produtoSelecionado);
        setProductData(produtoSelecionado)
        setShareUrl(window.location.href)

        setTimeout(() => {
            createDatepicker()
        }, 1);
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



    function cleanForm() {
        litepickerRef.current.clearSelection()
        litepickerRef.current.destroy()
        createDatepicker()
    }

    function validateForm() {
        let startDate = litepickerRef.current.options.startDate == null
        let endDate = litepickerRef.current.options.endDate == null

        if (startDate || endDate) {
            toast.error('Selecione as datas');
            return false
        }
        return true
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) return;

        let url = 'https://www.airbabeach/searchProductAvailability';
        let data = {
            startDate: litepickerRef.current.options.startDate.dateInstance.toISOString(),
            endDate: litepickerRef.current.options.endDate.dateInstance.toISOString()
        }

        console.log(data);

        /* axios.post(url, data).then((response) => {
            toast.success("Próximo destino econtrado!")
        }, (error) => {
            //console.log(error.code);
            if (error.status == 404) return toast.error('Destino não encontrada');
            if (error.status == 404) return toast.error('Erro ao preencher o formuário. Recarregue a página e tente novamente.');
            if (error.code === 'ERR_NETWORK') return toast.error('Verifique a sua conexão com a internet.');
        }); */

        cleanForm();
    }



    return (
        <>
            {productData !== '' &&

                <section className="productContainer">
                    {modal &&
                        <div className="carouselContainer" >
                            <div className="controle" onClick={() => setModal(false)}></div>
                            <Carousel imgs={productData.img} />
                            <X size={32} className='closeIcon' type='modal' color="#ffffff" weight="bold" onClick={() => setModal(false)} />

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
                            <p className="text-normal">Buenos Aires, Cidade Autônoma de Buenos Aires, Argentina {productData.location.distance}m para o centro</p>
                        </div>

                        <div className="locationGrade">
                            <div className="gradeRating">
                                <p className='text-small gradeText'>{gradeStatus(productData.grade)}</p>
                                <StarRate rate={productData.stars} />
                                
                            </div>
                            <div className='grade'>{productData.grade.toFixed(1)}</div>
                        </div>
                    </section>

                    <section className="shareSection">
                        <HeartIcon className='heartIconStyle' id={productData.id} border={true} favorite={productData.favorite} />
                        <ShareNetwork size={24} color="#000000" className='shareButton' onClick={() => setShare(true)} />

                        {share &&
                            <div className="shareContainer" >
                                <div className="controle" onClick={() => setShare(false)}></div>
                                <X size={32} className='closeIcon' type='share' color="#ffffff" weight="bold" onClick={() => setShare(false)} />

                                <section className='shareContent'>
                                    <h1 className='shareTitle'>Compartilhe esta oportunidade!</h1>
                                    <section className='shareInputContainer'>

                                        <input type="text" defaultValue={shareUrl} readOnly={true} className='shareInput' />
                                        <button className='copyStyle' onClick={() => { navigator.clipboard.writeText(shareUrl); }}>
                                            <Copy className='copyButton' size={26} />
                                        </button>
                                    </section>


                                    <div className='shareIcons'>
                                        <FacebookShareButton url={shareUrl}><FacebookIcon size={32} round={true} /></FacebookShareButton>
                                        <FacebookMessengerShareButton url={shareUrl}><FacebookMessengerIcon size={32} round={true} /></FacebookMessengerShareButton>
                                        <LinkedinShareButton url={shareUrl}><LinkedinIcon size={32} round={true} /></LinkedinShareButton>
                                        <TelegramShareButton url={shareUrl}><TelegramIcon size={32} round={true} /></TelegramShareButton>
                                        {/* <RedditShareButton url={shareUrl}><RedditIcon size={32} round={true} /></RedditShareButton> */}
                                        {/* <TumblrShareButton url={shareUrl}><TumblrIcon size={32} round={true} /></TumblrShareButton> */}
                                        <TwitterShareButton url={shareUrl}><TwitterIcon size={32} round={true} /></TwitterShareButton>
                                        <WhatsappShareButton url={shareUrl}><WhatsappIcon size={32} round={true} /></WhatsappShareButton>
                                    </div>
                                </section>

                            </div>
                        }

{/* 
                        <FacebookShareButton url={'https://github.com/AndrePedreschi'}><FacebookIcon size={32} round={true} /></FacebookShareButton>
                        <FacebookMessengerShareButton url={'https://github.com/AndrePedreschi'}><FacebookMessengerIcon size={32} round={true} /></FacebookMessengerShareButton>
                        <LinkedinShareButton url={'https://github.com/AndrePedreschi'}><LinkedinIcon size={32} round={true} /></LinkedinShareButton>
                        <TelegramShareButton url={'https://github.com/AndrePedreschi'}><TelegramIcon size={32} round={true} /></TelegramShareButton>
                        <TwitterShareButton url={'https://github.com/AndrePedreschi'}><TwitterIcon size={32} round={true} /></TwitterShareButton>
                        <WhatsappShareButton url={'https://github.com/AndrePedreschi'}><WhatsappIcon size={32} round={true} /></WhatsappShareButton>
 */}


                    </section>

                    <section className="imgsSection">

                        <div className="desktopStyle">
                            <img className="img0" src={productData.img[0]} />
                            <img className="img1" src={productData.img[1]} />
                            <img className="img2" src={productData.img[2]} />
                            <img className="img3" src={productData.img[3]} />
                            <img className="img4" src={productData.img[4]} />
                        </div>

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
                        <Map location={productData.location.location} downtown={productData.location.downtown} address={productData.location.address} />
                    </section>

                    <section className="availabilitySection">

                        <h1 className="h1">Datas disponíveis</h1>

                        <section className="datePickerSection">

                            <div className="datepickerStyle" id='datepicker' ref={litepickerRef} />

                            <section className='initReserveSection'>
                                <p className='text-normal paragraphText'>Adicione as datas da sua viagem para obter preços exatos</p>
                                <button className='btnInitReserve' onClick={handleSubmit}>
                                    Iniciar Reserva
                                </button>
                            </section>

                        </section>

                    </section>

                    <section className="politicsSection">
                        <h1 className="h1">O que você precisa saber:</h1>
                        <section className="politicDetails">
                            <section className='politicsText'>
                                <h2 className="h3">Regras da casa</h2>
                                {breakLines(productData.details.houseRules).map((itens, index) => (
                                    <p key={index} className='text-normal detailText'>{itens}</p>
                                ))}
                            </section>

                            <section className='politicsText'>
                                <h2 className="h3">Saúde e Segurança</h2>
                                {breakLines(productData.details.healthSafety).map((itens, index) => (
                                    <p key={index} className='text-normal detailText'>{itens}</p>
                                ))}
                            </section>

                            <section className='politicsText'>
                                <h2 className="h3">Política de cancelamento</h2>
                                {breakLines(productData.details.refundPolitics).map((itens, index) => (
                                    <p key={index} className='text-normal detailText'>{itens}</p>
                                ))}
                            </section>
                        </section>
                    </section>
                </section>
            }
        </>
    )
}