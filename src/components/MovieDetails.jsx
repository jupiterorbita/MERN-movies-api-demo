import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import style from "./MovieDetails.module.css";
import myImage from '../assets/netflix-button-icon.png';


const MovieDetails = (props) => {
    const movieOptions = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTlhNjFlZmQzNTQ0MGRjODUxNzgyMmJhY2VhZTYxOSIsInN1YiI6IjY1MmVlZmM2ZWE4NGM3MDEwYzFkYWYxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TJJx_d8P2EVry0eooDCBRsrZo7ZKqn1kwmILkZqlhIg'
        }
    };
    const { movieId, currentPage } = useParams();
    console.log(currentPage);
    const navigate = useNavigate();

    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState('');
    const [backdrop, setBackdrop] = useState('');

    // const baseUrl = 'https://image.tmdb.org/t/p/';
    // const posterSize = 'w500'; // choose the size you want
    // const posterPath = '/gPbM0MK8CP8A174rmUwGsADNYKD.jpg'; // this would come from the API
    // const posterUrl = `${baseUrl}${posterSize}${posterPath}`;

    useEffect(() => {
        getMovie();
        // getMovieImages();
    }, []);

    const getMovie = () => {
        // https://api.themoviedb.org/3/movie/{movie_id}/images
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}&language=en-US`, movieOptions)
            .then(res => {
                console.log(res.data);
                setMovie(res.data);
                setImage('https://image.tmdb.org/t/p/w300' + res.data.poster_path);
                // setImage('https://image.tmdb.org/t/p/w92' + res.data.poster_path);
                setBackdrop('https://image.tmdb.org/t/p/original' + res.data.backdrop_path);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    // get movie images
    const getMovieImages = () => {
        // https://api.themoviedb.org/3/movie/{movie_id}/images
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images`, movieOptions)
            .then(res => {
                console.log("IMAGES 👀👀👀", res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        // <div className={[style.backdrop, ' flex-me']} style={{ backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url('${backdrop}')` }}>
        <div className={`${style.backdrop} flex-me`} style={{ backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url('${backdrop}')` }}>
            {/* {JSON.stringify(movie)} */}
            <img src={image} alt={movie.title} />
            <div className="right">
                <h1>{movie.title}</h1>
                <h2>Overview</h2>
                <p>{movie.overview}</p>
                <p>{movie.release_date}</p>
                {movie.homepage && (
                    <a href={movie.homepage}>
                        <img src={myImage} alt="" />
                    </a>
                )}
                <p></p>
                <button onClick={() => navigate("/movies", { state: currentPage })}>Go Back</button>
            </div>
            {/* <button onClick={() => navigate(-1, {state: currentPage})}>Go Back</button> */}
        </div>
    );
};

export default MovieDetails;