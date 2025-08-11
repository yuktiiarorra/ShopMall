# 🛍️ **ShopMall**  
![License](https://img.shields.io/badge/license-MIT-blue)  
![Build](https://img.shields.io/badge/build-passing-brightgreen)  
![Made with MERN](https://img.shields.io/badge/Made%20with-MERN-orange)  

> ***Your one-stop online shopping experience!***  
A **full-featured eCommerce platform** built with the **MERN stack** offering secure shopping, smooth checkout, and a responsive interface.

---

## 🚀 **Live Demo**
🔗**Try it here:** [**ShopMall Live**](https://shopmall-zmm5.onrender.com/login)  
---

## 📌 **Features**
- 🔐 **User Authentication** – Secure signup/login with **JWT**.
- 🛒 **Shopping Cart** – Add, remove, and update products easily.
- 💳 **Checkout & Payments** – Integrated with **PayPal / Stripe**.
- 📦 **Order Management** – Track, update, and fulfill orders.
- 📊 **Admin Dashboard** – Manage products, orders, and users.
- 📱 **Responsive Design** – Works beautifully on mobile, tablet, and desktop.

---

## 🛠 **Tech Stack**
| Layer        | Technologies Used |
|--------------|------------------|
| **Frontend** | React, Redux, Bootstrap |
| **Backend**  | Node.js, Express.js |
| **Database** | MongoDB |
| **Payments** | PayPal API / Stripe |
| **Auth**     | JSON Web Tokens (JWT) |

---

## 📦 **Installation & Setup**

1️⃣ **Clone the repository**
```bash
git clone https://github.com/your-username/shopmall.git
cd shopmall

<pre>
2️⃣ Install dependencies

bash
Copy
Edit
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
</pre>

3️⃣ Set Environment Variables
Create a .env file in the root directory:

<pre>
env
Copy
Edit
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
</pre>
4️⃣ Run the Application

<pre>
bash
Copy
Edit
# Backend only
npm run server

# Frontend only
npm run client

# Both frontend & backend
npm run dev
</pre>

🤝 Contributing
Contributions are welcome!
To contribute:

Fork the repository

Create a new branch (feature/YourFeature)

Commit changes

Push the branch and submit a Pull Request

## 🙏 Acknowledgements
This project was inspired by and learned from [Brad Traversy](https://github.com/bradtraversy) through his **MERN eCommerce** course.

Special thanks to him for the amazing tutorials and guidance.
