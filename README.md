# Vendor Management System

An enterprise-grade Vendor Management System frontend built as part of the **FieldNerve Product Engineer (Frontend) assessment**.

The application demonstrates scalable frontend architecture, reusable components, API integration, state management, responsive UI, form validation, vendor workflows, and performance-conscious React development.

---

## Live Demo

**Deployment:**  
https://vendor-management-system-eta.vercel.app/

## Repository

**GitHub:**  
https://github.com/SanjuRao470/vendor-management-system

---

# Overview

The Vendor Management System provides a centralized interface for managing vendors, monitoring vendor performance, handling approvals, tracking vendor-related activities, and viewing operational insights.

The application is designed with an **enterprise-oriented feature-based architecture** so that additional modules can be added without restructuring the existing application.

The implementation currently uses **Mock Service Worker (MSW)** to simulate REST APIs during development and deployment.

---

# Key Features

- Vendor dashboard with KPI metrics
- Vendor performance analytics
- Category-wise vendor distribution
- Vendor directory
- Search and filtering
- Sorting
- Pagination
- Responsive enterprise data table
- Vendor details
- Vendor performance tracking
- Purchase history
- Documents
- Payments
- Projects
- Issues
- Audit timeline
- Create Vendor form
- Form validation
- Vendor approval workflow
- Approve / Reject / Request Changes
- Comments
- Notifications
- Responsive desktop, laptop, and tablet experience
- Mock REST API integration
- Loading and error states
- Reusable components
- Feature-based architecture

---

# Technology Stack

## Frontend

- React 19
- Vite
- JavaScript (ES6+)
- Tailwind CSS

## State Management

- Redux Toolkit
- TanStack Query

## API Layer

- Axios
- Mock Service Worker (MSW)

## Forms & Validation

- React Hook Form
- Zod
- @hookform/resolvers

## Routing

- React Router

## Development Tools

- Git
- GitHub
- VS Code
- Vercel
- Oxlint

---

# Architecture

The application follows a **feature-based architecture**.

Instead of placing all components, API calls, hooks, and state into global folders, each business module owns its related UI, services, hooks, and state.

This makes the application easier to:

- Scale
- Maintain
- Test
- Debug
- Extend
- Onboard new developers

Example architecture:

```text
src/
│
├── app/
│   ├── store.js
│   └── queryClient.js
│
├── assets/
│
├── components/
│   ├── common/
│   ├── ui/
│   └── layout/
│
├── features/
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   │
│   ├── vendors/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   │
│   ├── vendor-details/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── hooks/
│   │
│   ├── vendor-performance/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── approvals/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   │
│   └── notifications/
│       ├── components/
│       ├── pages/
│       └── services/
│
├── layouts/
│   └── DashboardLayout.jsx
│
├── mocks/
│   ├── browser.js
│   ├── handlers/
│   └── data/
│
├── services/
│   └── apiClient.js
│
├── hooks/
│
├── routes/
│
├── utils/
│
├── constants/
│
├── App.jsx
└── main.jsx

⚙️  Setup Instructions
1. Clone the repository
git clone <your-github-repository-url>
2. Navigate to the project
cd vendor-management-system
3. Install dependencies
npm install
4. Configure environment variables

Create:

.env.local

Add:

VITE_API_BASE_URL=/api

For the current MSW-based local setup, /api is used as the API base path.

5. Start the development server
npm run dev

The application will be available at:

http://localhost:5173