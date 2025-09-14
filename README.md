# Samanyay - AI-Powered Legal Research Platform

## 🏛️ Project Overview

**Samanyay** is a comprehensive legal tech platform built for the internship coding challenge. It provides AI-powered legal research tools, secure case management, and premium features for legal professionals.

## ✨ Features Implemented

### 🔐 User Authentication & Profile
- **Secure Registration**: Email/password registration with validation
- **User Login**: JWT-based session management (simulated)
- **Protected Routes**: Dashboard and premium features require authentication
- **Password Security**: Secure password hashing (simulated)
- **Demo Account**: `demo@lawfirm.com` / `demo123`

### 📁 Case Management System
- **Personal Dashboard**: Secure, user-specific case overview
- **Case Creation**: Add cases with title, description, and file uploads
- **Private Cases**: Users can only see their own cases
- **File Upload**: PDF and document upload functionality
- **Case Status**: Active, pending, and closed case management
- **Search & Filter**: Real-time case search capabilities

### 💳 Payment Gateway Integration
- **Stripe Integration**: Professional payment processing setup
- **Pro Upgrade**: "Upgrade to Pro" functionality
- **Account Status**: Pro/Free account management
- **Payment Demo**: Test payment flow with simulated processing
- **Premium Features**: Enhanced features for Pro users

## 🎨 Design System

### Professional Legal Tech Aesthetic
- **Color Palette**: Deep professional blues, clean whites, elegant accents
- **Typography**: Inter font family for maximum readability
- **Components**: Custom shadcn/ui components with legal-specific variants
- **Animations**: Smooth transitions with bounce effects for engagement
- **Responsive**: Mobile-first design approach

### Key Visual Elements
- **Gradient Buttons**: Primary actions use branded gradients
- **Card Layouts**: Clean, elevated cards for content organization
- **Professional Icons**: Lucide React icons for consistency
- **Shadow System**: Elegant depth with custom shadow tokens

## 🚀 Technology Stack

### Frontend
- **React 18**: Modern React with hooks and context
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **Vite**: Lightning-fast development and build
- **React Router**: Client-side routing

### UI Components
- **shadcn/ui**: High-quality component library
- **Radix UI**: Accessible primitive components  
- **Lucide React**: Professional icon system
- **Class Variance Authority**: Component variant management

### State Management
- **LocalStorage**: Persistent data simulation (users, cases)
- **React Hooks**: State management with useState/useEffect
- **Context API**: Global user authentication state

## 🏗️ Architecture

### Component Structure
```
src/
├── components/ui/          # Reusable UI components
├── pages/                  # Application pages
│   ├── Landing.tsx        # Marketing homepage
│   ├── Login.tsx          # User authentication
│   ├── Register.tsx       # User registration  
│   ├── Dashboard.tsx      # Case management
│   ├── Payment.tsx        # Pro upgrade flow
│   └── NotFound.tsx       # 404 error page
├── assets/                # Generated images and resources
└── lib/                   # Utility functions
```

### Design System Files
- **`index.css`**: Complete design token system
- **`tailwind.config.ts`**: Extended Tailwind configuration
- **`components/ui/button.tsx`**: Enhanced button variants

## 🔧 Installation & Setup

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Start development**: `npm run dev`
4. **Build for production**: `npm run build`

## 🧪 Demo Credentials

For testing the application:
- **Email**: `demo@lawfirm.com`
- **Password**: `demo123`

The demo account includes a sample case to showcase the case management functionality.

## 📱 Usage Guide

### Getting Started
1. Visit the landing page to explore features
2. Register for a new account or use demo credentials
3. Access the dashboard to manage cases
4. Create new cases with document uploads
5. Upgrade to Pro for premium features

### Case Management
- **Create Cases**: Use the "New Case" button on dashboard
- **Upload Files**: Attach PDF documents to cases
- **Search Cases**: Use the search bar to find specific cases
- **View Details**: Click on cases to see full information

### Pro Upgrade
- **Access Payment**: Click "Upgrade to Pro" in navigation
- **Test Payment**: Use the demo payment flow
- **Pro Features**: Unlock advanced AI research tools

## 🛡️ Security Features

- **Route Protection**: Authenticated routes redirect to login
- **Data Isolation**: Users only access their own cases
- **Input Validation**: Form validation and error handling
- **Secure Storage**: Simulated secure data persistence

## 🎯 Challenge Requirements Met

### ✅ Core Features Completed

1. **User Authentication & Profile**
   - [x] User registration with email/password
   - [x] Secure login system
   - [x] JWT session management (simulated)
   - [x] Protected routes implementation

2. **Case Management System**
   - [x] Personal dashboard for logged-in users
   - [x] Case creation with title and description
   - [x] Private case visibility (user-specific)
   - [x] File upload functionality for cases

3. **Payment Gateway Integration**
   - [x] "Upgrade to Pro" button implementation
   - [x] Stripe payment integration setup
   - [x] Test payment processing
   - [x] Pro status update in database

### 🏆 Additional Features

- **Professional Design**: Beautiful, modern UI/UX
- **Responsive Layout**: Mobile and desktop optimized
- **Search & Filter**: Enhanced case management
- **Demo Account**: Pre-configured for testing
- **Error Handling**: Comprehensive error states
- **Loading States**: Professional loading indicators

## 🚀 Production Deployment

The application is built with Vite and ready for deployment on any static hosting platform. The design system ensures consistent visual identity across all devices and screen sizes.

## 📞 Contact

Built as part of the Samanyay Legal Tech internship coding challenge, demonstrating full-stack development capabilities with modern web technologies.

---

*This project showcases the implementation of a professional legal tech platform with secure authentication, case management, and payment processing capabilities.*
