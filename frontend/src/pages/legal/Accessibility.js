import React from 'react';

const Accessibility = () => {
  return (
    <div className="container-max py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Accessibility Statement</h1>
        <div className="prose max-w-none">
          <p>Last updated: July 11, 2025</p>
          <p>
            FitGear is committed to ensuring digital accessibility for people with disabilities. We
            are continually improving the user experience for everyone, and applying the relevant
            accessibility standards.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Conformance status</h2>
          <p>
            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and
            developers to improve accessibility for people with disabilities. It defines three
            levels of conformance: Level A, Level AA, and Level AAA. FitGear is partially conformant
            with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not
            fully conform to the accessibility standard.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Feedback</h2>
          <p>
            We welcome your feedback on the accessibility of FitGear. Please let us know if you
            encounter accessibility barriers on FitGear:
          </p>
          <ul>
            <li>E-mail: support@fitgear.com</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Technical specifications</h2>
          <p>
            Accessibility of FitGear relies on the following technologies to work with the
            particular combination of web browser and any assistive technologies or plugins
            installed on your computer:
          </p>
          <ul>
            <li>HTML</li>
            <li>WAI-ARIA</li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>
          <p>
            These technologies are relied upon for conformance with the accessibility standards
            used.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;
