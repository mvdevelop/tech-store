// src/components/Footer.tsx
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaTwitch } from 'react-icons/fa';

// 🔧 Tipos para os links sociais
interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterLink {
  label: string;
  href: string;
}

// 🧠 Dados: Sobre
const aboutTexts = [
  'A melhor loja gamer da galáxia 👾 — hardware, periféricos e setups',
  'completos para elevar sua gameplay ao próximo nível.',
];

// ⚙️ Dados: Produtos
const productLinks: FooterLink[] = [
  { label: 'Lançamentos', href: '/content' },
  { label: 'Acessórios', href: '/content' },
  { label: 'Periféricos', href: '/content' },
  { label: 'Ofertas', href: '/content' },
];

// 🔗 Dados: Navegação
const navLinks: FooterLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Login', href: '/login' },
  { label: 'Registrar', href: '/register' },
  { label: 'Dashboard', href: '/dashboard' },
];

// 🌐 Dados: Redes sociais
const socialLinks: SocialLink[] = [
  { icon: <FaFacebook />, href: '#', label: 'Facebook' },
  { icon: <FaInstagram />, href: '#', label: 'Instagram' },
  { icon: <FaTwitter />, href: '#', label: 'Twitter' },
  { icon: <FaGithub />, href: '#', label: 'GitHub' },
  { icon: <FaTwitch />, href: '#', label: 'Twitch' },
];

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
              {aboutTexts[0]} <br />
              {aboutTexts[1]}
            </p>
          </div>

          {/* ⚙️ Produtos */}
          <div className="col-12 col-sm-6 col-md-3">
            <h6 className="text-white mb-3 fw-semibold">Produtos</h6>
            <ul className="list-unstyled small">
              {productLinks.map((link) => (
                <li className="mb-2" key={link.label}>
                  <a
                    href={link.href}
                    className="link-light text-decoration-none link-opacity-75-hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 🔗 Navegação */}
          <div className="col-12 col-sm-6 col-md-3">
            <h6 className="text-white mb-3 fw-semibold">Navegação</h6>
            <ul className="list-unstyled small">
              {navLinks.map((link) => (
                <li className="mb-2" key={link.label}>
                  <a
                    href={link.href}
                    className="link-light text-decoration-none link-opacity-75-hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 🌐 Redes sociais */}
          <div className="col-12 col-sm-6 col-md-3">
            <h6 className="text-white mb-3 fw-semibold">Conecte-se</h6>
            <div className="d-flex gap-3 fs-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-light link-opacity-75-hover"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Linha inferior */}
      <div className="border-top border-info-subtle py-3 text-center small text-secondary">
        © {new Date().getFullYear()}{' '}
        <span className="text-info">Tech Store</span>. Todos os direitos reservados.
      </div>
    </footer>
  );
}
