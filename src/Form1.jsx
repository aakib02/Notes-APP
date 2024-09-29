import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import './form1.css'

const Form1 = () => {
  const [Data, setData] = useState({name: "", mobile: "", email: "", password: "", cpassword: ""})
  const [Alldata, setAlldata] = useState([])
  const [Error, setError] = useState("")
  const [getData, setgetData] = useState([])
  const [index, setindex] = useState()
  const [Mode, setMode] = useState("Submit")
  const emailvalidation = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
  const mobilevalidation = /^(\+\d{1,3}[- ]?)?\d{10}$/
  const passwordvalidation = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data")) || []
    setgetData(data)
  }, [Alldata])
  const changeHandle = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value })
  }
  const Submit=(e)=>{
    e.preventDefault()
    if (verify()) {
      if (Data.name && emailvalidation.test(Data.email) ) {
        if (Mode === "Submit") {
          addData()
          
        }
        else {
          UpdateData()
        }
      }
    }
  }
  const UpdateData=()=>{
    let localdata= [...getData]
    localdata[index] =Data
    setAlldata(localdata)
    localStorage.setItem('data',JSON.stringify(localdata))
    setData({ name: "", email: "", mobile: "", password: "", cpassword: "" })
    setMode("Submit")
  }
  const addData = (e) => {
    let localdata = []
    localdata = getData.concat(Data)
    setAlldata(localdata)      
      localStorage.setItem("data", JSON.stringify(localdata))
      setData({ name: "", mobile: "", email: "", password: "", cpassword: "" })
    }

  console.log(Data.name);
  const EditHandle=(e,i)=>{
setData({name: e.name, email:e.email, mobile:e.mobile,password:e.password, cpassword:e.cpassword})
setMode("Update")
setindex(i)
  }
  const verify = () => {
    let localError = {}
    let valid = true
    if (Data.name.length === 0) {
      localError.name = "name is required"
      valid = false
    } else if (Data.name.length < 3) {
      localError.name = "name is short"
      valid = false
    }
    if (Data.email.length === 0) {
      localError.email = "email is required"
      valid = false
    } else if (!emailvalidation.test(Data.email)) {
      localError.email = "enter valid email"
      valid = false
    }
    if (Data.mobile.length===0) {
      localError.mobile="mobile number is required"
      valid = false
    }else if (!mobilevalidation.test(Data.mobile)) {
      localError.mobile = "enter valid number"
      valid = false
    }
    if (Data.password.length === 0) {
      localError.password = "Password is required"
      valid = false
    }else if (!passwordvalidation.test(Data.password)) {
      localError.password = "enter valid password"
      valid = false
    }
    if (Data.cpassword.length === 0) {
      localError.cpassword="confirm password is required"
      valid = false
    }else if (Data.password !== Data.cpassword) {
      localError.cpassword="not match"
    }
    setError(localError)
    return valid

  }
  const deleteHandle=(i)=>{
    let localdata = [...getData]
    localdata.splice(i,1)
    localStorage.setItem('data',JSON.stringify(localdata))
    setAlldata(localdata)
  }

  console.log(getData);
  return (
    <>        <div id='form' className='py-5 '>
      <div className='bg-dark w-50  form-inside' style={{ border: "2px solid orange", borderRadius: "15px", boxShadow: "2px 2px 2px gray" }}>
        <form className='w-50 '>
          <h1 className='text-light pt-2' style={{ textDecoration: "underline", textDecorationColor: "orange" }}><i>Form Information</i></h1>
          <div class="mb-3">
            <label for="name" className="form-label text-light  "><b>Name</b></label>
            <input type="text" onChange={changeHandle} class="form-control" name='name' value={Data.name} id="name" aria-describedby="emailHelp" />

          </div>
          {Error && <p className='text-danger'>{Error.name}</p>}
          <div class="mb-3">
            <label for="text" class="form-label text-light"><b>Email</b></label>
            <input type="email" onChange={changeHandle} class="form-control" name='email' id="email" value={Data.email} />
          </div>
          {Error && <p className='text-danger'>{Error.email}</p>}
          <div class="mb-3">
            <label for="mobile" class="form-label text-light"><b>Mobile</b></label>
            <input type="number" onChange={changeHandle} class="form-control" name='mobile' id="mobile" value={Data.mobile} />
          </div>
          {Error && <p className='text-danger'>{Error.mobile}</p>}
          <div class="mb-3">
            <label for="password" class="form-label text-light "><b>Password</b></label>
            <input type="password" onChange={changeHandle} class="form-control" name='password' id="password" value={Data.password} />
          </div>
          {Error && <p className='text-danger'>{Error.password}</p>}
          <div class="mb-3">
            <label for="cpassword" class="form-label text-light"><b>Confirm Password</b></label>
            <input type="password" onChange={changeHandle} class="form-control" name='cpassword' id="cpassword" value={Data.cpassword} />
          </div>
          {Error && <p className='text-danger'>{Error.cpassword}</p>}

          <button type="submit" class="btn btn-primary form-control mb-3" onClick={Submit} >{Mode}</button>
        </form>
      </div>
    </div>
      <center id='table' className='pb-4'>
        <br />
<h1   style={{ textDecoration: "underline", textDecorationColor: "blue" }}>Saved Information</h1>

        <table class="table bg-dark mt-3  text-light w-75 text-center " border={3}>
          <thead >
            <tr style={{backgroundColor:"blue"}}>
              <th scope="col-sm-4">Name</th>
              <th scope="col-sm-4">Email</th>
              <th scope="col-sm-4">Mobile</th>
              <th scope="col-sm-4">Password</th>
              <th scope="col-sm-4">CPassword</th>
              <th scope="col-sm-4">Delete</th>
              <th scope="col-sm-4">Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              getData.map((e, i) => {
                return (
                  <>    <tr className='text-light bg-secondary text-center '>

                    <td>{e.name}</td>
                    <td>{e.mobile}</td>
                    <td>{e.email}</td>
                    <td>{e.password}</td>
                    <td>{e.cpassword}</td>
                    <td><button className='btn btn-danger' onClick={()=>{deleteHandle(i)}}>{<MdDelete/>}</button></td>
                    <td><button className='btn btn-primary' onClick={()=>{EditHandle(e,i)}}>{<FaEdit/>}</button></td>

                  </tr>
                  </>

                )
              })
            }
          </tbody>
        </table>


      </center>
    </>


  )
}

export default Form1
