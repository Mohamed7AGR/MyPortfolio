"use client";

import React, { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";
import { isValidEmail } from "@/../utils/check-email";
import { User, Mail, MessageSquare } from "lucide-react";
import { personalData } from "@/../utils/Data/PersonalData";

const ContactWithoutCaptcha = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState({
    email: false,
    required: false,
  });

  const checkRequired = () => {
    if (input.email && input.message && input.name) {
      setError((e) => ({ ...e, required: false }));
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!input.email || !input.message || !input.name) {
      setError((err) => ({ ...err, required: true }));
      return;
    }
    if (!isValidEmail(input.email)) {
      setError((err) => ({ ...err, email: true }));
      return;
    }
    setError({ email: false, required: false });

    const subject = encodeURIComponent(`Portfolio contact from ${input.name}`);
    const body = encodeURIComponent(
      `${input.message}\n\n---\nFrom: ${input.name}\nEmail: ${input.email}`,
    );
    window.location.href = `mailto:${personalData.email}?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
    setInput({ name: "", email: "", message: "" });
  };

  return (
    <div className="relative group p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl shadow-2xl w-full min-w-0">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Send a Message
          </h3>
          <p className="text-slate-400 text-sm">
            I'll get back to you within 24 hours.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Name Field */}
          <div className="flex flex-col gap-2 group/input">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within/input:text-cyan-500 transition-colors">
              <User className="w-4 h-4" />
              Your Name
            </label>
            <input
              className="bg-white/5 w-full border border-white/10 rounded-2xl focus:border-cyan-500/50 focus:bg-white/10 ring-0 outline-0 transition-all duration-300 px-5 py-4 text-white placeholder:text-slate-600"
              type="text"
              placeholder="John Doe"
              maxLength={100}
              required={true}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              onBlur={checkRequired}
              value={input.name}
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2 group/input">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within/input:text-cyan-500 transition-colors">
              <Mail className="w-4 h-4" />
              Your Email
            </label>
            <input
              className={`bg-white/5 w-full border rounded-2xl focus:bg-white/10 ring-0 outline-0 transition-all duration-300 px-5 py-4 text-white placeholder:text-slate-600 ${error.email ? "border-cyan-500/50" : "border-white/10 focus:border-cyan-500/50"}`}
              type="email"
              placeholder="john@example.com"
              maxLength={100}
              required={true}
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(input.email) });
              }}
            />
            {error.email && (
              <p className="text-xs text-cyan-500 ml-1">
                Please provide a valid email address.
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="flex flex-col gap-2 group/input">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within/input:text-cyan-500 transition-colors">
              <MessageSquare className="w-4 h-4" />
              Your Message
            </label>
            <textarea
              className="bg-white/5 w-full border border-white/10 rounded-2xl focus:border-cyan-500/50 focus:bg-white/10 ring-0 outline-0 transition-all duration-300 px-5 py-4 text-white placeholder:text-slate-600 resize-none"
              placeholder="Tell me about your project..."
              maxLength={500}
              name="message"
              required={true}
              onChange={(e) => setInput({ ...input, message: e.target.value })}
              onBlur={checkRequired}
              rows={4}
              value={input.message}
            />
          </div>

          <div className="flex flex-col gap-4 mt-2">
            {error.required && (
              <p className="text-sm text-cyan-500 text-center font-medium">
                Oops! Looks like some fields are still empty.
              </p>
            )}

            <button
              type="button"
              className="relative group/btn overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600 to-cyan-900 p-[1px] transition-all hover:scale-[1.02] active:scale-[0.98]"
              onClick={handleSubmit}
            >
              <div className="relative flex items-center justify-center gap-2 bg-[#050505] group-hover/btn:bg-transparent transition-all rounded-[15px] px-8 py-4 text-white font-bold uppercase tracking-widest text-sm">
                Send Message
                <TbMailForward className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Accent */}
      <div className="absolute w-1 h-20 bg-gradient-to-b from-cyan-600 to-transparent left-0 top-20 rounded-full" />
    </div>
  );
};

export default ContactWithoutCaptcha;
