
import React from 'react';
import { Link } from 'react-router-dom';
import { VscAccount, VscSearch } from "react-icons/vsc";
import { LuShoppingCart } from "react-icons/lu";
import logo from '../assets/img/icon.png';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm py-3 px-3 px-md-5">
      <div className="container-fluid">

        {/* 🔹 Logo e título */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img src={logo} alt="Logo" width="40" height="40" className="d-inline-block align-top" />
          <span className="fw-semibold fs-5">Tech Store</span>
        </Link>

        {/* 🔹 Botão colapsável no mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔹 Conteúdo da navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* 🔹 Links de navegação */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">Products</Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link">Blog</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
          </ul>

          {/* 🔹 Campo de busca + ícones */}
          <form className="d-flex align-items-center gap-3">
            <div className="input-group">
              <input
                type="search"
                className="form-control form-control-sm bg-dark text-light border-secondary"
                placeholder="Search..."
                aria-label="Search"
              />
              <button className="btn btn-outline-light btn-sm" type="submit">
                <VscSearch size={18} />
              </button>
            </div>

            <button type="button" className="btn btn-link text-light fs-5 p-0">
              <VscAccount />
            </button>
            <button type="button" className="btn btn-link text-light fs-5 p-0">
              <LuShoppingCart />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
