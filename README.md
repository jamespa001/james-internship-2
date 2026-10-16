![Summarist CI](https://github.com/jamespa001/james-internship-2/actions/workflows/ci.yml/badge.svg)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://james-internship-2.vercel.app/)

# 📚 Summarist (Audio Book Summary SaaS Application)

[**🌐 View Live Platform**](https://james-internship-2.vercel.app/) | [**🛠️ GitHub Repository**](https://github.com/jamespa001/james-internship-2)

A full-stack SaaS web application delivering concise book summaries and audio highlights, engineered with **Next.js App Router**, **TypeScript**, **Redux Toolkit**, **Firebase Auth & Firestore**, and **Stripe Payment Processing**.

---

## 🛠️ Engineering Highlights & Architecture

- **Problem & Context:** Digital subscription platforms require seamless access control, persistent audio player states across page navigations, and reliable real-time webhook listeners for subscription upgrades.
- **Key Technical Decisions:**
  - Built using the **Next.js App Router** with **TypeScript** and centralized global audio player state using **Redux Toolkit**.
  - Integrated **Firebase Authentication** and **Firestore** for real-time user profile state management and bookmark synchronization.
  - Implemented **Stripe Checkout** and serverless webhook handlers to gate premium audio content behind active subscription tiers dynamically.
- **Results & Metrics:**
  - ⚡ Seamless audio playback persistence across client-side route transitions.
  - 🔒 Secure server-side paywall gating for premium subscriber features.
  - 🚀 Continuous integration and deployment pipeline verified via **GitHub Actions** and **Vercel**.

---

## ✨ Key Features

- **Book Summaries & Audio Player**: Custom interactive audio player interface with speed controls, progress tracking, and chapter navigation.
- **Subscription Paywall & Auth**: Dynamic tier-based access control, Stripe checkout flow, and Firebase authentication.
- **Personalized Library**: Real-time bookmarking and reading list persistence backed by Firestore.
- **Responsive Architecture**: Mobile-first responsive layout optimized for seamless reading and listening on all screen sizes.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router), React, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Authentication & Database**: Firebase Auth & Firestore
- **Payments**: Stripe API & Webhooks
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

---

## 🚀 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/jamespa001/james-internship-2.git](https://github.com/jamespa001/james-internship-2.git)
   cd james-internship-2
   ```
