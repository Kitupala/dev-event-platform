# DevEvent Platform

Event Platform built to manage and showcase events seamlessly. It features a dynamic home page displaying upcoming events, robust API routes for CRUD operations, Cloudinary-powered image uploads, detailed event pages with registration and similar event suggestions, and integrated analytics to track user engagement and optimize performance.

## ⚙️ Tech Stack
- [Cloudinary](https://cloudinary.com/) is a cloud-based media management platform that simplifies image and video uploads, storage, optimization, and delivery. It helps developers manage media efficiently and improve website performance.

- [CodeRabbit](https://www.coderabbit.ai) is a platform that accelerates development workflows by providing AI-powered coding assistance and project scaffolding, helping developers generate code and reduce repetitive tasks.

- [MongoDB](https://www.mongodb.com/) is a flexible, document-oriented NoSQL database that stores data in JSON-like format. It is ideal for modern applications that require scalability, high performance, and schema flexibility.

- [Mongoose](https://mongoosejs.com/) is an ODM (Object Data Modeling) library for MongoDB and Node.js. It provides a straightforward schema-based solution to model application data, validate inputs, and manage database interactions efficiently.

- [Next.js](https://nextjs.org/) is a powerful React framework for building full-stack web applications. It simplifies development with features like server-side rendering, static site generation, and API routes, enabling developers to focus on building products and shipping quickly.

- [PostHog](https://posthog.com/) is an open-source product analytics platform that tracks user interactions, funnels, and feature usage. It enables teams to understand user behavior, optimize features, and make data-driven decisions.

- [Tailwind CSS](https://tailwindcss.com/) is a utility-first CSS framework that allows developers to quickly build custom user interfaces with minimal custom CSS. It promotes consistency, responsiveness, and faster styling without leaving the HTML.

- [TypeScript](https://www.typescriptlang.org/) is a superset of JavaScript that adds static typing, providing better tooling, code quality, and error detection for developers. It is ideal for building large-scale applications and enhances the development experience.

- [Warp](https://www.warp.dev/) is a modern terminal designed for speed, collaboration, and usability. It enhances developer productivity with features like smart commands, workflows, and session sharing.

## ✨ Seeding events (CLI)

This repo includes a CLI seeder that loads `detailedEvents` from `lib/constants.ts` into MongoDB and uploads local images from `public/images` to Cloudinary.

Prerequisites: set `MONGODB_URI` and `CLOUDINARY_URL` in your environment.

```bash
# Preview what would be inserted/updated (no DB writes)
npm run seed:events:dry

# Seed the database (overwrites existing events by slug)
npm run seed:events
```
