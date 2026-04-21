# Product Dashboard Application

A beautifully designed, responsive React application built to interact with the [DummyJSON API](https://dummyjson.com/). Features strict authentication, protected routes, product pagination, detailed views, and user profile management.

## APIs Integrated
The following endpoints were explicitly integrated into this project:
- **Users API (Auth & Profile)**: [https://dummyjson.com/users](https://dummyjson.com/users) *(used via `/auth/login` & `/auth/me`)*
- **Products API**: [https://dummyjson.com/products](https://dummyjson.com/products)
## Features Delivered
- **Login Authentication**: Secure login using DummyJSON `/auth/login` endpoint.
- **Protected Routing**: Directing unauthenticated users cleanly back to the login screen.
- **Paginated Products**: Browsing products leveraging limit and skip constraints from the DummyJSON `/products` endpoint.
- **Product Details**: Drill-down on individual product features with routing (`/products/:id`).
- **Profile Viewer**: Personal data retrieved using the `/auth/me` JWT validator endpoint, guaranteeing you only see your own data.
- **Design Excellence**: Constructed from scratch using CSS Glassmorphism logic, fluid animations, and Google Inter/Outfit typography.

## Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

## Setup and Installation

1. **Clone or Extract Project:**
   Navigate into the project directory using your terminal.

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment variables:**
   The project does not strictly require environment variables since the DummyJSON URL is hardcoded into `src/services/api.js`. However, for advanced setups, a `.env` and `.env.example` file have been provided.

4. **Start Development Server:**
   ```bash
   npm run dev
   ```
   *Your app will natively launch on `http://localhost:5173/`*

## Sample Credentials for Demo
The application requires valid DummyJSON credentials to log in. For testing purposes, you can manually type in the following testing account details:
- **Username / Email**: `emilys`
- **Password**: `emilyspass`

*(Any other valid DummyJSON credentials will work just as well)*

## Vercel Deployment Instructions

Deploying to Vercel is seamless since the app was built using Vite.

1. Create a free account at [Vercel](https://vercel.com/).
2. You can either deploy directly via Vercel CLI or connect a GitHub repository.
   
   **Via Vercel CLI**:
   - Run `npm i -g vercel` to install the Vercel CLI globally.
   - Run `vercel` in the project root directory.
   - Log in and accept all default configurations (Vercel automatically detects the Vite framework and builds appropriately using `npm run build` and serving the `dist` folder).

   **Via GitHub (Recommended)**:
   - Initialize a Git repository and push this source code to GitHub.
   - Go to the Vercel Dashboard -> Add New Project -> Import your GitHub repository.
   - Click "Deploy". Environment configurations are unnecessary.
   
3. Vercel handles all CDN distributions and SSL certificate configurations instantly. Ensure you configure your Single Page App (SPA) fallback routing in vercel (Vite handles this automatically under Vercel defaults).
