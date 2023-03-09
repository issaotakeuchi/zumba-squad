import './Home.scss'
import { Card } from "../Components/Card";
import { cards, recomendations } from '/public/cardsMock.js'
import { SearchBar } from '../Components/SearchBar'

export function Home() {



    return (
        <main className="mainStyle">

            <SearchBar />

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