import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container-max py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p>Last updated: July 11, 2025</p>
          <p>
            FitGear ("us", "we", or "our") operates the FitGear website (the "Service"). This page
            informs you of our policies regarding the collection, use, and disclosure of personal
            data when you use our Service and the choices you have associated with that data.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Information Collection and Use</h2>
          <p>
            We collect several different types of information for various purposes to provide and
            improve our Service to you.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-2">Types of Data Collected</h3>
          <h4>Personal Data</h4>
          <p>
            While using our Service, we may ask you to provide us with certain personally
            identifiable information that can be used to contact or identify you ("Personal Data").
            Personally identifiable information may include, but is not limited to:
          </p>
          <ul>
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
            <li>Cookies and Usage Data</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Use of Data</h2>
          <p>FitGear uses the collected data for various purposes:</p>
          <ul>
            <li>To provide and maintain the Service</li>
            <li>To notify you about changes to our Service</li>
            <li>
              To allow you to participate in interactive features of our Service when you choose to
              do so
            </li>
            <li>To provide customer care and support</li>
            <li>To provide analysis or valuable information so that we can improve the Service</li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us by email:
            support@fitgear.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
