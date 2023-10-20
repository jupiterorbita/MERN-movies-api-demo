import { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import style from './Results.module.css';

const Results = (props) => {
    const location = useLocation();
    const data = location.state;
    // console.log(data);

    const { searchWord } = useParams();

    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTlhNjFlZmQzNTQ0MGRjODUxNzgyMmJhY2VhZTYxOSIsInN1YiI6IjY1MmVlZmM2ZWE4NGM3MDEwYzFkYWYxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TJJx_d8P2EVry0eooDCBRsrZo7ZKqn1kwmILkZqlhIg'
        }
    };

    const [results, setResults] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // console.log("useEffect - data.results", data.results);
        setResults(data.results);
        setTotalPages(data.total_pages);
    }, [data]);

    // OG pages
    // const renderPageNumbers = () => {
    //     const pageNumbers = [];
    //     for (let i = 1; i <= totalPages; i++) {
    //         pageNumbers.push(i);
    //     }
    //     return pageNumbers.map((number, index) => {
    //         const isLast = index === pageNumbers.length - 1;
    //         const comma = isLast ? "" : ", ";
    //         return (
    //             <span key={number} onClick={() => getResults(number)}>{number}{comma}</span>
    //         );
    //     });
    // };

    const getResults = async (pageNumber) => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchWord}&page=${pageNumber}`, options);
            console.log(res.data);
            setResults(res.data.results);
            setTotalPages(res.data.total_pages);
        } catch (err) {
            console.log(err);
        }
    };



    const [currentPage, setCurrentPage] = useState(1);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        const startPage = Math.max(1, currentPage - 5);
        const endPage = Math.min(totalPages, currentPage + 4);
        const pages = pageNumbers.slice(startPage - 1, endPage);

        return (
            <div>
                <hr />
                {currentPage > 1 && (
                    <button onClick={() => setCurrentPage(currentPage - 10)}>{"<< "}</button>
                )}
                {pages.map((number, index) => {
                    const isLast = index === pages.length - 1;
                    const comma = isLast ? "" : ", ";
                    return (
                        <button key={number} onClick={() => getResults(number)}>{number}{comma}</button>
                    );
                })}
                {currentPage + 9 < totalPages && (
                    <button onClick={() => setCurrentPage(currentPage + 10)}>{" >>"}</button>
                )}
            </div>
        );
    };

    return (
        <div>
            <h1>Results</h1>
            <h3>total_pages: {totalPages}</h3>
            <hr />
            {/* {JSON.stringify(results)} */}

            <div>
                {renderPageNumbers()}
            </div>

            <div className={style.movieContainer}>
                {
                    results.map((result, i) => {
                        const entryNumber = (currentPage - 1) * 20 + i + 1;
                        return (
                            <div className={style.moviePoster} key={result.id}>
                                {result.poster_path ? (
                                    <img src={`https://image.tmdb.org/t/p/w154${result.poster_path}`} alt="" />
                                ) : (
                                    <img src="https://via.placeholder.com/154x231.png" alt="" />
                                )}
                                <h2>
                                    <Link className={style.moviePosterTitle} to={`/movies/${result.id}/${currentPage}`}>
                                        {entryNumber} - {result.title}
                                    </Link>
                                </h2>
                            </div>
                        );
                    })
                }
            </div>

            <div>
                {renderPageNumbers()}
            </div>
        </div>
    );
};

export default Results;
