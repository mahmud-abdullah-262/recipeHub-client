# RecipeHub — ৫ দিনের সম্পূর্ণ ডেভেলপমেন্ট রোডম্যাপ
Authentication & Authorization

done - Better Auth দিয়ে Credential + Google OAuth লগইন
done - JWT টোকেন HTTPOnly কুকিতে রাখা
verify এবং verifyAdmin middleware দিয়ে রাউট প্রোটেকশন
done - পেজ রিফ্রেশ করলেও auth state persist থাকতে হবে

User Role

done - 5. Recipe যুক্ত করা (ফ্রি ইউজার সর্বোচ্চ ২টা, প্রিমিয়াম হলে আনলিমিটেড)

done - 6. সমস্ত রেসিপি UI-তে ব্রাউজ করা

7. Recipe ফেভারিট করা

8. Category অনুযায়ী filter করা (MongoDB $in দিয়ে)

9. প্রোফাইল আপডেট করা

Admin Role

10. ইউজার ম্যানেজমেন্ট (manage users)

11. রেসিপি ম্যানেজমেন্ট (manage recipes)

12. রিপোর্ট রিভিউ করা (reports review)
Payment

13. Stripe দিয়ে রেসিপি পারচেজ করা

14. Stripe দিয়ে প্রিমিয়াম মেম্বারশিপ নেওয়া
Image / Media

15. imgbb দিয়ে রেসিপি ইমেজ আপলোড
Other Features

16. Server-side pagination

17. Dark/Light theme toggle

18. হোমপেজে Framer Motion animation

19. কাস্টম 404 পেজ
Database Collections

20. users, recipes, favorites, reports, payments — এই কালেকশনগুলো ডিজাইন করা
Full Marks-এর জন্য Technical Requirement (ফাংশনালিটি না হলেও জরুরি)

21. Client-এ ২০+ কমিট, Server-এ ১২+ কমিট

22. Client README লেখা

23. Env ফাইলে credentials সিকিউর রাখা

24. Responsive ও professional UI

25. CORS/404/504 ইস্যু না থাকা
Submission Deliverables

26. Admin email/password জমা দেওয়া

27. Live site link

28. Client ও Server — দুটোর GitHub রিপো লিংক

## কেন এই অর্ডারে কাজ করবে

Authentication, Authorization, Server Setup আর Deployment — এই চারটা জিনিস সবার আগে শেষ করা হয়েছে এই প্ল্যানে। কারণ এগুলো পুরো অ্যাপের ফাউন্ডেশন — প্রতিটা প্রাইভেট রুট, প্রতিটা API, এমনকি Dashboard পর্যন্ত এগুলোর উপর নির্ভর করে। যদি ফিচার আগে বানিয়ে Auth পরে যোগ করো, তাহলে প্রতিটা পেজে আবার গিয়ে protected route wrapper, role check, JWT header — এসব বসাতে হবে, যেটা সরাসরি rework। তাই Day 1-এই পুরো ভিত্তিটা শক্ত করে ফেলা হয়েছে, যাতে বাকি ৪ দিন শুধু ফিচার বসানো যায়, কোনো কিছু আবার ধরতে না হয়।

প্রতিটা চেকলিস্ট আইটেম শেষ করার সাথে সাথেই একটা meaningful commit দিয়ে দিও (client-এ ২০+, server-এ ১২+ লাগবে) — শেষ দিনে গিয়ে কমিট গোনার চিন্তা যেন না করতে হয়।

---

## Day 1 — Setup + Authentication + Authorization + Deployment Skeleton

