import React from 'react';

const TermsOfService = () => {
  return (
    <div className="container-max py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <div className="prose max-w-none">
          <p>Last updated: July 11, 2025</p>
          <p>
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using
            the FitGear website (the "Service") operated by FitGear ("us", "we", or "our").
          </p>
          <p>
            Your access to and use of the Service is conditioned on your acceptance of and
            compliance with these Terms. These Terms apply to all visitors, users, and others who
            access or use the Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Accounts</h2>
          <p>
            When you create an account with us, you must provide us with information that is
            accurate, complete, and current at all times. Failure to do so constitutes a breach of
            the Terms, which may result in immediate termination of your account on our Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain
            the exclusive property of FitGear and its licensors.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Links To Other Web Sites</h2>
          <p>
            Our Service may contain links to third-party web sites or services that are not owned or
            controlled by FitGear. FitGear has no control over, and assumes no responsibility for,
            the content, privacy policies, or practices of any third-party web sites or services.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Termination</h2>
          <p>
            We may terminate or suspend access to our Service immediately, without prior notice or
            liability, for any reason whatsoever, including without limitation if you breach the
            Terms.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us by email:
            support@fitgear.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
