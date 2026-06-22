import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PRICE_ID = {
'Recipehub_Premium' : 'price_1Tl8sNFjCEcL1wHZGZbtBTMy'
}