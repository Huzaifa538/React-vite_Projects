import { useState, useEffect } from 'react';
import { getAllDonors } from '../utils/fakeBackend';
import toast from 'react-hot-toast';

export default function DonorList() {
  const [donors, setDonors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [bloodGroup, setBloodGroup] = useState('');
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const data = getAllDonors();
    setDonors(data);
    setFiltered(data);
  }, []);

  useEffect(() => {
    let result = donors;
    if (bloodGroup) result = result.filter(d => d.bloodGroup === bloodGroup);
    if (city) result = result.filter(d => d.city === city);
    if (search) result = result.filter(d =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search)
    );
    setFiltered(result);
  }, [bloodGroup, city, search, donors]);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const cities = [...new Set(donors.map(d => d.city))];

  const handleContact = (name) => {
    toast.success(`Contacting ${name}... (Demo)`);
  };

  return (
    <section id="donors" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-red-600">Find Donors</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by name or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All Blood Groups</option>
            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All Cities</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button
            onClick={() => { setBloodGroup(''); setCity(''); setSearch(''); }}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg dark:bg-gray-600"
          >
            Reset
          </button>
        </div>

        {/* Donor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((donor) => (
              <div key={donor.id} className="border rounded-xl p-4 shadow hover:shadow-md transition dark:bg-gray-800">
                <div className="font-bold text-lg">{donor.name}</div>
                <div className="text-red-600 font-medium">{donor.bloodGroup}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{donor.city}</div>
                <div className="mt-3">
                  <button
                    onClick={() => handleContact(donor.name)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
                  >
                    Contact Donor
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No donors found.</p>
          )}
        </div>
      </div>
    </section>
  );
}