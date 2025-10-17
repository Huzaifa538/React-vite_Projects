import { motion } from 'framer-motion';

const stats = [
  { label: 'Total Donors', value: 1248 },
  { label: 'Requests Fulfilled', value: 892 },
  { label: 'Cities Covered', value: 24 },
];

export default function Stats() {
  return (
    <section id="stats" className="py-16 px-4 bg-red-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-red-600">Impact So Far</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow"
            >
              <motion.div
                className="text-4xl font-bold text-red-600 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.2 + 0.3 }}
              >
                {stat.value.toLocaleString()}
              </motion.div>
              <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}