import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { PRICE_ID, stripe } from '@/lib/stripe';
import { getSessionData } from '@/lib/action/getSession';


export async function POST(request) {
  const user = await getSessionData()
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const formData = await request.formData()
    const planId = formData.get('plan_id')
    const recipeId = formData.get('recipeId')
    const recipeName = formData.get('recipeName')
    const priceId = PRICE_ID[planId]
    // Create Checkout Sessions from body params.

    const metadata = {planId}
    if(recipeId !== "") {
      metadata.recipeId = recipeId
    }
     if(recipeName !== "") {
      metadata.recipeName = recipeName
    }
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: metadata,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}