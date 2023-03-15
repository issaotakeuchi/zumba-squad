import './SearchBar.scss'
import { toast } from 'react-toastify';
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Calendar } from 'phosphor-react'
import Litepicker from 'litepicker';

export function SearchBar() {
    const navigate = useNavigate();
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');
    const litepickerRef = useRef(null);
    const [datePicker, setDatePicker] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    function createDatepicker() {
        if (datePicker) {
            litepickerRef.current.destroy()
        }

        litepickerRef.current = new Litepicker({
            element: document.getElementById('datepicker'),
            numberOfMonths: 2,
            numberOfColumns: 2,
            selectForward: true,
            singleMode: false,
            lang: "pt-BR",
            format: "DD MMM",
            autoApply: false,
            autoClose: true,
            tooltipText: { "one": "dia", "other": "dias" },
            buttonText: {
                apply: 'Aplicar', cancel: 'Cancelar',
            },

            setup: (picker) => {
                picker.on('render', (ui) => {
                    setDatePicker(true)
                });
            },
        });
    }
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });
    useEffect(() => {
        setTimeout(() => {
            if (windowWidth < 640) {
                litepickerRef.current.setOptions({ numberOfColumns: 1 });
                litepickerRef.current.setOptions({ numberOfMonths: 1 });
            } else {
                litepickerRef.current.setOptions({ numberOfColumns: 2 });
                litepickerRef.current.setOptions({ numberOfMonths: 2 });
            }
        }, 50);

    }, [windowWidth])
    useEffect(() => {
        createDatepicker()
    }, []);



    function cleanForm() {
        setCity('');
        setDate('');
        litepickerRef.current.clearSelection()
        litepickerRef.current.destroy()
        createDatepicker()
    }

    function validateForm() {
        let startDate = litepickerRef.current.options.startDate == null
        let endDate = litepickerRef.current.options.endDate == null
        if (city === undefined || city === null || city.length < 1) {
            toast.error('Selecione uma cidade')
            return false
        }
        if (startDate || endDate) {
            toast.error('Selecione as datas');
            return false
        }
        return true
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) return;

        let url = 'https://www.airbabeach/searchAcomodations';
        let data = {
            city: city,
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
        <section className='searchBarStyle'>
            {/* <h2>Width: {windowWidth}</h2> */}
            <h1 className='searchTitle'>Buscar ofertas em hotéis, casas e muito mais</h1>

            <form onSubmit={handleSubmit} className='formStyle'>

                <div className='citySection'>
                    <label htmlFor="city" >
                        <MapPin size={20} color="#54577689" weight="fill" className='mapIcon' />
                    </label>

                    <input
                        className="text-small inputSearchStyle"
                        type="text"
                        name="city"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='Onde vamos?'
                    />
                </div>

                <section className="datepickerSection">

                    <label htmlFor="date" className="datepickerLabel">
                        <Calendar size={28} color="#545776" weight="fill" className='calendarIcon' />
                    </label>

                    <input
                        className="text-small inputSearchStyle"
                        type="text"
                        name="date"
                        id='datepicker'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        autoComplete="off"
                        placeholder="Check in  -  Check out"
                        ref={litepickerRef}
                    />
                </section>

                <button className="btnSearchBar" type="submit"> Buscar </button>
            </form>

        </section>
    )
}