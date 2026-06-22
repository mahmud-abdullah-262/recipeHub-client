import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const status = session.status
  const customerEmail = session.customer_details?.email

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <section className="min-h-screen flex items-center justify-center bg-background px-4 antialiased">
        {/* Main Card Container */}
        <div className="max-w-md w-full text-center p-8 rounded-2xl border border-default-100 bg-content1 shadow-xl transition-all duration-300">
          
          {/* Success Checkmark Icon (HeroUI/GravityUI style) */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-success-50 dark:bg-success-950/30 text-success mb-6">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Typography / Headings */}
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-3">
            Payment Successful!
          </h1>
          
          <p className="text-default-500 text-sm mb-6 leading-relaxed">
            Thank you for your business. A confirmation email will be sent to: <br />
            <span className="font-semibold text-foreground mt-1 inline-block">{customerEmail}</span>
          </p>

          <hr className="border-default-100 my-6" />

          {/* Support Info */}
          <p className="text-xs text-default-400 mb-8">
            If you have any questions, please email us at:{' '}
            <a 
              href="mailto:orders@example.com" 
              className="text-primary hover:underline font-medium transition-colors"
            >
              orders@example.com
            </a>
          </p>

          {/* Action Button */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center h-11 px-6 font-medium text-small rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </section>
    )
  }
}