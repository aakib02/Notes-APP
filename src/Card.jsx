import React from 'react'
// import ShowCard  from './ShowCard'
import Data from './Data'

const Card = () => {
  return (
    <div className='d-flex flex-wrap justify-content-between mt-2'>
      {Data.map((props)=>{
        return(
          <div className='bg-primary d-flex justify-content-between flex-column  m-2 p-3' style={{ width: "350px" }}>
        <img src={props.poster} style={{ height: "200px" }} />
        <h5>movieName =  {props.movieName}</h5>
        <h5>actor= {props.actor}</h5>
        <h5>director=  {props.director}</h5>
        <h5>year=  {props.year}</h5>
        <h5>language=  {props.language}</h5>
      </div>

        )
      })}
    </div>
  )
}

export default Card


