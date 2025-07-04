import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { priceId } = JSON.parse(event.body || '{}');
    const { user } = await supabase.auth.getUser(event.headers.authorization?.split(' ')[1] || '');

    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized' }),
      };
    }

    // Create or retrieve the customer
    const { data: customers } = await stripe.customers.search({
      query: `metadata['supabase_id']:'${user.id}'`,
    });

    let customerId: string;

    if (customers && customers.length > 0) {
      customerId = customers[0].id;
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_id: user.id,
        },
      });
      customerId = customer.id;
    }

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL}/programs`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error) {
    console.error('Subscription error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Failed to create subscription' }),
    };
  }
}