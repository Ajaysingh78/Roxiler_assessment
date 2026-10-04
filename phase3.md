# Phase 3: Frontend Implementation & UX Design

## 1. Frontend Architecture & Technology
- **Build Tool**: Vite + React 18
- **Routing**: React Router DOM v6 with Protected Routes based on authentication and roles (`AdminRoute`, `OwnerRoute`, `UserRoute`).
- **State Management**: Clean Context API (`AuthContext` for user session & JWT, `ThemeContext` for dark/light mode preference).
- **Styling**: Vanilla CSS Design System with CSS variables, modern micro-interactions, responsive grid/flexbox, glassmorphic cards, accessible form inputs with inline error feedback.
- **Iconography**: Lucide React icons for crisp, lightweight, scalable visuals.

---

## 2. Directory Structure
```
client/
├── src/
│   ├── assets/           # Logos, SVGs, static graphics
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── StarRating.jsx
│   │   │   ├── DataTable.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── Alert.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── forms/
│   │   │   ├── InputField.jsx
│   │   │   └── PasswordInput.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ToastContext.jsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── ChangePassword.jsx
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ManageUsers.jsx
│   │   │   └── ManageStores.jsx
│   │   ├── user/
│   │   │   └── StoresList.jsx
│   │   ├── owner/
│   │   │   └── OwnerDashboard.jsx
│   │   └── NotFound.jsx
│   ├── services/
│   │   ├── api.js          # Axios / Fetch client with auth bearer interceptor
│   │   ├── authService.js
│   │   ├── storeService.js
│   │   └── adminService.js
│   ├── styles/
│   │   ├── variables.css   # Colors, typography, shadows, transitions
│   │   ├── base.css        # Resets, typography, layout
│   │   ├── components.css  # Buttons, cards, modals, tables, badges
│   │   └── forms.css       # Inputs, validation errors, helpers
│   ├── App.jsx             # Main router & provider setup
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## 3. Key Views & Workflows

### 1. Unified Authentication (`/login`, `/signup`)
- Single login form for all 3 user roles.
- Upon successful login, the app inspects `user.role`:
  - `ADMIN` redirects to `/admin`
  - `STORE_OWNER` redirects to `/owner`
  - `USER` redirects to `/stores`
- Registration form for normal users with real-time character counters and validation feedback:
  - Name (20-60 chars) with progress bar / indicator.
  - Email format validation.
  - Password rules checklist: 8-16 characters, uppercase, special character.
  - Address (max 400 chars) with remaining character counter.

### 2. Normal User Experience (`/stores`)
- Clean search bar to filter stores simultaneously by Name and Address.
- Sorting controls: Sort by Store Name (A-Z, Z-A), Overall Rating (High-Low, Low-High), Address.
- Store card / table view featuring:
  - Store Name & Address
  - Overall Average Rating badge with star icons and total reviews count.
  - "My Submitted Rating" display.
  - Interactive Star Rating selector (1-5) to submit or update rating in place without leaving the page.
  - Real-time optimistic UI update with toast confirmation.

### 3. Store Owner Dashboard (`/owner`)
- Stat Cards:
  - Overall Average Rating (e.g. 4.8 / 5.0).
  - Total Submitted Ratings count.
  - Star Breakdown progress bars (5-star, 4-star, 3-star, 2-star, 1-star counts and percentages).
- Customer Ratings Table:
  - Columns: Customer Name, Email, Submitted Rating (stars), Date Submitted.
  - Sortable by Customer Name, Rating, and Date.

### 4. Admin Dashboard & Management (`/admin`)
- Metric Overview Cards:
  - Total Users registered.
  - Total Stores registered.
  - Total Ratings submitted.
- Tabbed management interface:
  - **Stores Management**: Add new store modal (Name, Email, Address, Assign Owner). Sortable, filterable stores table with overall rating and review counts.
  - **Users Management**: Add new user modal (Name, Email, Password, Address, Role selector). Filter by Role (`ALL`, `USER`, `ADMIN`, `STORE_OWNER`), search by Name/Email/Address. Sortable columns. For Store Owners, dynamically displays their Store's average rating.
