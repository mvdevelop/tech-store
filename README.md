# 🚀 Tech Store

> **Tech Store** — Modern e-commerce web application for tech products, built with React 19, TypeScript, Vite 6, and Bootstrap 5. Features JWT authentication, protected routes, responsive design, and a fully typed codebase with comprehensive security practices.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Testing](#-testing)
- [Security](#-security)
- [CI/CD](#-cicd)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- ⚡ **Fast & Optimized** — Vite 6 build tool with HMR for instant development feedback
- 📱 **Fully Responsive** — Bootstrap 5 grid system with mobile-first design
- 🛍️ **Product Catalog** — 20 tech products with pricing, categories, and images
- 🔒 **JWT Authentication** — Secure token-based auth with automatic refresh
- 🛡️ **Protected Routes** — Role-based route guarding at the client level
- 🔐 **Type Safety** — Full TypeScript coverage with strict mode enabled
- 🧪 **Tested** — Unit and integration tests with Vitest + React Testing Library
- 🛠️ **Developer Experience** — ESLint, Prettier, and pre-commit hooks

---

## 🛠️ Tech Stack

### Core
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.0 | UI library |
| **TypeScript** | 5.2+ | Type-safe JavaScript |
| **Vite** | 6.3 | Build tool & dev server |
| **Bootstrap** | 5.3 | CSS framework |
| **React Bootstrap** | 2.10 | Bootstrap React components |

### Libraries
| Technology | Version | Purpose |
|------------|---------|---------|
| **Axios** | 1.13+ | HTTP client with interceptors |
| **React Router** | 7.9 | Client-side routing |
| **React Icons** | 5.5 | SVG icon library |
| **EmailJS** | 3.2+ | Email service integration |

### Dev Tools
| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | 9.22+ | Linting with strict rules |
| **TypeScript ESLint** | 8.0+ | TypeScript linting |
| **Vitest** | 2.1+ | Unit & integration testing |
| **@testing-library/react** | 16.3 | React component testing |
| **Prettier** | — | Code formatting |

---

## ⚙️ Getting Started

### 📋 Prerequisites

- **Node.js** v18+ (LTS)
- **npm** or **yarn**
- API backend running at `http://localhost:3000` (or configure `VITE_API_URL`)

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/mvdevelop/tech-store.git
cd tech-store

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
# Edit .env.local with your credentials
```

### 🔧 Environment Setup

Create a `.env.local` file in the project root:

```env
# API Backend
VITE_API_URL=http://localhost:3000/api/auth

# EmailJS (for contact form)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 🚀 Development

```bash
# Start development server
npm run dev
# Open http://localhost:5173

# Run type checking
npm run typecheck

# Run linting
npm run lint

# Run tests (watch mode)
npm run test

# Run tests with UI
npm run test:ui
```

### 🏗️ Build for Production

```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
tech-store/
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── README.md                 # This file
├── eslint.config.js          # ESLint configuration
├── index.html              # HTML entry point
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── vitest.config.ts          # Vitest configuration
├── src/
│   ├── main.tsx              # React entry point
│   ├── App.tsx               # Router configuration
│   ├── ProtectedRoute.tsx    # Auth route guard
│   ├── index.css             # Global styles
│   ├── api/
│   │   └── auth.ts           # Axios API client
│   ├── assets/
│   │   └── img/
│   │       └── icon.png      # Favicon
│   ├── components/
│   │   ├── Navbar.tsx        # Navigation bar
│   │   └── Footer.tsx        # Site footer
│   ├── context/
│   │   └── AuthContext.tsx   # Auth context provider
│   ├── hooks/
│   │   └── useAuth.ts        # Auth hook
│   ├── pages/
│   │   ├── Home.tsx          # Product showcase
│   │   ├── Products.tsx      # API-driven product list
│   │   ├── Blog.tsx          # Blog listing
│   │   ├── About.tsx         # Company page
│   │   ├── Contact.tsx       # Contact form
│   │   ├── Login.tsx         # Login form
│   │   ├── Register.tsx      # Registration form
│   │   └── Dashboard.tsx     # User dashboard
│   ├── data/
│   │   ├── products.ts       # Product data (typed)
│   │   └── blog.ts           # Blog data (typed)
│   ├── types/
│   │   ├── index.ts          # Global type definitions
│   │   └── assets.d.ts       # Asset import declarations
│   ├── __tests__/            # Test directory
│   └── setupTests.ts         # Test setup & mocks
├── .claude/
│   └── settings.local.json   # Claude Code settings
└── .github/
    └── workflows/
        └── ci.yml            # GitHub Actions CI/CD
```

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | ✅ Yes | Backend API URL (use HTTPS in production) |
| `VITE_EMAILJS_SERVICE_ID` | ❌ No | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | ❌ No | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | ❌ No | EmailJS public key |

> ⚠️ **Never commit `.env.local` to version control.** Use `.env.example` as a template.

---

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npx vitest run src/pages/__tests__/Login.test.tsx
```

**Testing Stack:**
- **Vitest** — Fast test runner with Vite integration
- **@testing-library/react** — React component testing utilities
- **@testing-library/jest-dom** — Custom DOM matchers
- **@testing-library/user-event** — User interaction simulation

---

## 🛡️ Security

### Authentication & Authorization
- **JWT-based authentication** with HttpOnly cookies
- **Access token** stored in memory (not localStorage) to prevent XSS
- **Refresh token** automatically renewed every 14 minutes
- **Protected routes** with client-side route guarding

### Security Headers
The application enforces the following security headers via Vite configuration:
- `Content-Security-Policy` (CSP)
- `X-Frame-Options: DENY` (prevent clickjacking)
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security` (HSTS)

### Security Practices
| Practice | Status | Description |
|----------|--------|-------------|
| HTTPS enforcement | ✅ | All API calls require HTTPS in production |
| CSRF protection | ✅ | SameSite cookies + CSRF tokens |
| XSS prevention | ✅ | React's built-in escaping + CSP |
| Password policies | ✅ | Minimum 8 characters (NIST 800-63B) |
| Secrets management | ✅ | Environment variables via `import.meta.env` |
| Error handling | ✅ | Generic error messages, no stack traces exposed |

---

## 🔄 CI/CD

The project includes a GitHub Actions workflow that runs on every push/PR:

```
✅ Linting (ESLint)
✅ Type checking (tsc)
✅ Security audit (npm audit)
✅ Tests (Vitest)
✅ Build verification
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Use **TypeScript strict mode** — all code must be typed
- Follow **ESLint** rules — `npm run lint` before committing
- Write **tests** for new features — `npm run test`
- Run **type checking** — `npm run typecheck`

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 💬 Contact

- **GitHub**: [@mvdevelop](https://github.com/mvdevelop)
- **Email**: marcosvmdilly@gmail.com

---

**⭐ Star this project if you find it helpful!**
