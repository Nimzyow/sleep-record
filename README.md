# Project Name

## Table of Contents
- [Project Name](#project-name)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Tech Stack](#tech-stack)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Tooling](#tooling)
  - [Directory Structure](#directory-structure)
  - [Getting Started](#getting-started)
    - [With Docker Compose](#with-docker-compose)
  - [Without Docker Compose](#without-docker-compose)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
  - [Seeding the Database](#seeding-the-database)
    - [Seeding with docker compose](#seeding-with-docker-compose)
    - [Seeding without docker compose](#seeding-without-docker-compose)
    - [Pre-Push Hook](#pre-push-hook)
    - [Notes](#notes)
    - [Why This Tech Stack](#why-this-tech-stack)
    - [Future Enhancements](#future-enhancements)

## Introduction
This is a full-stack project built using Node.js and TypeScript. The backend is a GraphQL server built with Apollo Server, TypeScript, and Prisma ORM, while the frontend is a Next.js application that interacts with the backend using Apollo Client. The project is fully containerized using Docker Compose, making it easy to set up and run in any environment.

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **TypeScript**: Superset of JavaScript that adds static typing
- **Apollo Server**: GraphQL server implementation
- **Prisma**: ORM for database interaction
- **SQLite**: Database for local development

### Frontend
- **Next.js**: React framework with server-side rendering
- **TypeScript**: Superset of JavaScript that adds static typing
- **Apollo Client**: GraphQL client for React applications
- **Codegen**: Generates TypeScript types from GraphQL schema

### Tooling
- **Docker Compose**: To containerize and orchestrate the services
- **Pre-Push Hook**: Triggers Codegen and TypeScript type checks before code is pushed

## Directory Structure

```bash
/backend
├── src/
├── prisma/
├── Dockerfile
├── package.json
└── tsconfig.json
/frontend
├── pages/
├── components/
├── Dockerfile
├── package.json
└── tsconfig.json
docker-compose.yml
README.md
```

## Getting Started

### With Docker Compose
To start the project using Docker Compose, run the following command from the root of the project:

```bash
docker-compose up --build
```

Backend GraphQL Server: http://localhost:4000<br/>
Frontend Next.js App: http://localhost:3000

## Without Docker Compose
###  Backend
1 - Navigate to the backend directory:
```bash
cd backend
```
2 - Install dependencies:
```bash
yarn install
```
3 - Generate Prisma client:
```bash
npx prisma generate
```
4 - Apply migrations:
```bash
npx prisma migrate dev
```
5 - Start the development server:
```bash
yarn run dev
```
### Frontend
1 - Navigate to the frontend directory:
```bash
cd frontend
```
2 - Install dependencies:
```bash
yarn install
```
3 - Start the development server:
```bash
yarn dev
```
## Seeding the Database

### Seeding with docker compose

Find the backend container name using docker ps.
Run the following command:
```bash
docker exec -it <container-name> /bin/sh
```
Inside the container, run:
```bash
yarn run seed
```

### Seeding without docker compose

cd into backend directory
```bash
yarn run seed
```

### Pre-Push Hook
This project has a pre-push hook set up that automatically runs code generation and TypeScript type checks before any code is pushed to the repository. This ensures that the frontend TypeScript types are always in sync with the backend GraphQL schema.

### Notes
Tests are not complete yet but are currently being worked on.
Consider adding CI/CD pipelines to automate testing and deployment.
Explore using other databases for production environments.
### Why This Tech Stack
I chose this tech stack for several reasons:

* TypeScript: Provides strong typing, which helps catch errors early in the development process.
* GraphQL with Apollo: Enables flexible and efficient data fetching. It allows the frontend to request only the data it needs.
* Prisma ORM: Simplifies database access and migrations, and it integrates well with TypeScript.
* Next.js: Offers server-side rendering, which improves performance and SEO for the frontend.
* Docker Compose: Simplifies the setup process by containerizing the frontend and backend, ensuring a consistent development environment.

### Future Enhancements
* Complete the testing suite for both backend and frontend.
* Add user authentication and authorization.
* Implement CI/CD pipelines.
* Optimize Dockerfile for smaller image sizes.