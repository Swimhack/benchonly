import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe publishable key
export const stripePromise = loadStripe('pk_test_your_publishable_key');

export async function createSubscription(priceId: string) {
  try {
    const response = await fetch('/.netlify/functions/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}