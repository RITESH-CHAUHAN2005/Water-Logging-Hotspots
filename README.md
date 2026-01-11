# Delhi WaterWatch 🌧️

Delhi WaterWatch is a modern web application to **monitor, report, and manage waterlogging issues** across Delhi.  
Citizens can report waterlogging with precise location and images, while administrators can review, accept/reject, and track reports on an interactive map and analytics dashboard.

---

## ✨ Features

### For Citizens (Users)
- 🔐 **Role‑based login** (User/Admin)
- 👤 **User dashboard**
  - Personal stats: total reports, resolved, pending, in‑progress
  - Recent reports list with status and timestamps
- 📝 **Report Waterlogging modal**
  - Description, latitude, longitude, image upload
  - Optional "Use Current Location" via browser geolocation
- 🗺️ **Map integration**
  - Report coordinates saved and shown on map
  - Hotspot marking with severity (Low/Medium/High)
- 🔔 **Notification panel**
  - Inline dropdown with recent alerts (badge count, statuses)
- 📨 **Alerts page** (for user‑side updates and warnings)

### For Administrators
- 🛡️ **Admin‑only dashboard** (protected by role)
- 📊 **System stats**
  - Total users, total reports, active alerts, resolved today
- 📂 **Recent reports panel**
  - Shows user name, description, image indicator, lat/lng, status, priority
- ✅ **Moderation actions**
  - Accept (mark In Progress)
  - Reject
  - Mark Resolved
- 🗺️ **Map deep‑linking**
  - “View on Map” opens map zoomed to that report with a highlighted marker
- 🏘️ **Ward performance**
  - Readiness scores and reports per ward
- ⚙️ **Admin actions**
  - Manage alerts, wards, analytics, hotspot map

---

## 🏗️ Tech Stack

- **Frontend:** React + TypeScript + Vite
- **UI Layer:** Tailwind CSS + custom components (cards, buttons, badges, modals)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Maps:** Leaflet + OpenStreetMap tiles
- **State/Auth:** Custom context with `localStorage` persistence
- **Notifications:** `sonner` toast system
- **Routing:** React Router

---


A normal user can sign up using the **User** tab on the login/register page and will be stored locally with role `user`.

---

## 💾 Data Model (LocalStorage)

The app uses `localStorage` for demo/prototype purposes:

- `users`  
  Array of user objects (`id`, `name`, `email`, `role`, `phone`, `createdAt`).

- `credentials`  
  Array of `{ email, password, userId }` used for login.

- `currentUser`  
  The currently logged in user.

- `userReports`  
  Array of user reports with fields like:
  - `id`
  - `userId`, `user`
  - `description`
  - `location` (string)
  - `latitude`, `longitude`
  - `status` (`Pending | In Progress | Resolved | Rejected`)
  - `priority` (`Low | Medium | High | Critical`)
  - `date`
  - `image` (blob URL)

- `markedHotspots`  
  Custom hotspots added via map (admin tooling / mapping UI).

- `wardsData`  
  Static or seeded ward information with coordinates and readiness.

---

## 🗺️ Map & Markers

The **Map page** shows two kinds of items:

1. **Hotspots** (severity‑based circles & markers)
   - Severity colors:
     - High: Red
     - Medium: Orange
     - Low: Green
   - Circle radius ≈ 750m around coordinate.

2. **User Reports** (status‑based custom markers)
   - Pending: Blue marker with ⏳
   - In Progress: Orange marker with ⚠️
   - Resolved: Green marker with ✅
   - Rejected: Grey marker with ❌  
   - Clicking opens popup with user, description, status, priority and date.

When admin clicks **“View on Map”** from the dashboard, the app navigates to:



