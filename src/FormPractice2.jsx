import React,{useEffect, useState} from 'react'
import { MdOutlineDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const FormPractice2 = () => {
    const [Data, setData] = useState({})
    const [AllData, setAllData] = useState([])
    const [getData, setgetData] = useState([])
    const [Mode, setMode] = useState("Submit")
    const [index, setindex] = useState()
    const [Error, setError] = useState("")
    const mobilevalidation= /^(\+\d{1,3}[- ]?)?\d{10}$/
    const emailValidation = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('data'))||[]
        setgetData(data)
    },[AllData])
    const ChangeHandle=(e)=>{
setData({...Data,[e.target.name]:e.target.value})
}

const addData=()=>{
    let localdata=[]
    localdata = getData.concat(Data)
    setAllData(localdata)
    localStorage.setItem("data",JSON.stringify(localdata))
    setData({Name:"",Email:"",Mobile:"",Password:"",CPassword:""})
}
const submitHandle=(e)=>{
    e.preventDefault()
    if (verify()) {
        if (Data.Name && Data.Email && emailValidation.test(Data.Email) && mobilevalidation.test(Data.Mobile) ) {
            
            
            if (Mode === "Submit") {
                addData()
            }else{
                updateHandle()
            }
        }
    }
}
const deleteHandle=(i)=>{
getData.splice(i,1)
setAllData(getData)
localStorage.setItem('data',JSON.stringify(getData))
}
const editHandle=(e,i)=>{
    setData({Name:e.Name,Email:e.Email,Mobile:e.Mobile,Password:e.Password, CPassword:e.CPassword})
    setindex(i)
    setMode("Update")
}
const updateHandle=()=>{
    let localdata = [...getData]
    localdata[index] = Data
    setAllData(localdata)
    setMode('Submit')
    localStorage.setItem('data',JSON.stringify(localdata))
    setData({Name:"",Mobile:"",Email:""})
}
const verify=()=>{
let localError = []
let valid = true 
if (Data.Name.length === 0 ) {
    localError.Name ="Name is required"
    valid = false
}else if (Data.Name.length <3) {
    localError.Name="name is sort"
    valid = false
}if (Data.Email.length === 0) {
    localError.Email="email is required"
    valid = false
}else if (!emailValidation.test(Data.Email)) {
    localError.Email="invalid email"
    valid = false
}if (Data.Mobile.length === 0) {
    localError.Email="mobile is required"
    valid=false
}else if (!mobilevalidation.test(Data.Mobile)) {
    localError.Mobile="invalid number"
    valid=false
}
setError(localError)
return valid
}

console.log(Error)
  return (
    <>
    <div className='d-flex justify-content-center mt-5'>
      <form className='w-50'>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="name" class="form-control" onChange={ChangeHandle} id="exampleInputName1" name='Name' value={Data.Name} aria-describedby="nameHelp"/>
  </div>
  {Error && <p className='text-danger'>{Error.Name}</p>}
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
    <input type="name" class="form-control" onChange={ChangeHandle} id="exampleInputName1" name='Email'value={Data.Email} aria-describedby="nameHelp"/>
  </div>
  {Error && <p className='text-danger'>{Error.Email}</p>}
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Mobile</label>
    <input type="name" class="form-control" onChange={ChangeHandle} id="exampleInputName1" name='Mobile'value={Data.Mobile} aria-describedby="nameHelp"/>
  </div>
  {Error && <p className='text-danger'>{Error.Mobile}</p>}
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Password</label>
    <input type="name" class="form-control" onChange={ChangeHandle} id="exampleInputName1"name='Password'value={Data.Password} aria-describedby="nameHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">CPassword</label>
    <input type="password" class="form-control" onChange={ChangeHandle} name='CPassword'value={Data.CPassword} id="exampleInputPassword1 "/>
  </div>
  <button type="submit" class="btn btn-primary" onClick={submitHandle}>{Mode}</button>
</form>
    </div>

                <table class="table">
  <thead>
    <tr>
      <th scope="col">Sr No.</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Mobile</th>
      <th scope="col">Password</th>
      <th scope="col">CPassword</th>
      <th scope="col">Delete</th>
      <th scope="col">Edit</th>
    </tr>
  </thead>
    {
        getData.map((e,i)=>{
            return (
                <>
  <tbody>
    <tr>
     
      <td>{i+1}</td>
      <td>{e.Name}</td>
      <td>{e.Email}</td>
      <td>{e.Mobile}</td>
      <td>{e.Password}</td>
      <td>{e.CPassword}</td>
      <td><button className='btn btn-danger' onClick={()=>{deleteHandle(e,i)}}> <MdOutlineDeleteSweep/></button></td>
      <td><button onClick={()=>{editHandle(e,i)}}>< CiEdit/></button></td>
    </tr>
    
  </tbody>
  </>
)
})
}
</table>
    </>
  )
}

export default FormPractice2
