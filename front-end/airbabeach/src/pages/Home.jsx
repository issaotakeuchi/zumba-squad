import './Home.scss'
import { Card } from "../Components/Card";
import { cards, recomendations } from '/public/cardsMock.js'
import { SearchBar } from '../Components/SearchBar'
import { useEffect, useState } from 'react';
import axios from "axios";


export function Home() {
const [categorias, setCategorias] = useState('')
const [produtos, setProdutos] = useState('')


useEffect(() => {

        /* const options = {
            headers: {
                //'Access-Control-Allow-Origin': '*',
                //'Content-Type': 'application/json, application/x-www-form-urlencoded',
                'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
                //'Access-Control-Allow-Credentials': true,
                //'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
            },
        } */
        //axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
        //axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';


        axios.get(`http://18.224.15.179:8080/categorias`).then(
            (response) => {
                console.log(response);
                setCategorias(response);
            },
            (error) => {
                //if (error.status == 404) return toast.error('Usuário não encontrado');
            }
        )

        axios.get(`http://18.224.15.179:8080/produtos`).then(
            (response) => {
                console.log(response);
                setProdutos(response);
            },
            (error) => {
                //if (error.status == 404) return toast.error('Usuário não encontrado');
            }
        )

        axios.get(`https://dog.ceo/api/breeds/image/random`).then(
            (response) => {
                console.log(response);
                setProdutos(response);
            },
            (error) => {
            }
        )


    }, [])



    return (
        <main className="mainStyle">

            <SearchBar filteredData={(valueReturned)=> setProdutos(valueReturned)} />

            <section className="categoriesSection">
                <div className='custonSection'>
                    <h1>Buscar por tipo de acomodação</h1>
                    <div className="categoryContainer">
                        {cards.map((element, index) => (
                            <Card
                                className='cardStyle'
                                key={index}
                                type='category'
                                id={element.id}
                                img={element.img}
                                category={element.category}
                                quantity={element.quantity}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="recomendationsSection">
                <div className='custonSection'>
                    <h1>Recomendações</h1>
                    <div className="recomendationContainer">
                        {recomendations.map((element, index) => (
                            <Card
                                key={index}
                                type='recomendations'
                                id={element.id}
                                img={element.img}
                                favorite={element.favorite}
                                stars={element.stars}
                                title={element.title}
                                grade={element.grade}
                                location={element.location}
                                differential={element.differential}
                                description={element.description}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>

    )
}