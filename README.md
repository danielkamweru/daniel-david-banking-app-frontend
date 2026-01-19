

# BankApp

A modern, secure, and user-friendly banking application built with React. Manage your finances, transfer money, and track all your transactions in one place.

## Features

- **User Authentication:** Secure user registration and login functionality.
- **Dashboard:** A personalized overview of your financial status at a glance.
- **Account Management:** View and manage your different bank accounts.
- **Money Transfers:** Seamlessly transfer funds between accounts.
- **Transaction History:** A detailed log of all your past transactions for easy tracking.
- **User Settings:** Customize your account preferences and security settings.
- **Protected Routes:** Secure access to sensitive features like the dashboard and transfers, ensuring only logged-in users can access them.
- **Responsive Design:** A clean and intuitive interface that works seamlessly on desktop and mobile devices.
- **Notifications:** Automatic notifications for email confirmations on transactions and account creation.

## Installation

To get a local copy up and running, follow these simple steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/danielkamweru/daniel-david-banking-app-frontend.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd banking-app-frontend
   ```

3. **Install the required dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The application will open in your default browser at `http://localhost:5173` (Vite default).

## Project Structure

```
Banking-app-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   ├── axios.js          # Axios configuration for API calls
│   │   └── services.js       # API service functions
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation bar component
│   │   ├── ProtectedRoute.jsx # Route protection component
│   │   └── Sidebar.jsx       # Sidebar component
│   ├── context/
│   │   ├── AuthContext.jsx   # Authentication context
│   │   └── NotificationContext.jsx # Notification context
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Accounts.jsx
│   │   ├── Contact.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Settings.jsx
│   │   ├── Signup.jsx
│   │   ├── Transactions.jsx
│   │   └── Transfer.jsx
│   ├── router/
│   │   └── AppRouter.jsx      # Application routing
│   ├── store/
│   │   └── authStore.js       # Authentication store
│   ├── App.jsx                # Main application component
│   ├── index.css              # Global CSS styles
│   └── main.jsx               # Application entry point
├── .gitignore
├── index.html
├── LICENSE
├── package.json
├── README.md
└── vite.config.js
```

## Technologies Used

This project is built using the following core technologies:

- **React.js:** A popular JavaScript library for building user interfaces.
- **React Router:** A standard library for routing in React applications, enabling navigation between different pages.
- **Vite:** A fast build tool and development server.
- **Axios:** For making HTTP requests.
- **JavaScript (ES6+):** Utilizing modern JavaScript features for clean and efficient code.
- **Component-Based Architecture:** The application is structured with reusable and maintainable React components.

## Usage

1. **Homepage:** Visit the main landing page to learn about the app.
2. **Create an Account:** Click on "Signup" to register a new user account.
3. **Login:** Use your credentials to access your personal banking dashboard.
4. **Navigate:** Use the navigation menu to move between different sections:
   - **Dashboard:** Your financial hub.
   - **Accounts:** Manage your accounts.
   - **Transfer:** Send money to other accounts.
   - **Transactions:** View your complete transaction history.
   - **Settings:** Update your profile and security settings.
5. **Logout:** Securely log out of your session when you are finished.

## Authors

Developed by:
- Daniel Kamweru
- David Kuron

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.