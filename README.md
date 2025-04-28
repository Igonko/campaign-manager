# Campaign Manager Application

This application consists of a backend (BE) and a frontend (FE) for managing campaigns.

## Table of Contents

* [Project Description](#project-description)
* [Technologies Used](#technologies-used)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Backend Setup](#backend-setup)
    * [Frontend Setup](#frontend-setup)
* [Running the Application](#running-the-application)
    * [Running the Backend](#running-the-backend)
    * [Running the Frontend](#running-the-frontend)
* [Deployment](#deployment)
    * [Deployed URLs](#deployed-urls)
* [Contributing](#contributing)
* [License](#license)

## Project Description

The Campaign Manager Application allows users to manage campaigns.  It includes a backend for handling data and logic, and a frontend for the user interface.

## Technologies Used

* **Frontend (FE):**
    * Next.js 15.3.1
    * React 19.0.0
    * @tanstack/react-query 5.74.4
    * next-intl 4.1.0
    * Other libraries: clsx, postcss, react-dom, react-i18next, tailwindcss, typescript
* **Backend (BE):**
    * Hono 4.7.7
    * Cloudflare Workers
    * @hono/zod-openapi 0.19.5
    * hono-openapi 0.4.6
    * nanoid 5.1.5
    * swagger-ui 5.21.0
    * undici
    * zod 3.24.3

## Getting Started

### Prerequisites

* Node.js (version specified in `package.json` for FE)
* npm or yarn
* Wrangler (Cloudflare's CLI) for backend development

### Backend Setup

1.  Clone the repository.
2.  Navigate to the `backend` directory.
3.  Install dependencies:

    ```bash
    npm install
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory.
2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

## Running the Application

### Running the Backend

1.  Navigate to the `backend` directory.
2.  Start the development server:

    ```bash
    npm run dev
    ```

    This will start the backend server using Wrangler.

### Running the Frontend

1.  Navigate to the `frontend` directory.
2.  Start the development server:

    ```bash
    npm run dev
    ```

    This will start the Next.js development server.

## Deployment

### Deployed URLs

* Frontend: [https://campaign-manager-omega.vercel.app/en](https://campaign-manager-omega.vercel.app/en)

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## License

[Specify the license here]
