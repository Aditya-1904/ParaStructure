// ============================================================
// PARASTRUCTURE — Payment Configuration
// 
// HOW TO GO LIVE:
// 1. Sign up at https://razorpay.com
// 2. Go to Dashboard → Settings → API Keys
// 3. Generate a Key ID and Key Secret
// 4. Replace 'YOUR_RAZORPAY_KEY_ID' below with your Key ID
// 5. Add RAZORPAY_KEY_SECRET=your_secret to .env.local
// ============================================================

export const PAYMENT_CONFIG = {
  // Replace this with your actual Razorpay Key ID
  razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'YOUR_RAZORPAY_KEY_ID',

  // Set to true once you have a real Razorpay Key ID
  isLive: !!(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID),

  currency: 'INR',
  company: 'Parastructure Pvt. Ltd.',
  logo: '/logo.png',

  // Contact for manual enrollment (shown when payment gateway is not live)
  whatsappNumber: '918001234567',
  supportEmail: 'admissions@parastructure.com',
};

export function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getEmiAmount(totalPrice, months) {
  return Math.ceil(totalPrice / months);
}
