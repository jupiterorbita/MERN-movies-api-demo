import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MovieList = (props) => {
    const location = useLocation();
    const pageBack = location.state;
    console.log("CURRENT PAST PAGE ==>", pageBack);

    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(pageBack ? pageBack : 1);

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/configuration',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTlhNjFlZmQzNTQ0MGRjODUxNzgyMmJhY2VhZTYxOSIsInN1YiI6IjY1MmVlZmM2ZWE4NGM3MDEwYzFkYWYxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TJJx_d8P2EVry0eooDCBRsrZo7ZKqn1kwmILkZqlhIg'
        }
    };

    const movieOptions = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTlhNjFlZmQzNTQ0MGRjODUxNzgyMmJhY2VhZTYxOSIsInN1YiI6IjY1MmVlZmM2ZWE4NGM3MDEwYzFkYWYxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TJJx_d8P2EVry0eooDCBRsrZo7ZKqn1kwmILkZqlhIg'
        }
    };

    // const baseUrl = 'https://image.tmdb.org/t/p/';
    // const posterSize = 'w500'; // choose the size you want
    // const posterPath = 'gPbM0MK8CP8A174rmUwGsADNYKD.jpg'; // this would come from the API

    // const posterUrl = `${baseUrl}${posterSize}${posterPath}`;

    useEffect(() => {
        getDummy();
    }, [currentPage]);

    const getDummy = () => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc`, movieOptions)
            .then(res => {
                console.log(res.data);
                setMovies(res.data.results);
                setCurrentPage(res.data.page);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const goNext = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const goBack = () => {
        if (currentPage === 1) return;
        setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <>
            <div>MovieList</div>
            <button onClick={getDummy}>GET</button>
            <p>
                currentPage{currentPage}
            </p>
            <hr />
            <button onClick={goBack}>PREV PAGE</button>
            <button onClick={goNext}>NEXT PAGE</button>
            <div className='container'>
                {
                    movies.map(movie => {
                        return <div className={`movie-poster`} style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w185${movie.poster_path}')` }} key={movie.id}>
                            {/* <img src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`} alt="" /> <br /> */}
                            <Link className="movie-poster-title" to={`/movies/${movie.id}/${currentPage}`}>
                                {movie.title}
                            </Link>
                        </div>;
                    })
                }
            </div>
        </>
    );
};

export default MovieList;