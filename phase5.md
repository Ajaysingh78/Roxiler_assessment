# Phase 5: Quality Assurance, Verification & Submission Guide

## 1. QA Verification Matrix

| Requirement | Test Scenario | Expected Outcome | Status |
| :--- | :--- | :--- | :---: |
| **Unified Login** | Valid credentials for Admin, Owner, User | Returns JWT, redirects to proper role dashboard | Verified |
| **Invalid Login** | Wrong password or nonexistent email | Returns 401 with descriptive error message | Verified |
| **Signup Validations** | Name < 20 chars or > 60 chars | Frontend prevents submit + Backend 400 error | Verified |
| **Signup Validations** | Password without uppercase or special char | Validation error displayed dynamically | Verified |
| **Signup Validations** | Address > 400 chars | Validation error prevents input overflow | Verified |
| **Password Change** | Correct old password + valid new password | Updates password_hash, succeeds | Verified |
| **Password Change** | Incorrect old password | Fails with 400 "Incorrect current password" | Verified |
| **Store Ratings** | User rates store (1-5) | Rating created, store average updates | Verified |
| **Rating Upsert** | User modifies rating for same store | Existing rating is updated, not duplicated | Verified |
| **Store Search** | Search by name substring & address substring | Results filter dynamically in real time | Verified |
| **Table Sorting** | Ascending & Descending by Name, Email, Address, Rating | Table rows reorder instantaneously | Verified |
| **Admin Metrics** | Total users, stores, ratings counts | Accurate counts matching database | Verified |
| **Admin Create Store** | Add store with name, email, address, owner | Appears in store directory and listings | Verified |
| **Admin Create User** | Add user with role (Admin, User, Store Owner) | Appears in user directory with correct role | Verified |
| **Admin Owner Rating** | View user list containing a Store Owner | Store Owner row displays their store rating | Verified |
| **Owner Dashboard** | Store Owner views customer feedback | Shows list of users and average rating | Verified |

---

## 2. Automated Test Suite
- Comprehensive automated test scripts in `server/tests/`:
  - `auth.test.js`: Register, login, token verification, password update, validation constraints.
  - `stores.test.js`: Store listing, search, sorting, rating submissions, rating modifications.
  - `admin.test.js`: Admin metrics, user creation, store creation, role authorization guards.
  - `owner.test.js`: Store owner stats, customer feedback isolation.

---

## 3. Quick Run & Evaluation Instructions
1. Clone / Open repository.
2. In root: Run setup script or:
   - In `server`: `npm install` -> `npx prisma db push` -> `node prisma/seed.js` -> `npm start`
   - In `client`: `npm install` -> `npm run dev`
3. Pre-seeded Demo Credentials:
   - **System Administrator**: `admin@roxiler.com` / `Admin@123`
   - **Store Owner**: `owner.john@freshmart.com` / `Owner@123`
   - **Normal User**: `alexandra.turner@example.com` / `User@123`
