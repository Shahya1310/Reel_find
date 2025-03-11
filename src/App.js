import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import Navbar from "./Navbar";
const baseurl = "http://www.omdbapi.com/?apikey=50e5d8e1";
const App = () => {
  const [movies,setmovies]=useState([]);
  const [Page,setPage]=useState(1);
  const fetchmovies = async () => {
    const responce = await fetch(`${baseurl} &s=movie&Page=${Page}`);
    const data = await responce.json();
    console.log(data.Search);
    if(data.Search){
      setmovies((previousmovies)=>[...previousmovies,...data.Search])
    }
  }
  const loadmovies=()=>{
    setPage((previouspage)=>[]);
  }
  useEffect(() => {
    fetchmovies()
  },[Page])


  return (
    <>
    <Navbar/>
      <div className='container'>
        <div className='row'>
          {
            movies.map((movie)=>(<div className='col'>
              <div className='card'>
                <img src={movie.Poster} alt={movie.Title} />
                <div className='card-body'>
                  <h1>Title:{movie.Title}</h1>
                  <h5>Year:{movie.Year}</h5>
                </div>
              </div>
            </div>))
          }
          {/* <div className='col'>
            <div className='card'>
              <img src='' alt='' />
              <div className='card-body'>
                <h1>Title:</h1>
                <h5>Year:</h5>
              </div>
            </div>
          </div> */}
        </div>
        <button className='btn btn-primary' onClick={loadmovies}>Load more</button>
      </div>
    </>
  )
}
export default App