# Mini Groww Frontend

A modern, high-performance stock trading simulator frontend built with React, TypeScript, and Vite. This application replicates core features of the Groww investment platform, offering real-time stock data visualization, portfolio management, and trading capabilities.

## 🚀 Tech Stack

-   **Core:** [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/), [Tailwind Merge](https://github.com/dcastil/tailwind-merge), [Class Variance Authority](https://cva.style/)
-   **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/), [TanStack Query](https://tanstack.com/query/latest)
-   **Forms & Validation:** [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
-   **UI Components:** [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
-   **Charts:** [Recharts](https://recharts.org/)
-   **Networking:** [Axios](https://axios-http.com/), [Socket.io-client](https://socket.io/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js**: v18.0.0 or higher
-   **npm**: v9.0.0 or higher (usually comes with Node.js)

## 🛠️ Project Setup

Follow these steps to get the project running locally:

1.  **Clone the repository**

    ```bash
    git clone https://github.com/shivamvishwakarm/mini-groww-fe
    cd fintech-clone/frontend
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables**

    Create a `.env` file in the root directory by copying the example file:

    ```bash
    cp .env.example .env
    ```

    Ensure the `VITE_API_BASE_URL` in `.env` points to your running backend service (default is `http://localhost:3000`).

4.  **Start the Development Server**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## 📜 Available Scripts

-   `npm run dev`: Starts the development server with HMR.
-   `npm run build`: Type-checks and builds the application for production.
-   `npm run lint`: Runs ESLint to check for code quality issues.
-   `npm run preview`: Locally previews the production build.
