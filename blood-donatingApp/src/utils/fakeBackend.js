export const saveUser = (user) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const exists = users.find(u => u.phone === user.phone);
  if (exists) return false;
  localStorage.setItem('users', JSON.stringify([...users, user]));
  return true;
};

export const getUser = (phone) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users.find(u => u.phone === phone) || null;
};

export const getAllDonors = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users.filter(u => u.role === 'donor');
};

export const getAllGainers = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users.filter(u => u.role === 'gainer');
};

export const saveDonation = (donation) => {
  const donations = JSON.parse(localStorage.getItem('donations') || '[]');
  localStorage.setItem('donations', JSON.stringify([...donations, donation]));
};

export const getDonationsByPhone = (phone) => {
  const donations = JSON.parse(localStorage.getItem('donations') || '[]');
  return donations.filter(d => d.donorPhone === phone || d.gainerPhone === phone);
};

