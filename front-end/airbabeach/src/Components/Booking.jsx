import { useOutletContext } from 'react-router-dom';
import './Booking.scss'

export function Booking(){
    const productData = useOutletContext()

console.log(productData);


    return(
        <section className='productBookingContainer'>
            <section className='confirmPersonalData'>
                <h1>Complete seus dados</h1>
            </section>

            <section className='bookingDate'>
                <h1>Selecione sua data de reserva</h1>
            </section>

            <section className='bookingCheckIn'>
                <h1>Seu horário de chegada</h1>
            </section>

            <section className='bookingDetails'>
                <h1>Detalhe da reserva</h1>
            </section>

            

        </section>

    )
}