# Phase 0: Product Understanding & Requirements Specification

## 1. Executive Summary
This document specifies the complete product requirements for the **Roxiler Systems Store Rating Portal** (Full-Stack Assessment). The application provides a centralized, multi-role web platform allowing normal users to discover stores and submit/modify 1-5 star ratings, store owners to monitor customer feedback and overall performance, and system administrators to manage stores, users, ratings, and platform metrics.

---

## 2. Core Business Objectives
1. **Single Entry Point Authentication**: All users authenticate through a unified login portal, automatically routed to their role-specific dashboard based on role permissions (`SYSTEM_ADMIN`, `NORMAL_USER`, `STORE_OWNER`).
2. **Transparent Store Reputation**: Enable verified normal users to submit and modify ratings (1 to 5) for registered stores, preventing duplicate ratings per user-store pair.
3. **Actionable Insights for Store Owners**: Provide store owners with real-time average rating analytics, rating distribution breakdowns, and detailed logs of customers who rated their store.
4. **Comprehensive System Administration**: Empower system administrators with platform-wide statistics, role-filtered user directories, store registry management, and user provisioning.

---

## 3. User Roles & Permission Matrix

| Feature / Action | Normal User (`USER`) | Store Owner (`STORE_OWNER`) | System Administrator (`ADMIN`) |
| :--- | :---: | :---: | :---: |
| **Self-Registration** | Yes | No (Admin provisioned) | No (Admin provisioned / Seeded) |
| **Login / Logout** | Yes | Yes | Yes |
| **Change Own Password** | Yes | Yes | Yes |
| **View All Stores Listing** | Yes | Yes | Yes |
| **Search Stores (Name/Address)**| Yes | Yes | Yes |
| **Submit Rating (1-5)** | Yes | No | No |
| **Modify Own Rating** | Yes | No | No |
| **View Store Owner Dashboard** | No | Yes (Own Store) | Yes (Global Overview) |
| **View Rated Users & Feedback**| No | Yes (Own Store only) | Yes (All Stores) |
| **View System Admin Dashboard**| No | No | Yes |
| **Add New Store** | No | No | Yes |
| **Add New User (Any Role)** | No | No | Yes |
| **Filter Users (Name/Email/Role)**| No | No | Yes |
| **Sort Listings (Asc / Desc)** | Yes (Stores) | Yes (Ratings) | Yes (Stores & Users) |

---

## 4. Strict Validation Requirements (Mandatory Specification)

1. **User Full Name**:
   - Minimum: **20 characters**
   - Maximum: **60 characters**
   - Letters, spaces, and punctuation only.
2. **Physical Address**:
   - Maximum: **400 characters**
   - Non-empty, trimmed string.
3. **Password**:
   - Length: **8 to 16 characters**
   - Must contain at least **one uppercase letter** (`[A-Z]`)
   - Must contain at least **one special character** (`[!@#$%^&*(),.?":{}|<>]`)
4. **Email Address**:
   - Standard RFC 5322 regex validation.
   - Case-insensitive uniqueness constraint.
5. **Rating**:
   - Integer between **1** and **5** inclusive.
   - Unique per (user_id, store_id) pair; attempting to rate again modifies the existing rating.

---

## 5. UI/UX Design Standards
- Premium, modern, accessible interface with cohesive typography (Inter font).
- Modern color palette: Deep Slate / Indigo / Violet / Emerald accents with dark and light theme harmony.
- Interactive micro-animations for rating star selections, hover cards, status badges, and toast notifications.
- Fully responsive across Desktop (1200px+), Tablet (768px - 1199px), and Mobile (<768px).
- Zero reliance on external placeholder services; real inline SVG icons and dynamic charts.
