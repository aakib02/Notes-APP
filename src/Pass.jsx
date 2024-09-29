import React ,{ useState}from 'react'

const Pass = () => {
   const [count, setcount] = useState("0")
  return (
    <>
    <h1>{count}</h1>
    <button onClick={()=>{setcount(count+1)}}>icre</button>
    <button onClick={()=>{setcount(count-1)}}>dcre</button>
    <button onClick={()=>{setcount(count*count)}}>squ</button>
    <button onClick={()=>{setcount(count*count*count)}}>qub</button>

    </>
  )
}

export default Pass
