import React,{useEffect, useState} from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdOutlinePushPin } from "react-icons/md";
import { MdPushPin } from "react-icons/md";
import "./Notes.css"

const Notes = () => {
    const [Data, setData] = useState({})
    const [getData, setgetData] = useState([])
    const [AllData, setAllData] = useState([])
    const [Mode, setMode] = useState('Save')
    const [Index, setIndex] = useState()
    const [Error, setError] = useState("")
    const time = new Date().toLocaleTimeString()
    const date = new Date().toLocaleDateString()
    useEffect(()=>{
const data = JSON.parse(localStorage.getItem('data')) || []
setgetData(data)
    },[Data ,AllData])
const ChangeHandle=(e)=>{
    setData({...Data ,[e.target.name]: e.target.value, time:time,date:date ,id:generatePin()})
}
const generatePin=()=>{
  return Math.round(Math.random()*10000)
  
}
const pinHandle=(i)=>{
  let localdata = [...getData]
  const index =localdata.findIndex((e)=>e.id==i)
  if(localdata[index].pin){
      localdata[index].pin=false
  }else{
      localdata[index].pin=false
  }
  localStorage.setItem("getdata", JSON.stringify(localdata))
  setAllData(localdata)
}
const AddData=(e)=>{
  let localdata =[...getData]
  localdata = getData.concat(Data)
  localStorage.setItem('data',JSON.stringify(localdata))
  setAllData(localdata)
  setData({title:"", des:""})
}
const UpdateHandle=(e,i)=>{
  let localdata=[...getData]
  localdata[Index] = Data
  setAllData(localdata)
  setData({title:"",des:""})
  localStorage.setItem('data',JSON.stringify(localdata))
  setMode("Save")
}
const EditHandle=(e,i)=>{
setData({title:e.title,des:e.des})
setIndex(i)
setMode("Update")
}
const  SubmitHandle=(e)=>{
e.preventDefault()
if (verify()) {
  if (Data.title && Data.des) {
    if (Mode=== "Save") {
      AddData()
    }else{
UpdateHandle()
    }
  }
}
}
const DeleteHandle=(e,i)=>{
getData.splice(i,1)
setData(getData)
localStorage.setItem('data',JSON.stringify(getData))
}
console.log(getData)
const verify=()=>{
  let localError ={}
  let valid = true
  if (!Data.title || Data.title.length === 0) {
    localError.title = "Title is required";
    valid = false;
  }
  if (!Data.des || Data.des.length === 0) {
    localError.des = "Description is required";
    valid = false;
  }
  setError(localError)
  return valid
}
const BgColorHandle=(e,i)=>{
let localdata = JSON.parse(localStorage.getItem('data')) || []
// let localdata;
localdata[i] = {...localdata[i],[e.target.name]:e.target.value}
setgetData(localdata)
localStorage.setItem('data',JSON.stringify(localdata))

}
const ColorHandle=(e,i)=>{
let localdata = [...getData]
localdata[i] = {...localdata[i],[e.target.name]:e.target.value}
setgetData(localdata)
localStorage.setItem('data',JSON.stringify(localdata))
}
const BgImageHandle = (e, i) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  
  reader.onload = () => {
    let localdata = [...getData];
    localdata[i] = { ...localdata[i], bgImage: reader.result }; // Use reader.result to set the background image
    setgetData(localdata);
    localStorage.setItem('data', JSON.stringify(localdata));
  };
  
  if (file) {
    reader.readAsDataURL(file);
  }
};

  return (
    <>
    <center>
    <div className='main'>
        <h1 className='bg-dark text-light '>My Notes</h1>
      <div className=' notes py-3 my-3'>
        <h2>Title</h2>
        <input type="text"className='px-1' onChange={ChangeHandle} name='title' value={Data.title} placeholder={Error && Error.title}/>
        {/* {Error && <p className='text-danger '>{Error.title}</p>} */}
        <h2>Description</h2>
        {/* <textarea className='px-1' name="des" id="" cols="36" rows="8" value={Data.des} placeholder={Error && Error.des } onChange={ChangeHandle}></textarea> <br /> */}
        <div class="form-floating">
  <textarea class="form-control" name='des' value={Data.des}  placeholder={Error && Error.des} onChange={ChangeHandle} id="floatingTextarea2" style={{height:"150px",width:"18.3rem"}}></textarea>
</div>
        <button className='btn btn-primary px-5 my-3' onClick={SubmitHandle}>{Mode}</button>
      </div>
    </div>
    </center> <br />
      <h1 className='bg-secondary'>Saved Notes</h1>
    <div className='  d-flex gap-3 flex-wrap justify-content-center  ' >
    { 
    getData.map((e,i)=>{
        return(
            
            <>
    <div class="card  text-center "  style={{width:'19rem',background:e.BgColor || "black", color:e.Color || "white",backgroundSize:'cover',objectFit:'cover', backgroundPosition:'center center' , backgroundImage: `url(${e.bgImage})`}}>
   <div class="card-body">
    <h5 class="card-title">Title</h5>
    <p class="card-title">{e.title}</p>
    <hr />
    <h5 class="card-text">Description</h5>
    <p class="card-text">{e.des}</p>
    <hr />
    <div className='DateTime d-flex justify-content-center gap-4'>
    <div className='d-flex   flex-column'>
    <h5 class="card-text">Time</h5>
    <p class="card-text">{e.time}</p>
    </div>
    <div className='d-flex  flex-column'>
    <h5 class="card-text "> Date</h5>
    <p class="card-text">{e.date}</p>
    </div>
    </div>
    <hr />
    <div className='gap-2 d-flex justify-content-center' style={{paddingLeft:'1.9rem'}}>
    <label htmlFor="" >Select Color</label>
    <input type="color" name='BgColor'  onChange={(e)=>BgColorHandle(e,i)} /> 
    </div>
    <div className='mt-3 d-flex gap-2 justify-content-center '>
    <label htmlFor="" >Select Text Color</label>
    <input type="color" name='Color' onChange={(e)=>ColorHandle(e,i)}  /> 
    </div>
                
    <hr />
    <button className='btn btn btn-danger me-4' onClick={(e)=>{DeleteHandle(e,i)}}>{<MdDelete/>}</button>
    <button className='btn btn-primary me-4' onClick={()=>{EditHandle(e,i)}}>{<FaEdit/>}</button> 
    <button className='btn btn-warning ' onClick={()=>pinHandle(e.id)}>
     <MdOutlinePushPin/> 
      </button> 
    <hr />
    <div className="files gap-2 d-flex flex-column align-items-center" >
                  <label htmlFor="">Select Background Image</label>
                  <input type="file" name="bgImage" onChange={(e) => BgImageHandle(e, i)} />
                </div>
  </div>
</div>

            </> 
        )
      })}
      </div>
<h1 className='bg-secondary mt-4'>Pin Card</h1>
<center className='mt-5'><h1>Pin data</h1></center>

                <div className=' d-flex flex-wrap gap-4 mt-5 '>
                    {
                         getData.filter((e)=>e.pin).map((e, i) => {

                            return (
                                <div className=' mx-5 text-start rounded-3 mt-5 w-25 ' style={{ backgroundColor: e.color || " #8F00FF", color: e.text || "black" }}>
                                    <div>
                                        <button className='btn btn-primary ' onClick={() => (EditHandle(e, i))}><FaEdit /></button>
                                         <button className='btn btn-danger' onClick={() => (DeleteHandle(e, i))}><MdDelete /></button>
                                    </div>
                                    <div>
                                        <input type='color' className='btn btn-primary' name='color' onChange={(e) => { BgColorHandle(e, i) }} />
                                        <input type='color' className='btn btn-primary' name='text' onChange={(e) => { ColorHandle(e, i) }} />
                                        <button onClick={()=>pinHandle(e.id)}><MdPushPin /></button>

                                    </div>
                                    <div><p>{e.date}</p>
                                        <p>{e.time}</p></div>
                                    <div className='p-2 border-dark' style={{ height: '20vh', width: "15vw" }}>

                                        <p>Title : {e.title}</p>
                                        <hr />
                                        <p>Description: {e.des}</p>
                                    </div>

                                </div>


)

})
}
                </div>
            {/* </div> */}

</>

    
  )
}

export default Notes
