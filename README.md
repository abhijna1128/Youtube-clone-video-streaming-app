# Video Streaming App (YouTube Clone)

A modern, responsive **YouTube Clone (Frontend Only)** built with **React** and **Vite**, replicating the UI and interactive features of YouTube. This project focuses on modern UI design, responsiveness, and dynamic content rendering.

**Live Demo:** [https://youtube-clone-videostreaming-app.netlify.app](https://youtube-clone-videostreaming-app.netlify.app)

**GitHub Repository:** [https://github.com/abhijna1128/Youtube-clone-video-streaming-app](https://github.com/abhijna1128/Youtube-clone-video-streaming-app)

---

## 📝 Project Overview

The application allows users to:

* Browse trending and category-based videos
* Search for content
* View video details
* Like/dislike videos dynamically
* Explore categories

This project is focused on frontend development and demonstrates modern React development practices.

---

## 🎯 Project Goals

* Develop an interactive UI replicating YouTube’s core design
* Implement a responsive layout for mobile, tablet, and desktop
* Use React state management for dynamic likes, dislikes, and views
* Enhance user experience with animations and hover effects
* Use React Router for page navigation
* Implement light/dark mode for theme customization
* Deploy the project on Netlify/Vercel and maintain a GitHub repository

---

## 🚀 Features & Functionalities

### Homepage (Video Feed)

* Displays a list of trending videos with thumbnails
* Each video includes:

  * Thumbnail image
  * Video title
  * Channel name & profile picture
  * Number of views & posted time
* Clicking a video navigates to the **Video Details Page**

### Navigation & Routing

* **Top Navbar:**

  * Search bar to find videos
  * User profile icon (for future authentication)
* **Left Sidebar:**

  * Categories: Home, Trending, Music, Gaming, Technology, etc.
* Uses **React Router DOM** for seamless navigation

### Video Details Page

* Full video player UI
* Below the video:

  * Title & description
  * Like & Dislike buttons (state-based)
  * Subscribe button (UI only, no backend)
  * Comment section with a list of comments

### Sidebar: Related Videos

* Displays a list of suggested videos on the right
* Clicking on a video opens the **Video Details Page**

### Search Functionality

* Users can type keywords in the search bar
* Results are displayed dynamically on a separate **Search Results Page**

### Light/Dark Mode Toggle

* Switch between light and dark themes
* Implemented using **React Context API**
* Theme preference saved in **localStorage**

### UI/UX Enhancements

* Hover effects on thumbnails and buttons
* Smooth animations for page transitions
* Skeleton loaders for better user experience

### Fully Responsive Design

* Works on mobile, tablet, and desktop
* Uses **Bootstrap Grid** and CSS media queries

---

## 🛠️ Technology Stack

* **Frontend:** React 18, Vite 5
* **Routing:** React Router DOM 6
* **Styling:** Bootstrap 5, CSS3
* **Icons:** Font Awesome 6
* **State Management:** React hooks, Context API
* **Persistence:** localStorage for theme preferences and likes

---

## 🎥 Sample Video Categories

* **Technology:** Tutorials & coding tips
* **Music:** Lofi beats & music videos
* **Gaming:** Gameplay & montages
* **News:** Tech updates
* **Sports:** Football highlights
* **Education:** Learning content

---

## 💻 Getting Started

### Prerequisites

* Node.js v16+
* npm or yarn

### Installation

```bash
git clone https://github.com/abhijna1128/Youtube-clone-video-streaming-app.git
cd Youtube-clone-video-streaming-app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

* `npm run dev` – Start development server
* `npm run build` – Build for production
* `npm run preview` – Preview production build

---

## 🌟 Future Enhancements

* User authentication & subscriptions
* Video upload functionality
* Real-time comments & recommendations
* Playlists & watch history

---

## 🤝 Contributing

This project is primarily for learning and portfolio purposes. You can explore the code, test it locally, and adapt ideas for your own projects.

---

## 📄 License

This project is for educational purposes and demonstrates modern React development practices.
