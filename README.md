# IVY Hair Studio

A modern, responsive booking platform for IVY Hair Studio built with Next.js, featuring a beautiful UI and seamless appointment booking experience.

## 🌟 Features

- **Modern Design**: Clean, responsive UI built with Tailwind CSS and shadcn/ui components
- **Appointment Booking**: Complete booking system with service selection, date/time picker, and branch selection
- **User Authentication**: Secure authentication powered by Clerk
- **Responsive**: Optimized for desktop, tablet, and mobile devices
- **Form Handling**: Robust form validation with React Hook Form and Zod

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives with shadcn/ui
- **Authentication**: Clerk
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Package Manager**: Yarn 3.6.4

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **Yarn**: Version 3.6.4 or higher
- **Git**: For version control

You can check your versions by running:

```bash
node --version
yarn --version
git --version
```

## 🚀 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fe
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory and add your environment variables:

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # API Configuration
   NEXT_PUBLIC_API_URL=your_api_base_url

   # Add other environment variables as needed
   ```

4. **Run the development server**

   ```bash
   yarn dev
   ```

   The application will be available at [http://localhost:3001](http://localhost:3001)

## 🔧 Available Scripts

- `yarn dev` - Start the development server with Turbopack on port 3001
- `yarn build` - Build the application for production
- `yarn start` - Start the production server
- `yarn lint` - Run ESLint for code linting
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting without making changes

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (app-layout)/      # Main app layout group
│   │   ├── booking/       # Booking flow pages
│   │   ├── my-bookings/   # User bookings management
│   │   ├── services/      # Services pages
│   │   └── playground/    # Development playground
│   └── (auth-layout)/     # Authentication layout group
├── components/            # Reusable UI components
│   ├── booking/          # Booking-related components
│   ├── home/             # Homepage components
│   ├── layout/           # Layout components
│   ├── services/         # Services components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── providers/            # React context providers
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── public/               # Static assets
```

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components built on top of Radix UI primitives. The components are:

- Fully customizable and theme-aware
- Accessible by default
- Built with Tailwind CSS
- TypeScript ready

## 🔐 Authentication

User authentication is handled by [Clerk](https://clerk.com/), providing:

- Sign-up and sign-in flows
- Social login options (Google, Facebook)
- User profile management
- Session management

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-featured experience
- **Tablet**: Touch-optimized interface
- **Mobile**: Streamlined mobile experience

## 🚀 Deployment

1. **Build the application**

   ```bash
   yarn build
   ```

2. **Start the production server**
   ```bash
   yarn start
   ```

For deployment on platforms like Vercel, Netlify, or similar:

- Connect your repository
- Set environment variables
- The platform will automatically build and deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
