import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav  mb-2 mb-lg-0">
        <li class="nav-item">
          <NavLink class="nav-link " aria-current="page" to="/">Home</NavLink>
        </li>
      </ul>
     
      <ul class="navbar-nav  mb-2 mb-lg-0">
        <li class="nav-item">
          <NavLink  class="nav-link " aria-current="page" to="/Form1">Form</NavLink>
        </li>
      </ul>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <NavLink class="nav-link " aria-current="page" to="/Card">Card</NavLink>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar
