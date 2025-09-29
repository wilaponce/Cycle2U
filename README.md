
# Cycle2U Project

## 🛠 Disclaimer
**Work in Progress**: Cycle2U is an active development project. Features, logic, and incentives are subject to change as we refine the platform.

## Overview
Cycle2U is a full-stack recycling logistics platform designed to connect users with drivers for scheduled recyclable pickups. Inspired by gig-economy models like Uber and DoorDash, Cycle2U provides a scalable solution for residential recycling.

## Features
- User registration and login with role assignment (User, Driver, Admin)
- Pickup request submission with geolocation and scheduling
- Real-time driver tracking via SignalR
- Driver dashboard for accepting and managing pickups
- Admin dashboard for managing users, drivers, and requests
- Password reset and email verification flows with confirmation pages
- Push notifications using Firebase Cloud Messaging (FCM)
- Dashboard analytics with Chart.js (user growth, driver activity)
- Avatar upload with preview and cropping
- Toast notifications for success, error, and backend-triggered events

## Tech Stack
- **Backend**: ASP.NET Core (.NET 8), Entity Framework Core, SignalR, Identity
- **Frontend**: Next.js (React), Tailwind CSS, Chart.js, Leaflet, Firebase
- **Realtime**: SignalR (ASP.NET Core), Firebase Cloud Messaging
- **Database**: SQL Server (via EF Core)
- **Notifications**: react-hot-toast, Firebase Admin SDK

## Setup Instructions

### Backend Setup
- Restore NuGet packages
- Run EF Core migrations: `dotnet ef database update`
- Start the ASP.NET Core server: `dotnet run`

### Frontend Setup
- Navigate to frontend directory
- Install dependencies: `npm install`
- Start development server: `npm run dev`

### Firebase Setup
- Add Firebase config to `firebase.js`
- Register service worker (`firebase-messaging-sw.js`)
- Configure FCM in Firebase Console

## Deployment Notes
- Backend can be deployed to Azure App Service
- Frontend can be deployed to Vercel
- Ensure environment variables and connection strings are configured
- Set up CI/CD pipelines for automated deployment

## 🏆 Rewards & Incentives System

**Cycle2U Rewards Program**

Cycle2U empowers users to earn and invest through recycling:

- **Users with addresses**:
  - Qualify for **free recycling bins** placed at their homes.
  - Receive a **percentage of the recycled value** from their pickups.

- **Users without addresses**:
  - Still receive **exclusive perks** via the mobile app.

- **All users** can choose how to receive their earnings:
  - **Cash App**
  - **PayPal**
  - **Quick payout options**

- Users may also **invest their earnings** into a **company-held account**:
  - The company securely holds the funds.
  - Once users have accumulated enough, the funds can be used to pay for **desired items or services** (e.g., a car, house, bike, trip).
  - Users can withdraw the full amount when ready to make a purchase.
  - **Note**: While Cycle2U does not charge penalties, external fees (e.g., gas fees, payment processor charges) may apply depending on the transaction method.