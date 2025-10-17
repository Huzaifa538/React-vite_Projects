
import { motion } from 'framer-motion';

export default function Hero() {
  const scrollToAuth = () => {
    const authSection = document.getElementById('auth');
    if (authSection) {
      authSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="pt-24 pb-16 px-4 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold text-red-600 mb-6"
      >
        Save Lives with BloodBridge
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
      >
        Connect donors and recipients instantly. Every drop counts.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-x-4"
      >
        <button
          onClick={scrollToAuth}
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 inline-block cursor-pointer"
        >
          Become a Donor
        </button>
        <button
          onClick={scrollToAuth}
          className="border-2 border-red-600 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 inline-block cursor-pointer"
        >
          Request Blood
        </button>
      </motion.div>
    </section>
  );
}