### Part A: Project Setup
- [ ] Client (Next.js) আর Server (Express) — দুইটা আলাদা GitHub repo তৈরি করো, প্রথম কমিট দিয়ে দাও
- [ ] Server-এ ফোল্ডার স্ট্রাকচার বানাও: `routes/`, `controllers/`, `middlewares/`, `config/`
- [ ] `.env` ফাইলে MongoDB URI, JWT secret, Better Auth secret রাখো — `.gitignore`-এ `.env` যোগ করতে ভুলো না
- [ ] MongoDB connection সেটআপ করো — connection একবারই establish করে collection reference গ্লোবালি রাখো (per-request নতুন connect না করে), যাতে async timing ইস্যু না হয়
- [ ] Middleware order ঠিক রাখো: প্রথমে `cors()` ও `express.json()`, তারপর routes — এই অর্ডার ভুল হলে পরে অদ্ভুত error ধরতে কষ্ট হয়
- [ ] Client-এ Tailwind সেটআপ করো এবং dark/light mode-এর কনফিগারেশন (`darkMode: 'class'`) শুরুতেই বসিয়ে নাও — পরে প্রতিটা কম্পোনেন্টে dark class বসানো অনেক বেশি ঝামেলার

### Part B: Authentication & Authorization (সবচেয়ে গুরুত্বপূর্ণ অংশ)
- [ ] Better Auth কনফিগার করো, সব credential `.env`-এ রাখো
- [ ] `users` collection design করো (name, email, image, role, isBlocked, isPremium, createdAt, updatedAt)
- [ ] Registration ফর্ম: Name, Email, Image URL, Password — validation (minimum 6 ক্যারেক্টার, একটা uppercase, একটা lowercase)
- [ ] Login ফর্ম: Email/Password credential login + Google login
- [ ] Login-এর পর redirect logic: intended route-এ ফিরে যাওয়া, না থাকলে Home
- [ ] Server-এ JWT generate করার endpoint বানাও, token HTTPOnly cookie-তে সেট করো
- [ ] `verifyToken` middleware বানাও — সব protected API-তে আগে এটা বসবে
- [ ] `verifyAdmin` middleware বানাও (role check) — Admin-only API protect করার জন্য
- [ ] Client-এ Protected Route wrapper বানাও (Next.js layout লেভেলে), যেখানে auth state না থাকলে Login-এ redirect হবে
- [ ] টেস্ট করো: লগইন করে প্রাইভেট রুট রিফ্রেশ দিলে ইউজার logged-in থাকছে কিনা (এই জিনিসটা শেষে টেস্ট করলে ফিক্স করতে অনেক সময় যায়, তাই Day 1-এই কনফার্ম করে নাও)

### Part C: Base Layout + Deployment Skeleton
- [ ] Navbar বানাও — Public routes (Home, Browse Recipes, Login, Register) এবং auth state অনুযায়ী Conditional protected links (Dashboard, Profile)
- [ ] Footer বানাও — Logo, Quick Links, Social Links, Copyright, Contact Information
- [ ] Loading component বানাও (Auth check ও data fetching-এর সময় দেখাবে)
- [ ] Custom 404 Error Page বানাও (Illustration, Error Message, Back Home Button)
- [ ] Theme toggle বাটন বসাও Navbar-এ
- [ ] Server early deploy করো (Render/Vercel) — খালি একটা health-check route দিয়ে হলেও, যাতে env var আর CORS ইস্যু এখনই ধরা পড়ে
- [ ] Client early deploy করো (Vercel) — Navbar/Footer/Login/Register পেজ লাইভে টেস্ট করো
- [ ] লাইভ সাইটে route reload করে দেখো — কোথাও 404/CORS error আসছে কিনা

> **Day 1 শেষে থাকবে:** কাজ করা Login/Register, JWT-protected route system, deploy হওয়া skeleton — যার উপর বাকি সব ফিচার নিরাপদে বসানো যাবে।

---

## Day 2 — Recipe Core (CRUD) + Home Page

