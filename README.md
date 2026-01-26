
# Cycle2u – Recycling Made Simple

Join me to make it possible
github: wilaponce 

Cycle2u is a tech-driven recycling platform designed to make recycling accessible, rewarding, and efficient for everyone, including individuals without a permanent address. Our mission: **reduce waste, promote sustainability, and empower communities through technology and incentives.**

---

## ✅ Grant Opportunity
Cycle2u is preparing to apply for the **CalRecycle Beverage Container Redemption Innovation Grant (RIG)**, offering **$500K–$10M** for projects that:
- Expand **container redemption access** in underserved areas.
- Implement **mobile collection programs** and **bag-drop systems**.
- Use **technology-driven solutions** to improve recycling efficiency.

**Why Cycle2u qualifies:**
- **Mobile Unit Program**: Gig-economy driver model for home pickups.
- **Bag Drop Feature**: Fully implemented with real-time updates.
- **Social Impact**: Targets underserved and homeless populations.
- **Scalability**: Modern tech stack ensures rapid expansion.

This grant significantly boosts credibility and funding potential. The app is nearly production-ready.

---

## ✅ Current Features
- **Next.js App Router + React Frontend**
- **Supabase Backend & Authentication**
- **Gig-Economy Driver Model**
- **Rewards System** (Cash App, PayPal)
- **Bag Drop Feature** (real-time updates + Tailwind UI)
- **Deployment**: Vercel (frontend)

---

## ✅ New Features Added
- **Request Map**: Users can request recycling services by location.
- **Rewards Dashboard**: Displays available rewards and points.
- **Real-time Updates**: Bag Drop requests auto-refresh via Supabase subscriptions.
- **Tailwind Styling**: Clean, responsive UI.

---

## ✅ Planned Features
- Expanded rewards program (raffles, contests).
- Savings & investment options.
- Advanced AI recycling validation.
- Community housing initiative.
- Gamification & leaderboards.

---

## ✅ Technology Stack
- **Frontend**: Next.js (App Router) + React
- **Backend & Auth**: Supabase
- **Styling**: Tailwind CSS
- **Payments**: Cash App, PayPal
- **Deployment**: Vercel

---

## ✅ Folder Structure
```
├── .gitattributes
├── .gitignore
└── Cycle2u/
    ├── .env.example
    ├── Components/
    │   ├── BagDrop.tsx
    │   ├── Footer.tsx
    │   ├── Loader.tsx
    │   ├── Navbar.tsx
    │   ├── RequestMap.tsx
    │   └── Rewards.tsx
    ├── Dockerfile
    ├── README.md
    ├── app/
    │   ├── api/
    │   │   ├── bag-drop/
    │   │   │   └── route.ts
    │   │   ├── request-map/
    │   │   │   └── route.ts
    │   │   └── rewards/
    │   │       └── route.ts
    │   ├── dashboard/
    │   │   └── page.tsx
    │   ├── driver/
    │   │   └── page.tsx
    │   ├── layout.tsx
    │   ├── login/
    │   │   └── page.tsx
    │   ├── page.tsx
    │   ├── pickup/
    │   │   └── page.tsx
    │   ├── register/
    │   │   └── page.tsx
    │   └── upload/
    │       └── page.tsx
    ├── package.json
    ├── postcss.config.js
    ├── styles/
    │   ├── globals.css
    │   └── site.css
    ├── tailwind.config.js
    └── utilities/
        ├── supabaseClient.ts
        └── validation.ts
```
