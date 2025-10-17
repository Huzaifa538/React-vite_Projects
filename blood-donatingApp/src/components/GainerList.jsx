import { useState, useEffect } from 'react';
import { getAllGainers } from '../utils/fakeBackend';
import toast from 'react-hot-toast';

export default function GainerList() {
  const [gainers, setGainers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [bloodGroup, setBloodGroup] = useState('');
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const data = getAllGainers();
    setGainers(data);
    setFiltered(data);
  }, []);

  useEffect(() => {
    let result = gainers;
    if (bloodGroup) result = result.filter(g => g.bloodGroup === bloodGroup);
    if (city) result = result.filter(g => g.city === city);
    if (search) result = result.filter(g =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.phone.includes(search)
    );
    setFiltered(result);
  }, [bloodGroup, city, search, gainers]);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const cities = [...new Set(gainers.map(g => g.city))];

  const handleContact = (name) => {
    toast.success(`Helping ${name}... (Demo)`);
  };

  const handlePostRequest = () => {
    toast.info('Post New Request form will open soon!');
    // Aap yahan modal ya form open kar sakte hain
  };

  return (
    <section id="gainers" className="py-16 px-4 bg-red-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-3xl font-bold text-red-600">Blood Requests</h2>
          <button
            onClick={handlePostRequest}
            className="mt-4 md:mt-0 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            + Post New Request
          </button>
        </div>
        
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((gainer) => (
              <div key={gainer.id} className="border rounded-xl p-4 shadow hover:shadow-md transition dark:bg-gray-700 bg-white">
                <div className="font-bold text-lg text-red-700">{gainer.name}</div>
                <div className="text-red-600 font-medium">{gainer.bloodGroup}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">{gainer.city}</div>
                <div className="mt-3">
                  <button
                    onClick={() => handleContact(gainer.name)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                  >
                    Contact Requester
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No blood requests found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
