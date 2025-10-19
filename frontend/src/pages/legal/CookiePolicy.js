import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="container-max py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
        <div className="prose max-w-none">
          <p>Last updated: July 11, 2025</p>
          <p>
            FitGear ("us", "we", or "our") uses cookies on the FitGear website (the "Service"). By
            using the Service, you consent to the use of cookies.
          </p>
          <p>
            Our Cookie Policy explains what cookies are, how we use cookies, how third-parties we
            may partner with may use cookies on the Service, your choices regarding cookies and
            further information about cookies.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">What are cookies</h2>
          <p>
            Cookies are small pieces of text sent by your web browser by a website you visit. A
            cookie file is stored in your web browser and allows the Service or a third-party to
            recognize you and make your next visit easier and the Service more useful to you.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">How FitGear uses cookies</h2>
          <p>
            When you use and access the Service, we may place a number of cookies files in your web
            browser. We use cookies for the following purposes: to enable certain functions of the
            Service, to provide analytics, to store your preferences.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">What are your choices regarding cookies</h2>
          <p>
            If you'd like to delete cookies or instruct your web browser to delete or refuse
            cookies, please visit the help pages of your web browser.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Cookie Policy, please contact us by email:
            support@fitgear.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
