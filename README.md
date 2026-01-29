# DSkinova - Premium Skincare Website

A modern, responsive skincare website built with React, featuring an admin dashboard for content management and a beautiful user interface for showcasing skincare services and news.

## 🌟 Features

### Frontend Features
- **Modern UI/UX**: Clean, professional design with Tailwind CSS
- **Responsive Design**: Fully responsive across all devices
- **Multi-page Navigation**: Home, About, Services, News
- **News Management**: Dynamic news articles with image support
- **Admin Dashboard**: Complete content management system
- **Image Upload**: Support for news article images
- **SEO Optimized**: Built-in SEO preparation scripts

### Admin Features
- **Secure Login**: Protected admin authentication
- **News Management**: Add, edit, delete news articles
- **Image Upload**: Thumbnail and content image support
- **Pagination**: Efficient news article pagination
- **Rich Content**: Support for paragraphs, tags, and metadata

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern JavaScript library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **FontAwesome & Lucide React** - Icon libraries

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vikky-Kumar-Nv/Dskinova.git
   cd Dskinova
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd skinera-main
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../Server
   npm install
   ```

### Development

1. **Start the Backend Server**
   ```bash
   cd Server
   node index.js
   ```
   Server will run on `http://localhost:3002`

2. **Start the Frontend Development Server**
   ```bash
   cd skinera-main
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

### Build for Production

1. **Build the Frontend**
   ```bash
   cd skinera-main
   npm run build
   ```

2. **Preview the Production Build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
Dskinova/
├── skinera-main/          # Frontend React Application
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── data/        # Mock data files
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   ├── package.json
│   └── tailwind.config.js
├── Server/               # Backend Express Server
│   ├── src/             # Server source files
│   ├── index.js         # Server entry point
│   └── package.json
└── README.md
```

## 🎨 Available Scripts

### Frontend Scripts (skinera-main)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run prebuild` - Run SEO preparation

### Backend Scripts (Server)
- `node index.js` - Start the server

## 🔐 Admin Access

- **Admin Login**: Navigate to `/admin-login`
- **Default Credentials**: Check the AdminLogin component for authentication logic
- **Dashboard**: Access content management at `/admin-dashboard`

## 📱 Pages & Routes

- `/` - Homepage with hero section and services
- `/about` - About Us page
- `/service` - Service details page

- `/news` - News archive page
- `/news/:slug` - Individual news article
- `/admin-login` - Admin authentication
- `/admin-dashboard` - Admin content management

## 🎯 Key Components

- **HomePage**: Landing page with hero and services
- **NewsArchive**: News listing with pagination
- **NewsTemplate**: Individual news article display
- **Dashboard**: Admin panel for content management
- **AdminLogin**: Secure admin authentication
- **ServiceDetail**: Service information pages

## 🚀 Deployment

### Frontend Deployment (Vercel)
The frontend is configured for Vercel deployment with:
- Automatic builds on push
- SEO optimization scripts
- Static asset handling

### Backend Deployment
The Express server can be deployed to:
- Heroku
- DigitalOcean
- AWS EC2
- Vercel (serverless functions)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.
