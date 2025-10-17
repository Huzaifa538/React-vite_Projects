import { useEffect, useState } from 'react';
import { getDonationsByPhone } from '../utils/fakeBackend';
import toast from 'react-hot-toast';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      window.location.hash = '#auth';
      return;
    }
    setUser(currentUser);
    setHistory(getDonationsByPhone(currentUser.phone));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast.success('Logged out');
    window.location.reload();
  };

  if (!user) return null;

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {user.role === 'donor' ? '🩸 Blood Donor' : '❤️ Blood Recipient'} • ID: {user.id}
              </p>
              <p>{user.bloodGroup} • {user.city}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4">
          {user.role === 'donor' ? 'Donation History' : 'Request History'}
        </h3>
        {history.length > 0 ? (
          <div className="space-y-3">
            {history.map((h, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                <p><strong>Date:</strong> {new Date(h.date).toLocaleDateString()}</p>
                <p><strong>Status:</strong> Completed</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No history yet.</p>
        )}
      </div>
    </section>
  );
}