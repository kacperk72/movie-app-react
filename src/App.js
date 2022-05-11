import React, {useEffect, useState} from 'react';
import './App.css';
import SearchIcon from './search.svg';
import {MovieCard} from "./MovieCard";

const API_URL = 'http://www.omdbapi.com/?apikey=c032e2d7';

export const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        searchMovies('Batman')
    }, []);

    const searchMovies = async (title) => {
        const res = await fetch(`${API_URL}&s=${title}`);
        const data = await res.json();

        setMovies(data.Search);
    }


    return (
        <>
            <div className="app">
                <h1>MovieApp</h1>

                <div className="search">
                    <input
                        placeholder="Serach for movies"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <img
                        src={SearchIcon}
                        alt="search"
                        onClick={() => searchMovies(searchTerm)}
                    />
                </div>
            </div>

            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )
            }


        </>

    );
}

