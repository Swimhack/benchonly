import React from 'react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using BenchOnly.com ("the Service"), you agree to be bound by these Terms of Service
                and all applicable laws and regulations. If you do not agree with any of these terms, you are
                prohibited from using the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
              <p className="text-gray-700 mb-4">
                Permission is granted to temporarily access the materials (information or software) on BenchOnly.com
                for personal, non-commercial viewing only. This is the grant of a license, not a transfer of title.
              </p>
              <p className="text-gray-700 mb-4">Under this license, you may not:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Transfer the materials to another person</li>
                <li>Attempt to decompile or reverse engineer any software</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Subscription and Payment</h2>
              <p className="text-gray-700 mb-4">
                Some features of the Service require a subscription. By subscribing, you agree to pay all fees in
                accordance with the pricing and payment terms presented to you for the subscription.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Content</h2>
              <p className="text-gray-700 mb-4">
                Users may post content as long as it isn't illegal, obscene, threatening, defamatory, invasive of
                privacy, infringing of intellectual property rights, or otherwise injurious to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Disclaimer</h2>
              <p className="text-gray-700 mb-4">
                The materials on BenchOnly.com are provided on an 'as is' basis. BenchOnly.com makes no warranties,
                expressed or implied, and hereby disclaims and negates all other warranties including, without
                limitation, implied warranties or conditions of merchantability, fitness for a particular purpose,
                or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitations</h2>
              <p className="text-gray-700 mb-4">
                In no event shall BenchOnly.com or its suppliers be liable for any damages (including, without
                limitation, damages for loss of data or profit, or due to business interruption) arising out of the
                use or inability to use the materials on BenchOnly.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Information</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms of Service, please contact us at:
                support@benchonly.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}