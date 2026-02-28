At RudrX Techlabs, Its less about how you code and it’s more about how you solve and think

Build Your Brand:
72-Hour Practical MERN Assignment

1. The Story
   Imagine you are launching your own digital brand.
   You are not just a developer anymore - you are the founder of a small e-commerce startup. You must build your own product, define your identity, design your experience, and make your first real sale.
   Over the next 48 hours, your mission is to build a fully functional brand-driven product platform using the MERN stack.
   This is not just about writing code. This is about building something you are proud to put your name on.
   Welcome to “Build Your Brand.”

2. The Mission
   Create a full-stack MERN application that:
   Allows Admin to create and manage products

Manages inventory and tracks sales

Allows Users to browse and purchase products

Integrates Stripe (Test Mode) for payments

Is deployed live

Reflects your own branding and design thinking

You are free to choose:
The type of product (digital goods, clothing, gadgets, art, etc.)

Brand name

Design language

Theme and identity

This is your startup.

3. Core Requirements

3.1 Authentication & Roles
Implement secure authentication using JWT.
Roles:
Admin

User

Required Features:
Admin
Add product

Edit product

Delete product

Manage inventory

View sales analytics (basic total sales + total revenue)

User
Register / Login

View product list

View individual product page

Purchase product via Stripe (Test Mode)

View order history

3.2 Product Management

Each product must include:
Title

Description

Price

Category

Stock Quantity

Product Image

CreatedAt / UpdatedAt

Product Capabilities:
Pagination

Search by title

Filter by category

Sort by price

Real-time stock deduction after purchase

Filtering & sorting must be handled at the database query level, not frontend-only.

3.3 Inventory & Sales System
You must implement:
Stock reduction after successful payment

Prevent purchase if stock is 0

Sales tracking

Total revenue calculation

Admin view to monitor sales

Bonus (optional but appreciated):
Low stock indicator

Basic dashboard stats

3.4 Stripe Integration (Required)
You must integrate:
Stripe in Test Mode

Secure checkout flow

Payment confirmation handling

Webhook or post-payment verification logic

Stripe test card must work correctly.
Improper or fake payment logic = automatic rejection.

3.5 Frontend (React)
Must include:
Landing page

Product listing page

Individual product page

Authentication pages

Admin dashboard

Clean routing structure

Requirements:
Functional components

React Hooks

Clean folder structure

Proper state management (Redux)

API integration using Axios or Fetch

No pre-built admin templates.
You are free to use UI libraries - but your design thinking matters.

4. Branding & Design Freedom
   You have complete creative freedom.
   Choose:
   Your brand name

Logo (simple is fine)

Theme colors

Typography

Visual direction

Important: UI/UX is part of evaluation.
A functional but poorly designed experience will score lower.
We are evaluating:
Layout clarity

Responsiveness

Accessibility basics

Usability

Visual consistency

5. Technical Expectations
   Backend
   Clean folder structure

Proper middleware usage

Schema validation

Indexing where appropriate

Secure environment variable handling

Input validation

Proper error handling

Security
You must implement at least one of:
Rate limiting

Helmet

Input sanitization

Proper CORS configuration

Secure password hashing

Explain your choice in documentation.

6. Performance Consideration (Required)
   Add at least one meaningful optimization such as:
   Debounced search

Efficient query handling

Lean queries

Memoization

Proper pagination logic

Explain what you optimized and why.

7. Mandatory Walkthrough Video
   Record a 5-10 minute video where you:
   Show your working application

Explain your architecture

Walk through important code sections

Explain one technical decision you made

Demonstrate Stripe test payment

Upload the video and share the link.

8. Deployment (Required)
   You must deploy:
   Frontend (Vercel / Netlify or similar)

Backend (Render / Railway / similar)
Application must be fully working on live URLs.

9. Submission Requirements
   You must submit:
   GitHub repository link (with proper commit history - minimum 8 meaningful commits)

Live deployed URLs (Frontend + Backend)

Recorded video link (YouTube Unlisted)

README file including:

Setup instructions

Environment variables required

Stripe test card details

A file named Technical-Decisions.md explaining:

Architecture choices

Auth design decisions

Tradeoffs made

What you would improve with more time

10. Final Note
    AI tools are powerful.
    Templates are everywhere.
    Stripe tutorials are public.
    But clarity of thought, architecture decisions, real understanding, and product thinking cannot be faked.
    Build something you would proudly ship.
    This is not just an assignment.
    This is your brand.
    Good luck.
