import React, { useEffect,useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const FormPractice = () => {
    const [Data, setData] = useState({})
    const [getData, setgetData] = useState([])
    const [Alldata, setAlldata] = useState([])
    const [Error, setError] = useState("")
    const [index, setindex] = useState()
    const [Mode, setMode] = useState("Submit")
    const mobilevalidation = /^(\+\d{1,3}[- ]?)?\d{10}$/
    // const passwordvalidation = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"/
    const ChangeHandle=(e)=>{
        setData({...Data,[e.target.name]: e.target.value})
    }
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("data")) || []
        setgetData(data)
    },[Alldata])
    const addData=(e)=>{
     
        let localdata =[]
        localdata = getData.concat(Data)
        setAlldata(localdata)
        localStorage.setItem("data",JSON.stringify(localdata))
     
      setData({name:"",mobile:"", email:"",password:"",cpassword:""})
    }


    const Update=()=>{
      let localdata =[...getData]
      localdata[index] = Data
      setAlldata(localdata)
      setMode("Submit")
      setData({name:"", mobile:"", email:"", password:"",cpassword:""})
      localStorage.setItem('data',JSON.stringify(localdata))
    }
    const Submit=(e)=>{
      e.preventDefault()
      if (verify()) { 
        if (Data.name && Data.mobile) {
          
       
        if (Mode === "Submit") {
          addData()
        }else{
          Update()
        }
      }
      }

    }
const DeleteHandle=(i)=>{
getData.splice(i,1)
setAlldata(getData)
localStorage.setItem('data', JSON.stringify(getData))
}
const verify=()=>{
    let localError=[]
    let valid = true
    if (Data.name.length === 0) {
        localError.name = "name is require"
        valid=false
    }else if (Data.name.length < 3) {
      localError.name ="name is sort"
      valid =false
    }if (Data.mobile.length === 0) {
      localError.mobile="mobile is required"
      valid = false
    }else if (!mobilevalidation.test(Data.mobile)) {
      localError.mobile="invalid number"
      valid = false
    }if (Data.password.length ===0) {
      localError.password="password is required"
      valid = false
    // }else if (!passwordvalidation.test(Data.password)) {
    //   localError.password="enter valid password"
    //   valid = false
    }if (Data.cpassword.length===0) {
      localError.cpassword = "Cpassword is required"
      valid = false
    }else if (Data.password !== Data.cpassword) {
      localError.cpassword="not match"
      valid =false
    }
    setError(localError)
    return valid
}
const editHandle=(e,i)=>{
  setData({name:e.name,email:e.email,mobile:e.mobile,password:e.password,cpassword:e.cpassword})
setindex(i)
setMode("Update")
}
  return (
    <>
    <div className=' d-flex justify-content-center mt-5'>
     <form style={{width:"35%"}}>
  <div class="mb-3">
    <label for="exampleInputName1" class="form-label">Name</label>
    <input type="text" class="form-control" id="exampleInputName1" onChange={ChangeHandle} name='name' value={Data.name} aria-describedby="emailHelp"/>
  </div>
  {Error && <p className='text-danger'>{Error.name}</p>}
  <div class="mb-3">
    <label for="exampleInputNumber1" class="form-label">Mobile</label>
    <input type="number" class="form-control" id="exampleInputNumber1"onChange={ChangeHandle} name='mobile' value={Data.mobile}/>
  </div>
  {Error && <p className='text-danger'>{Error.mobile}</p>}
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail1"onChange={ChangeHandle} name='email' value={Data.email}/>
  </div>
  {Error && <p className='text-danger'>{Error.email}</p>}
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"onChange={ChangeHandle} name='password' value={Data.password}/>
  </div>
  {Error && <p className='text-danger'>{Error.password}</p>}
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"onChange={ChangeHandle} name='cpassword' value={Data.cpassword}/>
  </div>
  {Error && <p className='text-danger'>{Error.cpassword}</p>}
 
  <button type="submit" class="btn btn-primary form-control" onClick={Submit}>{Mode}</button>
</form>
</div>
<center>
                <table class="table w-75 mt-5 text-center">
  <thead>
    <tr>
      <th scope="col">Sr No</th>
      <th scope="col">Name</th>
      <th scope="col">Mobile</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
      <th scope="col">Cpassword</th>
      <th scope="col">Delete</th>
      <th scope="col">Edit</th>
    </tr>
  </thead>
{
    getData.map((e,i)=>{
        return(
            <>
  <tbody>
    <tr>
      <th scope="row">{i+1}</th>
      <td>{e.name}</td>
      <td>{e.mobile}</td>
      <td>{e.email}</td>
      <td>{e.password}</td>
      <td>{e.cpassword}</td>
      <td><button onClick={()=>{DeleteHandle(e,i)}}>{<MdDelete/>}</button></td>
      <td><button onClick={()=>{editHandle(e,i)}}>{<FaEdit/>}</button></td>
    </tr>
  </tbody>
  </>
        )
    })
}
</table>
</center>

    </>
  )
}

export default FormPractice
