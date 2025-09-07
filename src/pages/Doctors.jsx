import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality: paramSpeciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState(paramSpeciality || '');
  const navigate = useNavigate();

  const specialities = [...new Set(doctors.map(doc => doc.speciality))];

  useEffect(() => {
    if (selectedSpec) {
      setFilterDoc(doctors.filter(doc => doc.speciality === selectedSpec));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, selectedSpec]);

  const handleSpecialityClick = (spec) => {
    if (selectedSpec === spec) {
      setSelectedSpec('');
      navigate('/doctors');
    } else {
      setSelectedSpec(spec);
      navigate(`/doctors/${spec}`);
    }
  };

  return (
    <div>
      <p className='text-gray-700 text-lg mb-4'>Browse our top doctors list</p>

      {/* Specialities */}
      <div className="flex flex-wrap gap-3 mb-6">
        {specialities.map((spec, index) => (
          <p
            key={index}
            onClick={() => handleSpecialityClick(spec)}
            className={`cursor-pointer px-4 py-2 rounded-full border transition-colors
              ${selectedSpec === spec ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-blue-600'}`}
          >
            {spec}
          </p>
        ))}
      </div>

      {/* Filtered doctors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filterDoc.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img className="bg-blue-50 w-full" src={item.image} alt={item.name} />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
