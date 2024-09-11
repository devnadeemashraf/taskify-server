# 🚀 Taskify Server

[![Build](https://github.com/devnadeemashraf/taskify-server/actions/workflows/build.yml/badge.svg)](https://github.com/devnadeemashraf/taskify-server/actions/workflows/build.yml)
[![Test](https://github.com/devnadeemashraf/taskify-server/actions/workflows/test.yml/badge.svg)](https://github.com/devnadeemashraf/taskify-server/actions/workflows/test.yml)
[![Code Quality](https://github.com/devnadeemashraf/taskify-server/actions/workflows/code-quality.yml/badge.svg)](https://github.com/devnadeemashraf/taskify-server/actions/workflows/code-quality.yml)
[![Docker Image CI](https://github.com/devnadeemashraf/taskify-server/actions/workflows/docker-image.yml/badge.svg)](https://github.com/devnadeemashraf/taskify-server/actions/workflows/docker-image.yml)

## 🌟 Introduction

This is "Taskify" – a streamlined, efficient, scalable and powerful backend services with modern tools and practices in Express and TypeScript.

## 🚀 Features

- 📁 Modular Structure: Organized by feature for easy navigation and scalability
- 💨 Faster Execution with tsx: Rapid TypeScript execution with `tsx` and type checking with `tsc`
- 🌐 Stable Node Environment: Latest LTS Node version in `.nvmrc`
- 🔧 Simplified Environment Variables: Managed with Envalid
- 🔗 Path Aliases: Cleaner code with shortcut imports
- 🔄 Renovate Integration: Automatic updates for dependencies
- 🔒 Security: Helmet for HTTP header security and CORS setup
- 📊 Logging: Efficient logging with `pino-http`
- 🧪 Comprehensive Testing: Setup with Vitest and Supertest
- 🔑 Code Quality Assurance: Husky and lint-staged for consistent quality
- ✅ Unified Code Style: `Biomejs` for consistent coding standards
- 📃 API Response Standardization: `ServiceResponse` class for consistent API responses
- 🐳 Docker Support: Ready for containerization and deployment
- 📝 Input Validation with Zod: Strongly typed request validation using `Zod`
- 🧩 Swagger UI: Interactive API documentation generated from Zod schemas

## 🛠️ Getting Started

### Step-by-Step Guide

#### Step 1: 🚀 Initial Setup

- Clone the repository: `git clone https://github.com/devnadeemashraf/taskify-server.git`
- Navigate: `cd taskify-server`
- Install dependencies: `npm ci`

#### Step 2: ⚙️ Environment Configuration

- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables

#### Step 3: 🏃‍♂️ Running the Project

- Development Mode: `npm run dev`
- Building: `npm run build`
- Production Mode: Set `.env` to `NODE_ENV="production"` then `npm run build && npm run start`

## 🤝 Feedback and Contributions

We'd love to hear your feedback and suggestions for further improvements. Feel free to contribute and join us in making backend development cleaner and faster!

🎉 Happy coding!
