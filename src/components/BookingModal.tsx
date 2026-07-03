import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      businessName: '',
      email: '',
      phone: '',
    });
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.45 }}
            className="relative w-full max-w-lg bg-[#fffdf5] rounded-3xl overflow-hidden shadow-2xl z-10 border border-[#ffd148]/20 p-8 md:p-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-slate-500 hover:text-slate-950 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="booking-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <h4 className="text-2xl font-extrabold text-slate-900 mb-2">
                    Book a Growth Consultation
                  </h4>
                  <p className="text-sm text-[#717b72] font-semibold leading-relaxed mb-8">
                    Provide your details below to schedule your clarity session.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="px-4 py-3 text-sm bg-white border border-slate-900/10 rounded-xl focus:border-[#ffd148] focus:outline-none font-semibold text-slate-800 transition-colors"
                      />
                      {errors.name && (
                        <span className="text-[10px] font-bold text-red-500">{errors.name}</span>
                      )}
                    </div>

                    {/* Business Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="businessName" className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="E.g. Acme Corp"
                        className="px-4 py-3 text-sm bg-white border border-slate-900/10 rounded-xl focus:border-[#ffd148] focus:outline-none font-semibold text-slate-800 transition-colors"
                      />
                      {errors.businessName && (
                        <span className="text-[10px] font-bold text-red-500">{errors.businessName}</span>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="px-4 py-3 text-sm bg-white border border-slate-900/10 rounded-xl focus:border-[#ffd148] focus:outline-none font-semibold text-slate-800 transition-colors"
                      />
                      {errors.email && (
                        <span className="text-[10px] font-bold text-red-500">{errors.email}</span>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+234..."
                        className="px-4 py-3 text-sm bg-white border border-slate-900/10 rounded-xl focus:border-[#ffd148] focus:outline-none font-semibold text-slate-800 transition-colors"
                      />
                      {errors.phone && (
                        <span className="text-[10px] font-bold text-red-500">{errors.phone}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-[#ffd148] hover:bg-[#ffd148]/90 text-black font-bold py-4 px-6 rounded-xl text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer border-none mt-4 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="flex flex-col items-center text-center py-6"
                >
                  <div className="w-16 h-16 rounded-full bg-[#ffd148]/15 border-2 border-[#ffd148] flex items-center justify-center text-[#ffd148] mb-6 animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-extrabold text-slate-900 mb-3">
                    Request Received!
                  </h4>
                  <p className="text-sm text-[#717b72] font-semibold leading-relaxed max-w-sm mb-8">
                    Thank you, <span className="text-slate-900 font-bold">{formData.name}</span>. We've received details for <span className="text-slate-900 font-bold">{formData.businessName}</span>. 
                    We will be in touch within 24 hours to schedule your session.
                  </p>
                  <button
                    onClick={handleReset}
                    className="bg-slate-950 hover:bg-slate-800 text-white font-bold py-3.5 px-8 rounded-full text-xs shadow-lg transition-all cursor-pointer border-none"
                  >
                    Back to Website
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