### Server: Recipes API
- [ ] `recipes` collection design করো (recipeName, recipeImage, category, cuisineType, difficultyLevel, preparationTime, ingredients, instructions, authorId, authorName, authorEmail, likesCount, isFeatured, status, createdAt, updatedAt)
- [ ] Create Recipe API — JWT verify middleware দিয়ে protect করো
- [ ] Get All Recipes API — **server-side pagination** ও category filter (`$in`) সহ
- [ ] Get Single Recipe API
- [ ] Update/Delete Recipe API — শুধু owner বা admin করতে পারবে এই চেক বসাও

### Client
- [ ] Add Recipe ফর্ম বানাও — imgbb-তে image upload ইন্টিগ্রেট করো
- [ ] **2-recipe limit** চেক বসাও (normal user) — client এবং server দুই জায়গাতেই enforce করো (শুধু client-এ করলে bypass করা যাবে)
- [ ] My Recipes পেজ — নিজের recipe লিস্ট, Edit/Delete বাটন
- [ ] Browse All Recipes পেজ — card format, pagination UI, category filter UI
- [ ] Recipe Details পেজ-এর বেসিক স্ট্রাকচার বানাও (পুরো তথ্য দেখানো) — Like/Purchase/Report/Favorite বাটন এখন শুধু UI বসাও, লজিক Day 3-তে

### Home Page
- [ ] Banner Section (Title, Description, CTA Button)
- [ ] Dynamic Section 1 — Featured Recipes (isFeatured সত্যি যেগুলোর, Recipe Name/Category/Cuisine/Prep Time কার্ডে)
- [ ] Dynamic Section 2 — Popular Recipes (likesCount অনুযায়ী sort, Recipe Name/Likes/Author)
- [ ] নিজের পছন্দমতো ২টা Extra static section যোগ করো
- [ ] Framer Motion/Motion দিয়ে অন্তত একটা section-এ animation বসাও

> **Day 2 শেষে থাকবে:** Recipe তৈরি, দেখা, edit/delete করার পুরো ফ্লো কাজ করবে, এবং Home page সব ডেটা দেখাবে।

---

## Day 3 — Interactions + Stripe Purchase

### Like, Favorite, Report
- [ ] Like API — likesCount বাড়াবে, এবং Recipe Details পেজে আপডেট হয়ে দেখাবে
- [ ] `favorites` collection ও Add/Remove Favorite API (userEmail, userId, recipeId, addedAt)
- [ ] Favorites পেজ — সেভ করা recipe কার্ড/টেবিল আকারে, Remove ও View Details বাটন
- [ ] `reports` collection ও Report API (recipeId, reporterEmail, reason, status, createdAt)
- [ ] Report Modal বানাও — কারণ অপশন: Spam, Offensive Content, Copyright Issue

### Stripe — Recipe Purchase
- [ ] Server-এ Stripe Checkout Session তৈরির API বানাও (recipe purchase-এর জন্য)
- [ ] Recipe Details পেজের Purchase বাটন → Stripe Checkout ফ্লো
- [ ] `payments` collection ডিজাইন করো (userEmail, userId, amount, recipeId, transactionId, paymentStatus, paidAt)
- [ ] Payment Success পেজ — confirmation দেখাও, transaction `payments` collection-এ সেভ করো
- [ ] My Purchased Recipes পেজ — কেনা recipe-গুলো card/table আকারে, View Details বাটন সহ

> **Day 3 শেষে থাকবে:** Like/Favorite/Report পুরোপুরি কাজ করবে, এবং recipe কেনা থেকে শুরু করে পেমেন্ট সাকসেস পর্যন্ত পুরো Stripe ফ্লো চালু থাকবে।

---

## Day 4 — Premium Membership + User & Admin Dashboard

### Premium Membership
- [ ] Stripe Checkout দিয়ে আলাদা Premium Membership purchase ফ্লো বানাও
- [ ] পেমেন্ট সাকসেস হলে user-এর `isPremium: true` সেট করো
- [ ] Premium হলে Add Recipe-এর 2-limit চেক বাইপাস হবে — এই লজিক server-এ আপডেট করো
- [ ] Profile/Dashboard-এ Premium badge দেখাও

