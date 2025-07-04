import React from 'react';
import { X } from 'lucide-react';
import { createSubscription } from '../lib/stripe';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SubscriptionModal({ isOpen, onClose, onSuccess }: SubscriptionModalProps) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);
    try {
      const { sessionId } = await createSubscription('price_your_price_id');
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) throw error;
      
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Premium Membership</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium text-gray-900">Monthly Plan</span>
              <span className="text-2xl font-bold text-gray-900">$50</span>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Access to all training programs</li>
              <li>✓ Progress tracking tools</li>
              <li>✓ Community features</li>
              <li>✓ Cancel anytime</li>
            </ul>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Subscribe Now'}
          </button>

          <p className="text-sm text-gray-500 text-center">
            Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
}