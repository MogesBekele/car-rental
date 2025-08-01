//Here’s how you can add TypeScript to your NewsLetter component (even though it doesn’t take any props):
//No props are needed, so you don’t need to define a type.
//If you want to handle the form submission with TypeScript, you can type the event.
import { motion } from "motion/react";
const NewsLetter = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can add your subscribe logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="flex  flex-col items-center justify-center text-center space-y-2 max-md:px-4 my-10 mb-40"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
      
      className="md:text-4xl text-2xl font-semibold">Never Miss a Deal!</motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
      
      className="md:text-lg text-gray-500/70 pb-8">
        Subscribe to get the latest offers, new arrivals, and exclusive
        discounts
      </motion.p>
      <motion.form

        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12"
        onSubmit={handleSubmit}
      >
        <input
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="email"
          placeholder="Enter your email id"
          required
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </motion.form>
    </motion.div>
  );
};

export default NewsLetter;
