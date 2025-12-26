# 🎬 Netflix Clone

A Netflix clone built with **Next.js 14**, **React 18**, and **Tailwind CSS** without TypeScript. Features real movie data from The Movie Database (TMDB) API.

## ✨ Features

- 🎯 **Modern UI** - Responsive design mimicking Netflix
- 🎬 **Real Movie Data** - Powered by TMDB API
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- ⚡ **Fast Performance** - Next.js 14 App Router
- 🖼️ **Optimized Images** - Next.js Image optimization
- 🔄 **Smooth Scrolling** - Horizontal movie rows with smooth animations
- 🌙 **Dark Theme** - Netflix-style dark interface
- 🎨 **Tailwind CSS** - Beautiful utility-first styling

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm** or **yarn**
- **TMDB API Key** - Free from [themoviedb.org](https://www.themoviedb.org/settings/api)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/0xfallin/netflix-clone.git
   cd netflix-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get TMDB API Key**
   - Go to [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
   - Sign up/Login to your account
   - Create a new API key

4. **Configure environment variables**
   - Create `.env.local` in the root directory
   - Add your TMDB API key:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   - Visit [http://localhost:3000](http://localhost:3000)

## 📦 Project Structure

```
netflix-clone/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.js            # Root layout
│   ├── page.js              # Home page
├── components/
│   ├── Header.js            # Navigation header
│   ├── Hero.js              # Featured movie section
│   ├── MovieRow.js          # Horizontal scrolling movies
├── lib/
│   ├── api.js               # TMDB API functions
├── public/                  # Static assets
├── .env.local              # Environment variables (create this)
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies
```

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Run production server
npm start

# Run ESLint
npm run lint
```

## 🎨 Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **TMDB API** - Movie data provider

## 📚 API Functions

The `lib/api.js` file includes:

- `fetchTrending()` - Get trending movies
- `fetchTopRated()` - Get top-rated movies
- `fetchAction()` - Get action movies
- `searchMovies(query)` - Search movies by query

## 🎯 Future Features

- [ ] Movie details page
- [ ] Search functionality with filters
- [ ] User authentication
- [ ] Watchlist/Favorites
- [ ] TV shows support
- [ ] User reviews and ratings
- [ ] Dark/Light theme toggle

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This is a clone for educational purposes only. Netflix is a trademark of Netflix, Inc. This project is not affiliated with Netflix.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TMDB API Documentation](https://developer.themoviedb.org/docs)

## 📧 Contact

For questions or suggestions, feel free to open an issue or contact me on GitHub.

---

**Made with ❤️ by [0xfallin](https://github.com/0xfallin)**