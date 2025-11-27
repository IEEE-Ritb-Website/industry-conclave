'use client'

import { X } from "lucide-react"
import { useState } from "react"
import { motion } from "motion/react"

const TopNotification = () => {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: -90 }}
      animate={{ opacity: 1, rotateX: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ transformOrigin: "top center" }}
      className="
        absolute top-0 left-0 w-full mt-14 
        bg-linear-to-r from-red-600 via-orange-500 to-yellow-500 
        text-white py-3 px-4 shadow-md z-50
      "
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <p className="font-semibold tracking-wide">
          🚀 Hurry up! Slots are filling fast!
        </p>

        <button 
          onClick={() => setOpen(false)} 
          className="text-white hover:text-neutral-200 transition"
        >
          <X size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default TopNotification;
