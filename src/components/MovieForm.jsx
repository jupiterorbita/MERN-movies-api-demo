import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MovieForm = (props) => {
    const navigate = useNavigate();

    const [searchWord, setSearchWord] = useState('');
    const [resultsObject, setResultsObject] = useState(null);

    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTlhNjFlZmQzNTQ0MGRjODUxNzgyMmJhY2VhZTYxOSIsInN1YiI6IjY1MmVlZmM2ZWE4NGM3MDEwYzFkYWYxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TJJx_d8P2EVry0eooDCBRsrZo7ZKqn1kwmILkZqlhIg'
        }
    };

    const searchFunction = async () => {
        try {
            if (searchWord.length >= 2) {
                const res = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchWord}&include_adult=false&language=en-US&page=1`, options);
                console.log(res.data);
                // setResultsObject(res.data);
                navigate(`/movies/results/${searchWord}`, { state: res.data });
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <input type="text" value={searchWord} onChange={(e) => { setSearchWord(e.target.value); searchFunction(); }} style={{fontSize: '24px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'}} />
            {searchWord.length < 2 && <div style={{color: 'red'}}>Need more characters</div>}
        </div>
    );
};

export default MovieForm;