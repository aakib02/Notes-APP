import React from 'react'

const thapa = () => {


  let getTime = new Date(2023, 12,21,17);
  getTime = getTime.getHours()
  let greeting =  "";
  let cssStyle = {};

  if (getTime >= 1 && getTime<=11) {
    greeting = "Good Morning"
    cssStyle.color = "green";
  }
  else if (getTime >= 12 && getTime<=19) {
    greeting = "Good afternoon"
    cssStyle.color = "orange";
  }
  if (getTime >= 19 && getTime<=24) {
    greeting = "Good NIght"
    cssStyle.color = "red";
  }
  return (
    <div>
      <h1>helo sir, <span style={cssStyle}> {greeting}</span></h1>
    </div>
  )
}

export default thapa
