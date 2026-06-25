import { getSessionData } from "@/lib/action/getSession"
import { postSubs } from "@/lib/action/postSubs"
import { stripe } from "@/lib/stripe"
import Link from "next/link"

export default async function Success({ searchParams }) {
  const user = await getSessionData()
  const customerEmail = user.email
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  // ১. স্ট্রাইপ সেশন রিট্রিভ করা (আপনার কোডটিই থাকছে)
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const { status, metadata, payment_status } = session

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {

    // ২. প্রয়োজনীয় নতুন ডাটাগুলো স্ট্রাইপ অবজেক্ট থেকে বের করা
    const amount = session.amount_total / 100; // স্ট্রাইপ সেন্টে হিসাব করে, তাই ১০০ দিয়ে ভাগ করে ডলারে/টাকায় নেওয়া হলো
    const currency = session.currency.toUpperCase();
    const paymentStatus = payment_status; // 'paid', 'unpaid' ইত্যাদি
    const transactionId = session.payment_intent?.id; // Transaction ID (pi_...)
    const paymentDate = new Date(session.created * 1000).toLocaleString(); // Unix timestamp থেকে সুন্দর ডেট ফরম্যাট

  
    const subsInfo = {
      customerEmail: customerEmail,
      planId: metadata.planId,
      amount: amount,                 
      currency: currency,             
      paymentStatus: paymentStatus,  
      transactionId: transactionId,  
      paymentDate: paymentDate,
      sessionId: session_id,      
    }

    if (metadata.recipeId !== "") {
      subsInfo.recipeId = metadata.recipeId
    }

    if (metadata.recipeName !== "") {
      subsInfo.recipeName = metadata.recipeName
    }

    // আপনার ডাটাবেজ ফাংশন
    const submit = await postSubs('/api/subs', subsInfo);

    return (
      <section className="min-h-screen flex items-center justify-center bg-background px-4 antialiased">
        <div className="max-w-md w-full text-center p-8 rounded-2xl border border-default-100 bg-content1 shadow-xl transition-all duration-300">
          
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-success-50 dark:bg-success-950/30 text-success mb-6">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-3">
            Payment Successful!
          </h1>
          
          <p className="text-default-500 text-sm mb-6 leading-relaxed">
            Thank you for your business. A confirmation email will be sent to: <br />
            <span className="font-semibold text-foreground mt-1 inline-block">{customerEmail}</span>
          </p>

          {/* ৪. UI-তে ইউজারকে পেমেন্ট রিসিট দেখানো (ঐচ্ছিক কিন্তু দারুণ দেখাবে) */}
          <div className="bg-default-50 dark:bg-default-100/50 p-4 rounded-xl text-left text-sm mb-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-default-400">Transaction ID:</span>
              <span className="font-mono text-xs text-foreground font-semibold">{transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-400">Amount Paid:</span>
              <span className="font-semibold text-foreground">{amount} {currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-400">Date:</span>
              <span className="text-foreground">{paymentDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-400">Status:</span>
              <span className="text-success font-semibold capitalize">{paymentStatus}</span>
            </div>
          </div>

          <hr className="border-default-100 my-6" />

          <p className="text-xs text-default-400 mb-8">
            If you have any questions, please email us at:{' '}
            <a href="mailto:orders@example.com" className="text-primary hover:underline font-medium transition-colors">
              orders@example.com
            </a>
          </p>

          <div className="flex flex-col gap-3">
            <Link href="/" className="inline-flex items-center justify-center h-11 px-6 font-medium text-small rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all">
              Return to Homepage
            </Link>
          </div>
        </div>
      </section>
    )
  }
}