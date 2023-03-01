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
    const [calendarId, setCalendarId] = useState('');
    const [datesSelected, setDatesSelected] = useState(false);
    const datepickerRef = useRef(null);
    const litepickerRef = useRef(null);

    useEffect(() => {
        if (!litepickerRef.current) {
            litepickerRef.current = new Litepicker({
                element: datepickerRef.current,
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
                onSelect: (startDate, endDate) => {
                    setDatesSelected(true);
                    if (endDate) {
                        litepickerRef.current.close();
                    }
                },
                onCancel: () => {
                    handleHideCalendar();
                },
                onApply: (startDate, endDate) => {
                    handleHideCalendar();
                }
            });
        }
    }, []);


    function cleanForm() {
        setCity('');
        setDate('');
        setDatesSelected(false);
    }

    function validateForm() {
        if (city === undefined || city === null || city.length < 1) {
            return false
        }
        if (date === undefined || date === null || date.length < 1) {
            return false
        }

        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();

        //if (!validateForm()) return;

        let url = 'https://www.airbabeach/searchAcomodations';

        let data = {
            city: city,
            startDate:"",
            endDate: ""
        }

        if (datesSelected) {
            const dates = litepickerRef.current.getDate();
            data.startDate = dates[0].toISOString();
            data.endDate = dates[1].toISOString();
        }

        console.log(data);

        const options = {
            headers: { 'X-Custom-Header': 'value' }
        }

        axios.post(url, data, options).then((response) => {
            console.log(response);

            toast.success("Próximo destino econtrado!")
            navigate('/login')

        }, (error) => {
            console.log(error.code);

            if (error.status == 404) return toast.error('Destino não encontrada');
            if (error.status == 404) return toast.error('Erro ao preencher o formuário. Recarregue a página e tente novamente.');
            if (error.code === 'ERR_NETWORK') return toast.error('Verifique a sua conexão com a internet.');
        });

        cleanForm();
    }

    function handleHideCalendar() {
        if (!litepickerRef.current.isVisible()) return;
        setDatesSelected(true);
        litepickerRef.current.close();
    }

    return (
        <section className='searchBarStyle'>

            <h1 className='searchTitle'>Buscar ofertas em hotéis, casas e muito mais</h1>

            <form onSubmit={handleSubmit} className='formStyle'>

                <div className='citySection'>
                    <label htmlFor="city" >
                        <MapPin size={20} color="#545776" weight="fill" className='mapIcon' />
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
                <div className='dateSection'>
                    <label htmlFor="date" >
                        <Calendar size={20} color="#545776" weight="fill" className='mapIcon' />
                    </label>

                    <input
                        className="text-small inputSearchStyle"
                        type="text"
                        name="date"
                        id={calendarId} // usa o ID gerado para o calendário
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        autoComplete="off"
                        placeholder="Check in  -  Check out"
                        ref={datepickerRef}
                    />

                </div>

                <button className="btn" type="submit"> Buscar </button>
            </form>

        </section>
    )
}