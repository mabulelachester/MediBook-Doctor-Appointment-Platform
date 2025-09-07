import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-6">About Our Clinic</h1>
      <p className="text-center text-gray-600 mb-10">
        We are committed to providing top-quality healthcare services. Our team of experienced doctors and medical staff ensure that you get the best care, right when you need it.
      </p>

      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="md:w-1/2">
          <img src={assets.about_image} alt="Clinic" className="rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-gray-600">
            To make healthcare accessible and convenient for everyone by providing easy appointment booking and reliable services.
          </p>
          <h2 className="text-2xl font-semibold">Our Vision</h2>
          <p className="text-gray-600">
            To become the most trusted digital platform for patients and clinics alike, ensuring seamless medical care.
          </p>
          <h2 className="text-2xl font-semibold">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Experienced and verified doctors</li>
            <li>Easy appointment scheduling</li>
            <li>Real-time slot availability</li>
            <li>Flexible payment options: cash, medical aid, online</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;

