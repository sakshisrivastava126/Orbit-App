# Orbit — Real-Time Chat Application

Orbit is a modern, full-stack real-time chat application built with the MERN stack and Socket.IO. It offers secure authentication, live user presence, image sharing, and seamless one-to-one conversations in a responsive, user-friendly interface.

---

## Features

- **JWT Authentication:** Secure signup and login with JSON Web Tokens.
- **Real-Time Messaging:** Instant chat powered by Socket.IO.
- **Online/Offline Presence:** See which users are currently online.
- **Image Sharing:** Upload and share images in chat via Cloudinary.
- **Unread Message Tracking:** Easily spot unread messages.
- **Profile Management:** Update your profile details and avatar.
- **Responsive Design:** Optimized for both desktop and mobile devices.

---

## Tech Stack

**Frontend:**
- React (with Context API)
- Tailwind CSS
- Axios

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- Socket.IO

**Other:**
- JWT for authentication
- bcrypt for password hashing
- Cloudinary for image uploads

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)

### Backend Setup

```bash
cd server
npm install
npm start
```

- Create a `.env` file in the `server` directory with the following variables:
  ```
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
  CLOUDINARY_API_KEY=your_cloudinary_api_key
  CLOUDINARY_API_SECRET=your_cloudinary_api_secret
  ```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

- Create a `.env` file in the `client` directory with:
  ```
  VITE_BACKEND_URL=http://localhost:4000
  ```

---


## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Cloudinary](https://cloudinary.com/)
- [Socket.IO](https://socket.io/)
- [Vercel](https://vercel.com/)
- [Render](https://render.com/)

---

> For any issues or contributions, please open an issue or pull request on GitHub.