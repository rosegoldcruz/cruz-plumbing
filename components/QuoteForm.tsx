"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Phone, User, MessageSquare, AlertCircle } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

const issueOptions = [
  "Leak / Dripping",
  "Water Heater",
  "Drain Clog",
  "Toilet Issue",
  "Emergency / Burst Pipe",
  "No Hot Water",
  "Low Water Pressure",
  "New Fixture Install",
  "Other",
];

export default function QuoteForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", phone: "", issue: "", details: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!form.phone.trim() || !/^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Valid phone required";
    if (!form.issue) e.issue = "Please select an issue";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("submitting");

    // Ready for Airtable integration — POST to /api/quote
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, submittedAt: new Date().toISOString() }),
      });
      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const inputClass = (field: keyof typeof form) =>
    `w-full bg-white/5 border ${
      errors[field] ? "border-red-500/60" : "border-white/10 focus:border-brand-blue/60"
    } rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm transition-all duration-200 outline-none focus:bg-white/8 focus:ring-1 focus:ring-brand-blue/40`;

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {formState === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-12 gap-4"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-white font-display font-bold text-2xl">We Got It!</h3>
            <p className="text-slate-400 text-base max-w-xs">
              We&apos;ll reach out fast — usually within minutes. For urgent issues, call us directly.
            </p>
            <a
              href="tel:6235513781"
              className="mt-2 flex items-center gap-2 bg-brand-blue text-white font-bold px-6 py-3 rounded-xl"
            >
              <Phone className="w-4 h-4" />
              (623) 551-3781
            </a>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {/* Name */}
            <div>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`${inputClass("name")} pl-10`}
                />
              </div>
              {errors.name && <p className="text-red-400 text-xs mt-1 pl-1">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={`${inputClass("phone")} pl-10`}
                />
              </div>
              {errors.phone && <p className="text-red-400 text-xs mt-1 pl-1">{errors.phone}</p>}
            </div>

            {/* Issue select */}
            <div>
              <div className="relative">
                <AlertCircle className="absolute left-3 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                <select
                  value={form.issue}
                  onChange={(e) => setForm({ ...form, issue: e.target.value })}
                  className={`${inputClass("issue")} pl-10 appearance-none cursor-pointer`}
                >
                  <option value="" className="bg-slate-900">What&apos;s the issue?</option>
                  {issueOptions.map((o) => (
                    <option key={o} value={o} className="bg-slate-900">{o}</option>
                  ))}
                </select>
              </div>
              {errors.issue && <p className="text-red-400 text-xs mt-1 pl-1">{errors.issue}</p>}
            </div>

            {/* Details */}
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <textarea
                placeholder="Any extra details? (optional)"
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                rows={3}
                className={`${inputClass("details")} pl-10 resize-none`}
              />
            </div>

            {formState === "error" && (
              <p className="text-red-400 text-sm text-center">Something went wrong. Please call us directly.</p>
            )}

            <motion.button
              type="submit"
              disabled={formState === "submitting"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-light disabled:opacity-70 text-white font-bold py-4 rounded-xl text-base transition-all duration-200 mt-1"
            >
              {formState === "submitting" ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Get My Same-Day Quote
                </>
              )}
            </motion.button>

            <p className="text-slate-600 text-xs text-center">
              No spam. No pressure. Just a fast, honest response.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
