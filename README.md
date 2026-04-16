# Netflix Clone 🍿

A highly-detailed, authentic Netflix UI clone built with **React**, **TypeScript**, and **Vite**. 

This project aims to replicate the core visual and functional experience of the official Netflix web application. It includes a complete landing page, fully working authentication (via local storage), multi-user profile management, an interactive content catalog with proper TMDB thumbnails, and seamless navigation between the Home, Browse, and Account screens.

![Netflix Clone Preview](./public/favicon.svg)

---

## 🌟 Key Features

* **Authentic UI/UX Parity:** Pixel-perfect recreations of the Landing Page, Top 10 Trending Carousels, Billboard heroes, and sticky navigation headers.
* **Authentication Flow:** Fully functional "Sign In" and "Sign Up" pages using `localStorage` to simulate a real database and active sessions.
* **Profile Management:** A complete "Who's watching?" screen. Supports creating, selecting, and editing individual user profiles with custom avatars, maturity ratings, and autoplay controls.
* **Interactive Content Catalog:** 
  * "Trending Now" numbered carousels.
  * Hoverable movie cards that expand to show details.
  * Real movie metadata, posters, and backdrops powered by the TMDB (The Movie Database) structure.
* **Personalized "My List":** Add or remove movies to your personal list (persisted per-profile via `localStorage`).
* **Rich Navigation & Search:**
  * Authentic Profile Dropdown menu.
  * Expandable CSS-animated Search Bar.
* **Account Settings Page:** A detailed mock of the Netflix Account portal, showing membership details, billing info, and plan tiers.
* **Internationalization (i18n):** Working language switcher supporting English, Bahasa Melayu (bm), and Chinese (zh).
* **Video Player Modal:** Click any movie to open a simulated video player modal.

---

## 🚀 Tech Stack

* **Framework:** [React 18](https://react.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** Pure modern CSS (Flexbox, CSS Grid, CSS Variables)
* **State Management:** Custom React Hooks + `localStorage`
* **Icons:** Inline SVGs

---

## 🛠 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hongminglow/netflix-clone.git
   cd netflix-clone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`.

---

## 📸 Screenshots

*(Add your screenshots here)*

* **Landing Page:** Showcasing the hero email capture and trending carousel.
* **Browse:** The main Netflix dashboard with billboard and rows.
* **Profiles:** The "Who's watching?" and Edit Profile screens.
* **Account:** The membership and billing details page.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/hongminglow/netflix-clone/issues).

## 📝 License

This project is for educational and portfolio purposes only. Netflix and all related trademarks are the property of Netflix, Inc.
