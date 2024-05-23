import { useState } from "react"
import "./MovieApp.css"

export const MovieApp = () => {

    const [search, setSearch] = useState("")
    const [movieList, setMovieList] = useState(null)

    const urlBase = "https://api.themoviedb.org/3/search/movie"
    const apiKey = "c54233e603aa2dc905d29042dc291f62"

    const handleInputChange = ({ target }) => {
        setSearch(target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchMovies()
        setSearch("")
    }

    const fetchMovies = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${search}&api_key=${apiKey}&language=es-ES`)

            const data = await response.json()
            setMovieList(data.results)

        } catch (error) {
            console.error(`Ha habido un error: ${error}`)
        }
    }

    return (
        <div className="container">
            <h1>PELIS PEDIA</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Buscar..." value={search} onChange={handleInputChange} />
                <button type="submit">Buscar</button>
            </form>

            {movieList &&
                <div className="movieList">
                    {movieList.map((movie) => (
                        <div className="movieCard" key={movie.id}>

                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`Poster de ${movie.title}`} />
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                            <h4>{movie.release_date}</h4>

                        </div>
                    ))}
                </div>
            }   

        </div>
    )
}
