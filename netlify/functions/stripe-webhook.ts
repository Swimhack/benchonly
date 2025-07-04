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
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body || '',
      event.headers['stripe-signature'] || '',
      webhookSecret || ''
    );

    const { object } = stripeEvent.data;

    switch (stripeEvent.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        if ('customer' in object && 'status' in object) {
          const subscription = object as Stripe.Subscription;
          const customer = await stripe.customers.retrieve(subscription.customer as string);
          
          if ('metadata' in customer && customer.metadata?.supabase_id) {
            await supabase
              .from('subscriptions')
              .upsert({
                user_id: customer.metadata.supabase_id,
                stripe_customer_id: subscription.customer as string,
                stripe_subscription_id: subscription.id,
                status: subscription.status,
                current_period_end: new Date(subscription.current_period_end * 1000),
              });
          }
        }
        break;

      case 'customer.subscription.deleted':
        if ('customer' in object) {
          const subscription = object as Stripe.Subscription;
          const customer = await stripe.customers.retrieve(subscription.customer as string);
          
          if ('metadata' in customer && customer.metadata?.supabase_id) {
            await supabase
              .from('subscriptions')
              .update({
                status: 'canceled',
                current_period_end: new Date(subscription.current_period_end * 1000),
              })
              .eq('stripe_subscription_id', subscription.id);
          }
        }
        break;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Webhook error' }),
    };
  }
}