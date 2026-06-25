# RecipeHub 🍳

RecipeHub is a full-stack recipe-sharing platform where users can discover, share, and manage their favorite recipes. Users can browse recipes by category, save favorites, purchase premium recipes, and upgrade to a premium membership for unlimited recipe uploads. Admins get a dedicated dashboard to manage users, recipes, and reports.

## 🔗 Live Site

https://recipehub-client-iota.vercel.app/

## ✨ Features

- 🔐 **Authentication & Authorization** — Email/password and Google login powered by Better Auth, with role-based access control (User / Admin)
- 🍲 **Recipe Management** — Create, update, and delete recipes with image upload via Cloudinary
- 🔢 **Recipe Limit** — Free users can add up to 2 recipes; premium users get unlimited uploads
- 🔍 **Browse & Filter** — Server-side pagination and category filtering for recipe discovery
- ❤️ **Favorites & Likes** — Save recipes to favorites and like your favorite dishes
- 🚩 **Report System** — Report inappropriate recipes with a reason (spam, offensive content, copyright issue)
- 💳 **Stripe Integration** — Purchase individual recipes or upgrade to premium membership securely
- 🧑‍🍳 **User Dashboard** — Overview of your recipes, favorites, and likes received, plus profile management
- 🛠️ **Admin Dashboard** — Manage users (block/unblock), manage recipes (edit/delete/feature), review reports, and view all transactions
- 🌗 **Dark/Light Mode** — Theme toggle available across the entire app
- 🎬 **Smooth Animations** — Framer Motion animations on the home page
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- 🚫 **Custom 404 Page** — Friendly error page for unmatched routes

## 🛠️ Tech Stack

**Client**
- Next.js (App Router)
- Tailwind CSS
- HeroUI
- Framer Motion
- Better Auth (client)

**Server**
- Express.js
- MongoDB
- Better Auth
- Stripe

**Other Tools**
- Cloudinary (image hosting)
- Vercel (client deployment)
- Render (server deployment)

## 📂 Related Repositories

- **Client Repo:** [https://github.com/mahmud-abdullah-262/recipeHub-client](#) <!-- Replace with your client repo URL -->
- **Server Repo:** [https://github.com/mahmud-abdullah-262/recipeHub-server](#) <!-- Replace with your server repo URL -->

## ⚙️ Getting Started (Local Setup)

1. **Clone the repository**
   ```bash
   git clone <client-repo-url>
   cd recipehub-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory and add:
   ```env
   NEXT_PUBLIC_SERVER_URL=your_server_base_url
   NEXT_PUBLIC_BETTER_AUTH_URL=your_better_auth_url
   NEXT_PUBLIC_Cloudinary_API_KEY=your_Cloudinary_api_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

> ⚠️ Make sure the [server repository](#) is set up and running first, since the client depends on it for authentication and API requests.

## 👤 Admin Credentials (for testing/review)

- **Email:** admin@recipehub.com <!-- Replace with actual admin email -->
- **Password: 123456aA <!-- Replace with actual admin password -->

## 📌 Notes

- Authentication and session tokens are handled entirely through **Better Auth** (no separate JWT implementation).
- All sensitive credentials (database URI, Better Auth secret, Stripe keys, Cloudinary key) are secured via environment variables and are not exposed in the codebase.
- The app has been tested for responsiveness across mobile, tablet, and desktop, with no CORS, 404, or 504 errors on production routes.
- Authentication state persists correctly across page refreshes.

## 📄 License

This project was built as part of an academic assignment and is intended for educational/demo purposes.