# Travel Agency Management Dashboard

A comprehensive management dashboard for travel agencies to handle bookings, customers, and business analytics.

## Features

### 📖 Bookings Management
- View all bookings with details (PNR, journey date, booking date, passenger name, portal, airports, flight details, costing)
- Track booking sources and financial metrics
- Search/filter bookings by various parameters

### 🎫 PNR Generation System
- Generate PNRs for group bookings
- Custom ticket creation interface
- Download generated tickets (PDF/HTML)

### 👥 Customer Management
- Maintain customer database with travel documents
- Store passport/visa details with expiry dates
- Quick access to customer travel history

### 📊 Analytics Dashboard
**Sales Tab**
- 30-day revenue & tickets sold
- Most used airlines
- 6-month sales chart
- Recent bookings list

**Profit Tab**
- 30-day net profit & margin
- Most visited destinations
- 6-month profit chart
- Airlines ticket distribution radar

## Technologies Used
- **Framework**: Next.js (App Router)
- **Authentication**: NextAuth with Google OAuth
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Drizzle ORM
- **Hosting**: Neon.tech (Serverless PostgreSQL)
- **APIs**: RapidAPI (Airport data)
- **UI Components**: Shadcn + Custom components

## Installation

1. Clone the repository
   ```bash
   git clone [https://github.com/devinsomniac/IrfEx-Dashboard]
   ```
2. Install dependencies
    ```bash
   npm install
   ```
3. Set up environment variables (create .env file):
    ```bash
    DATABASE_URL=your_neon_connection_string
    NEXTAUTH_SECRET=your_secret_key
    GOOGLE_CLIENT_ID=your_google_oauth_id
    GOOGLE_CLIENT_SECRET=your_google_oauth_secret
    RAPIDAPI_KEY=your_rapidapi_key
   ```
4. Run database migrations
    ```bash
   npx drizzle-kit push
   ```
5. Start development server
    ```bash
    npm run dev
    ```   
## Configuration
- **Required Environment Variables
- **DATABASE_URL: Neon.tech PostgreSQL connection string
- **NEXTAUTH_URL: Base URL of your application
- **NEXTAUTH_SECRET: Random secret for session encryption
- **GOOGLE_CLIENT_ID: Google OAuth client ID
- **GOOGLE_CLIENT_SECRET: Google OAuth client secret
- **RAPIDAPI_KEY: Key for RapidAPI airport data

## Authentication Setup
- **Enable Google OAuth in Google Cloud Console
- **Add authorized redirect URIs:
```bash
http://localhost:3000/api/auth/callback/google (dev)
```
```
[production-domain]/api/auth/callback/google
```

## Usage
- **Access Control
- **Only pre-authorized users can login

## Main Features
- **/bookings: Manage all bookings

![Alt text](/public/booking.png)

- **/generate-pnr: Create group booking tickets
![Alt text](/public/generate.png)

- **/dashboard: View sales & profit analytics
![Alt text](/public/sales.png)
![Alt text](/public/profit.png)

- ** Authentication
![Alt text](/public/auth.png)



## Acknowledgments
- **Airport data provided by RapidAPI
- **UI components using Shadcn
- **Database powered by Neon.tech