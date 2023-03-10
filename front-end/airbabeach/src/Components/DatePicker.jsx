
import { useState, useRef, useEffect } from "react";
import Litepicker from 'litepicker';
import { Calendar } from 'phosphor-react'
import './DatePicker.scss'

export function DatePicker({ onGetDate }) {
    const [date, setDate] = useState('');
    const litepickerRef = useRef(null);

    
    useEffect(() => {
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

                picker.on('button:apply', (date1, date2) => {

                    dadosTeste = {
                        startDate: date1.dateInstance.toISOString(),
                        endDate: date2.dateInstance.toISOString()
                    }

                    salvarDados({
                        startDate: date1.dateInstance.toISOString(),
                        endDate: date2.dateInstance.toISOString()
                    })
                });

                /* picker.on('button:cancel', () => {
                    litepickerRef.current.clearSelection()
                }); */

                /* picker.on('hide', () => {
                    console.log('entrou3');
                }); */
            },
        });

        /*  props.onGetDate({
             startDate: litepickerRef.current.options.startDate.dateInstance.toISOString(),
             endDate: litepickerRef.current.options.endDate.dateInstance.toISOString()
         }) */
    }, []);




    return (
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
    )
}