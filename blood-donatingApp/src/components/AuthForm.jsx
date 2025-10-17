import { useState } from 'react';
import { saveUser } from '../utils/fakeBackend';
import toast from 'react-hot-toast';

export default function AuthForm() {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(1); 

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !city || !bloodGroup || !phone || phone.length !== 11) {
      toast.error('Please fill all fields correctly.');
      return;
    }

    const newUser = {
      id: 'BB-' + Math.floor(100000 + Math.random() * 900000),
      role,
      name,
      city,
      bloodGroup,
      phone,
      createdAt: new Date().toISOString(),
    };

    if (saveUser(newUser)) {
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      toast.success(`Welcome, ${name}!`);
      window.location.reload();
    } else {
      toast.error('User with this phone already exists.');
    }
  };

  if (step === 1) {
    return (
      <section id="auth" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-red-600">Join BloodBridge</h2>
          <div className="space-y-4">
            <button
              onClick={() => { setRole('donor'); setStep(2); }}
              className="w-full py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition"
            >
              🩸 I want to Donate Blood
            </button>
            <button
              onClick={() => { setRole('gainer'); setStep(2); }}
              className="w-full py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition"
            >
              ❤️ I need Blood
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="auth" className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          {role === 'donor' ? 'Register as Donor' : 'Request Blood'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-600 dark:border-gray-500"
            required
          />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-600 dark:border-gray-500"
            required
          >
            <option value="">Select City</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-600 dark:border-gray-500"
            required
          >
            <option value="">Blood Group</option>
            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
          <input
            type="tel"
            placeholder="Phone (11 digits)"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
            className="w-full p-3 border rounded-lg dark:bg-gray-600 dark:border-gray-500"
            maxLength="11"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}