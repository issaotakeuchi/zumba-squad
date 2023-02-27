import './Home.scss'
import { Card } from "../Components/Card";
import { cards, recomendations } from '../../public/cardsMock.js'


export function Home() {



    return (
        <main className="mainStyle">
            <section className="categoriesSection">
                <h1>Buscar por tipo de acomodação</h1>
                <div className="cardsContainer">
                    {cards.map((element, index) => (
                        <Card
                            className='cardStyle'
                            key={index}
                            type='category'
                            id={element.id}
                            img={element.img}
                            category={element.category}
                            quantity={element.quantity}
                            hostings={element.hostings}
                        />
                    ))}
                </div>
            </section>

            <section className="recomendationsSection">
                <h1>Recomendações</h1>

                <div className="cardsContainer">
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
            </section>
        </main>

    )
}