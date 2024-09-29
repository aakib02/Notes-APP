import React,{useState} from 'react'
import './area.css'

const Textarea = () => {
    const [Text, setText] = useState()
    const Handlechange = (e)=>{
        setText(e.target.value)
       
    }
    const UpperCase = ()=>{
        setText(Text.toUpperCase())
    }
    const LowerCase=()=>{
    setText(Text.toLowerCase())
    }
    const copyhandle =()=>{
      let data = document.getElementById("main")
      data.select()
      navigator.clipboard.writeText(Text)
       
    }
    const CutHandle=()=>{
      navigator.clipboard.writeText(Text)
      setText("")
    }
    const PasteHandle=()=>{
      navigator.clipboard.readText().then((e)=>{
        setText(e+Text);
      })
    }

    const RemoveHandle = ()=>{
      setText("")
    }
    

    console.log(Text);
    let a = 1;
    const Theme=()=>{
      if (a%4 === 0) {
        document.querySelector("body").style.backgroundColor = "red"

      }
      else if (a%4 === 1) {
        document.querySelector("body").style.backgroundColor = "gray"
      }
      else if (a%4 === 2) {
        document.querySelector("body").style.backgroundColor = "pink"
        
      }
      else{document.querySelector('body').style.backgroundColor = "yellow"
    }
    a++;
    }
  return (

    <div className='justify-content-center align-items-center d-flex mt-5 flex-column  ' >
      <h2><u style={{textShadow:"1px 1px 1px white" ,textDecorationColor:"red"}}>Write Your Notes</u></h2>
      <textarea name="" style={{border:"2px solid red" , outline:"red"}} className='  text-light fs-4 ps-3 pt-3'  id="main" value={Text} onChange={Handlechange} cols="70" rows="10"></textarea> <br />
      <div className='d-flex gap-2'>
      <button className='btn-primary' onClick={UpperCase}>UpperCase</button>
      <button className='btn-primary' onClick={LowerCase}>LowerCase</button>
      <button className='btn-primary' onClick={copyhandle}>Copytext</button>
      <button className='btn btn-primary' onClick={CutHandle}>Cut</button>
      <button className='btn btn-primary' onClick={PasteHandle}>Paste</button>
      <button className='btn btn-primary' onClick={RemoveHandle}>Remove</button>
      <button className='btn btn-primary' onClick={Theme}>Change Theme</button>
      
       </div>
    </div>
  )
}

export default Textarea
