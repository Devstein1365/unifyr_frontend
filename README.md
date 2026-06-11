<div align="center">
  <img src="public/logo2.png" alt="Unifyr Logo" width="200"/>
  
  # Unifyr Frontend
  
  ### Multi-Service Platform - Customer Dashboard
  
  A modern, responsive React application for managing orders across multiple service categories including Printing & Branding, Food Delivery, Recruitment, Real Estate, Wedding Planning, and Spa & Wellness.

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.14-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.16-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 🚀 Features

- 🔐 **Authentication System** - Secure login/signup with JWT tokens
- 📊 **User Dashboard** - Track orders, view invoices, manage profile
- 👨‍💼 **Admin Panel** - Manage all orders, view statistics, export reports
- 📄 **PDF Invoices** - Download individual or bulk invoices
- 📈 **Excel Export** - Export order data with custom formatting
- 🖼️ **Profile Management** - Update profile with picture upload (up to 50MB)
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Built with Tailwind CSS for a clean, professional look

---

## 🛠️ Tech Stack

| Technology   | Version | Purpose                 |
| ------------ | ------- | ----------------------- |
| React        | 19.1.1  | UI Framework            |
| Vite         | 7.1.14  | Build Tool & Dev Server |
| Tailwind CSS | 4.1.16  | Styling                 |
| Axios        | 1.13.1  | HTTP Client             |
| React Router | 7.2.0   | Routing                 |
| jsPDF        | 2.5.2   | PDF Generation          |
| xlsx         | 0.18.5  | Excel Export            |
| JSZip        | 3.10.1  | Bulk Invoice Download   |

---

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Backend API** running (see Backend repository)

---

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**

   ```bash
   # Create .env file in the root directory
   touch .env
   ```

4. **Add environment variables**
   ```env
   VITE_API_URL=http://localhost:3000
   ```

---

## 🚦 Running the Application

### Development Mode

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
Frontend/
├── public/              # Static assets
│   ├── logo.png
│   ├── logo2.png
│   └── ...
├── src/
│   ├── assets/         # Images, icons, etc.
│   ├── components/     # Reusable components
│   │   ├── EditOrder.jsx
│   │   ├── EditProfile.jsx
│   │   ├── Header.jsx
│   │   ├── OrderForm.jsx
│   │   ├── ViewInvoices.jsx
│   │   └── ui/         # UI primitives
│   ├── context/        # React Context (Auth)
│   │   └── AuthContext.jsx
│   ├── pages/          # Page components
│   │   ├── Admin.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── ...
│   ├── services/       # API integration
│   │   └── api.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── .env                # Environment variables
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
└── package.json        # Dependencies
```

---

## 🔑 Key Features Explained

### Authentication

- JWT-based authentication with 30-day token expiration
- Protected routes for authenticated users
- Role-based access (User/Admin)
- Automatic token refresh and logout on expiration

### Dashboard

- View all your orders with real-time status
- Create new orders with service-specific fields
- Download invoices individually or in bulk
- Filter and search orders

### Admin Panel

- View all orders from all users
- Dashboard statistics (total orders, users, revenue)
- Edit or delete any order
- Export data to Excel with custom formatting
- Auto-refresh every 30 seconds

### Profile Management

- Update personal information
- Upload profile picture (base64, up to 50MB)
- Change password with validation
- Password reset functionality

---

## 🌐 API Integration

The frontend communicates with the backend API at `VITE_API_URL`. All requests include:

- JWT token in Authorization header
- Error handling with user-friendly messages
- Automatic logout on 401 (unauthorized)

### API Endpoints Used

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/admin/stats` - Admin statistics
- `GET /api/admin/orders` - All orders (admin)

---

## 🎨 Customization

### Colors & Branding

Edit `tailwind.config.js` to customize colors:

```js
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      // ...
    }
  }
}
```

### Logo

Replace `public/logo.png` and `public/logo2.png` with your own branding.

---

## 📦 Build & Deploy

### Build the project

```bash
npm run build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

**Remember to set environment variables on your deployment platform:**

- `VITE_API_URL` - Your backend API URL

---

## 🐛 Troubleshooting

### API Connection Issues

- Ensure backend is running and accessible
- Check `VITE_API_URL` in `.env` file
- Verify CORS is enabled on backend

### Build Errors

- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### Styling Issues

- Rebuild Tailwind: `npm run build`
- Check Tailwind config: `tailwind.config.js`

---

## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📞 Support

For support, email ogagospel9@gmail.com or open an issue in the repository.

---

<div align="center">
  Made by Your Oga Gospel Oligwu
  
  [Website](https://www.unifyr-sigma.vercel.app/)
</div>
