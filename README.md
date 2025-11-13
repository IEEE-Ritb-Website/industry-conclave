# Industry Conclave 2025 - Tech Innovation Summit

A stunning, modern Next.js website for a premier technology conference with immersive 3D animations and cutting-edge design.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS and shadcn/ui components
- **Registration System**: Complete user registration with form validation
- **Payment Integration**: Razorpay integration for secure online payments (₹350)
- **Email Confirmations**: Automated confirmation emails via SendGrid
- **Admin Dashboard**: Protected admin panel to view and manage registrations
- **Database**: Prisma ORM with SQLite for data persistence
- **Type Safety**: Full TypeScript implementation with Zod validation

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Forms**: React Hook Form with Zod validation
- **Database**: Prisma ORM with SQLite
- **Payments**: Razorpay integration
- **Email**: SendGrid API
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Notifications**: Sonner toast library

## 📁 Project Structure

```
src/
 ├── app/
 │    ├── page.tsx                 # Landing page
 │    ├── register/page.tsx        # Registration form
 │    ├── success/page.tsx         # Post-payment success page
 │    ├── admin/page.tsx           # Admin dashboard
 │    └── api/
 │         ├── register/route.ts   # Registration API
 │         ├── payment/verify/route.ts # Payment verification
 │         └── admin/registrations/route.ts # Admin API
 │
 ├── components/
 │    ├── ui/                      # shadcn/ui components
 │    ├── forms/
 │    │    └── RegisterForm.tsx    # Registration form component
 │    ├── layout/
 │    │    └── Navbar.tsx, Footer.tsx
 │    └── shared/
 │         └── ToastProvider.tsx
 │
 ├── lib/
 │    ├── sendgrid.ts              # Email sending logic
 │    ├── razorpay.ts              # Razorpay integration
 │    ├── validations.ts           # Zod schemas
 │    ├── utils.ts                 # Helper functions
 │    └── prisma.ts                # Prisma client
 │
 ├── prisma/
 │    └── schema.prisma            # Database schema
 │
 └── styles/
      └── globals.css              # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd conclave
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your actual credentials:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   
   # Razorpay Configuration
   RAZORPAY_KEY_ID="your_razorpay_key_id"
   RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
   NEXT_PUBLIC_RAZORPAY_KEY_ID="your_razorpay_key_id"
   
   # SendGrid Configuration
   SENDGRID_API_KEY="your_sendgrid_api_key"
   FROM_EMAIL="noreply@youreventsite.com"
   
   # Admin Password
   ADMIN_PASSWORD="your_secure_password"
   NEXT_PUBLIC_ADMIN_PASSWORD="your_secure_password"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Razorpay Setup

1. Create a Razorpay account at [razorpay.com](https://razorpay.com)
2. Get your API keys from the Razorpay dashboard
3. Add the keys to your `.env.local` file

### SendGrid Setup

1. Create a SendGrid account at [sendgrid.com](https://sendgrid.com)
2. Generate an API key
3. Verify your sender email/domain
4. Add the API key to your `.env.local` file

## 📱 Pages & Features

### Landing Page (`/`)
- Hero section with event details
- About section with event highlights
- Interactive schedule (Day 1/Day 2)
- Featured speakers section
- FAQ section
- Contact form
- Call-to-action for registration

### Registration Page (`/register`)
- Comprehensive registration form
- Real-time validation with error messages
- Integrated Razorpay payment
- Loading states and error handling
- Mobile-responsive design

### Success Page (`/success`)
- Payment confirmation
- Registration details
- Event information
- Next steps and what to bring
- Download ticket option

### Admin Dashboard (`/admin`)
- Password-protected admin access
- Registration statistics
- Search and filter functionality
- Export to CSV feature
- Payment status tracking

## 🎨 Design System

- **Primary Colors**: Indigo and Purple gradients
- **Border Radius**: Consistent 2xl (16px) rounded corners
- **Typography**: Clean, modern font hierarchy
- **Components**: Reusable shadcn/ui components
- **Responsive**: Mobile-first design approach

## 🔒 Security Features

- Input validation with Zod schemas
- SQL injection prevention with Prisma ORM
- Payment signature verification
- Admin route protection
- Environment variable security

## 📊 Database Schema

The application uses two main models:

1. **Registration**: Stores user information
   - id, fullName, email, college, phone
   - Timestamps for tracking

2. **Payment**: Handles payment information
   - Links to registration
   - Razorpay order/payment IDs
   - Payment status tracking

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

```env
DATABASE_URL="your_production_database_url"
NEXT_PUBLIC_BASE_URL="https://yourdomain.com"
RAZORPAY_KEY_ID="your_production_razorpay_key"
RAZORPAY_KEY_SECRET="your_production_razorpay_secret"
NEXT_PUBLIC_RAZORPAY_KEY_ID="your_production_razorpay_key"
SENDGRID_API_KEY="your_production_sendgrid_key"
FROM_EMAIL="your_verified_sender_email"
ADMIN_PASSWORD="your_secure_admin_password"
NEXT_PUBLIC_ADMIN_PASSWORD="your_secure_admin_password"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For any issues or questions:
- Email: info@techconclave.com
- Phone: +91 98765 43210

---

Built with ❤️ for the tech community