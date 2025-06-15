# 🛒 Digital Product Marketplace

A full-stack MERN web application that allows users to **buy and sell digital products** such as websites, apps, games, online courses, UI kits, templates, and more. Products are delivered via **secure Google Drive links after successful payment**, creating a peer-to-peer digital economy similar to eBay for digital assets.

---

## 🌟 Features

### 🔐 Authentication
- Secure login and registration (JWT)
- Role-based system: Buyer / Seller / Admin

### 🛍️ Marketplace
- Browse all products with filters (category, price, rating)
- View product details, image previews, views, and ratings
- Add to cart and manage cart items
- Online payment integration (e.g., Stripe)
- Automatic access to Google Drive link after payment

### 🧑‍💻 Seller Dashboard
- Upload digital products with metadata
- Provide Google Drive shareable link (hidden until purchase)
- Manage personal products and view sales history

### 📥 Buyer Experience
- Browse and buy instantly
- Download product via Drive link after purchase
- Rate and review purchases

### ⚙️ Admin Panel
- Moderate products
- Manage users and reported items
- Track platform activity


---

## 🧰 Tech Stack

- **Frontend**: React, Redux, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT-based authentication
- **Payment**: Stripe (or other)
- **Storage**: Google Drive links (provided by sellers)
- **Deployment**: Vercel (Frontend), Render/Heroku (Backend), MongoDB Atlas

---

## 🚀 Getting Started

1. **Clone the repo:**

```bash
git clone https://github.com/azizmarhoum/DigitalMarket.git
cd code-craft-exchange



2. Install dependencies
cd backend
npm install
npm run dev
//backend et frontend
