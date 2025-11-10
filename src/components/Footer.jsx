
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaTwitch } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 border-top border-info-subtle">
      {/* 🔹 Grid principal */}
      <div className="container pb-4">
        <div className="row gy-4">
          
          {/* 🧠 Sobre */}
          <div className="col-12 col-sm-6 col-md-3">
            <h5 className="text-info mb-3 fw-semibold">Tech Store</h5>
            <p className="small text-secondary">
              A melhor loja gamer da galáxia 👾 — hardware, periféricos e setups
              completos para elevar sua gameplay ao próximo nível.
            </p>
          </div>

          {/* ⚙️ Produtos */}
          <div className="col-12 col-sm-6 col-md-3">
            <h6 className="text-white mb-3 fw-semibold">Produtos</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="/content" className="link-light text-decoration-none link-opacity-75-hover">Lançamentos</a>
              </li>
              <li className="mb-2">
                <a href="/content" className="link-light text-decoration-none link-opacity-75-hover">Acessórios</a>
              </li>
              <li className="mb-2">
                <a href="/content" className="link-light text-decoration-none link-opacity-75-hover">Periféricos</a>
              </li>
              <li className="mb-2">
                <a href="/content" className="link-light text-decoration-none link-opacity-75-hover">Ofertas</a>
              </li>
            </ul>
          </div>

          {/* 🔗 Navegação */}
          <div className="col-12 col-sm-6 col-md-3">
            <h6 className="text-white mb-3 fw-semibold">Navegação</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="/" className="link-light text-decoration-none link-opacity-75-hover">Home</a>
              </li>
              <li className="mb-2">
                <a href="/login" className="link-light text-decoration-none link-opacity-75-hover">Login</a>
              </li>
              <li className="mb-2">
                <a href="/register" className="link-light text-decoration-none link-opacity-75-hover">Registrar</a>
              </li>
              <li className="mb-2">
                <a href="/dashboard" className="link-light text-decoration-none link-opacity-75-hover">Dashboard</a>
              </li>
            </ul>
          </div>

          {/* 🌐 Redes sociais */}
          <div className="col-12 col-sm-6 col-md-3">
            <h6 className="text-white mb-3 fw-semibold">Conecte-se</h6>
            <div className="d-flex gap-3 fs-5">
              <a href="#" className="text-light link-opacity-75-hover">
                <FaFacebook />
              </a>
              <a href="#" className="text-light link-opacity-75-hover">
                <FaInstagram />
              </a>
              <a href="#" className="text-light link-opacity-75-hover">
                <FaTwitter />
              </a>
              <a href="#" className="text-light link-opacity-75-hover">
                <FaGithub />
              </a>
              <a href="#" className="text-light link-opacity-75-hover">
                <FaTwitch />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Linha inferior */}
      <div className="border-top border-info-subtle py-3 text-center small text-secondary">
        © {new Date().getFullYear()} <span className="text-info">Tech Store</span>. Todos os direitos reservados.
      </div>
    </footer>
  );
}
