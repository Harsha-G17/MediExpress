import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700">
          We are a passionate team dedicated to providing the best products and services to our customers.Our journey began with a simple idea: to make quality products accessible to everyone. Over the years, we have grown and evolved, but our commitment to excellence remains unchanged.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700">
          Our mission at MediExpress is to ensure the safe and secure purchase of medication by verifying prescriptions before any transaction. We are committed to providing a seamless and trustworthy experience for our customers while promoting responsible medication use.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Team Member 1 */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Dev Darshan"
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <h3 className="font-semibold mt-2">Dev Darshan</h3>
            <p className="text-gray-600">Founder</p>
            <p className="text-gray-700 mt-1">
              Dev Darshan is passionate about innovation and leads our team with a vision for the future.
            </p>
          </div>
          {/* Team Member 2 */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Harsha G"
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <h3 className="font-semibold mt-2">Harsha G</h3>
            <p className="text-gray-600">CEO & CTO</p>
            <p className="text-gray-700 mt-1">
              Harsha G is the tech wizard behind our products, ensuring everything runs smoothly.
            </p>
          </div>
          {/* Team Member 3 */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Kaushal B"
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <h3 className="font-semibold mt-2"> Kaushal B</h3>
            <p className="text-gray-600">Marketing Director</p>
            <p className="text-gray-700 mt-1">
              Kaushal B is responsible for our marketing strategies and ensuring our message reaches the right audience.
            </p>
          </div>
          {/* Team Member 4 */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Naveena N G"
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <h3 className="font-semibold mt-2">Naveena N G</h3>
            <p className="text-gray-600">Product Manager</p>
            <p className="text-gray-700 mt-1">
              Naveena N G oversees product development and ensures that our offerings meet customer needs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;