### User Dashboard
- [ ] Dashboard Overview — Total Recipes, Total Favorites, Total Likes Received, Premium badge (aggregation query দিয়ে)
- [ ] Profile পেজ — Name ও Image আপডেট করার ফর্ম

### Admin Dashboard
- [ ] Admin Overview — Total Users, Total Recipes, Total Premium Members, Total Reports
- [ ] Manage Users পেজ — View/Block/Unblock, action-এর আগে confirmation modal বসাও
- [ ] Manage Recipes পেজ — table format, সব ইউজারের recipe, Edit/Delete/Feature বাটন (Feature করলে Home page-এর Featured section-এ দেখাবে)
- [ ] Recipe Reports পেজ — সব report লিস্ট, Remove Recipe / Dismiss Report অ্যাকশন
- [ ] Transactions পেজ — User, Amount, Date, Payment Status, Transaction ID টেবিল আকারে

> **Day 4 শেষে থাকবে:** Premium membership, পুরো User Dashboard আর Admin Dashboard — সব মিলিয়ে অ্যাপের পুরো ফাংশনালিটি কমপ্লিট।

---

## Day 5 — Polish, Testing, Final Deployment, Submission

### Responsive ও UI Polish
- [ ] প্রতিটা পেজ Mobile/Tablet/Desktop — তিন সাইজেই চেক করো
- [ ] Loading state সব জায়গায় ঠিকমতো দেখাচ্ছে কিনা চেক করো
- [ ] Error handling পাস দাও — সব API-তে try/catch আছে কিনা, client-এ proper error message/toast দেখাচ্ছে কিনা

### Deployment Final Checklist
- [ ] লাইভ সাইটে সব রুট ম্যানুয়ালি reload করে দেখো — কোথাও 404 আসছে কিনা
- [ ] CORS error আছে কিনা (Network tab-এ চেক করো)
- [ ] কোনো API 504-এ timeout হচ্ছে কিনা
- [ ] প্রাইভেট রুট রিফ্রেশ দিলে logout হয়ে যাচ্ছে কিনা — confirm করো হচ্ছে না
- [ ] লগইন অবস্থায় ব্রাউজার বন্ধ করে আবার খুললে session থাকছে কিনা

### Documentation ও Submission প্রস্তুতি
- [ ] Client-side README লেখো (প্রজেক্ট সম্পর্কে, ব্যবহৃত টেকনোলজি, ফিচার লিস্ট, লোকাল সেটআপ স্টেপ)
- [ ] Commit সংখ্যা চেক করো — Client 20+, Server 12+ আছে কিনা; কম থাকলে অর্থপূর্ণ ছোট কমিট (refactor, README, env example) দিয়ে পূরণ করো
- [ ] Admin email/password ফাইনাল করো এবং নোট করে রাখো
- [ ] সময় বাকি থাকলে Optional ফিচার যোগ করো: Recipe Bookmark, Rating System, Recipe Analytics Dashboard

### জমা দেওয়ার আগে শেষ চেক (Submission)
- [ ] Admin Email
- [ ] Admin Password
- [ ] Live Site Link
- [ ] GitHub Repository (Server)
- [ ] GitHub Repository (Client)

---

## কুইক রেফারেন্স — Database Collections

| Collection | মূল Field |
|---|---|
| `users` | name, email, image, role, isBlocked, isPremium, createdAt, updatedAt |
| `recipes` | recipeName, recipeImage, category, cuisineType, difficultyLevel, preparationTime, ingredients, instructions, authorId/Name/Email, likesCount, isFeatured, status |
| `favorites` | userEmail, userId, recipeId, addedAt |
| `reports` | recipeId, reporterEmail, reason, status, createdAt |
| `payments` | userEmail, userId, amount, recipeId, transactionId, paymentStatus, paidAt |
