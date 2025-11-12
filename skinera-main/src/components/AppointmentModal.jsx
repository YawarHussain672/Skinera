import React, { useEffect, useMemo, useState } from "react";

export default function AppointmentModal({ open, onClose, onSubmit }) {
  const FORM_ACTION = "https://formsubmit.co/kunalking01grd@gmail.com"; // replace with your email
  const today = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    concern: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function onEsc(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      // reset transient UI states when closing
      setTimeout(() => {
        setSubmitted(false);
        setErrors({});
      }, 200);
    }
  }, [open]);

  function updateField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.phone.trim() && !form.email.trim())
      e.contact = "Provide a phone number or an email";
    if (!form.date) e.date = "Select a date";
    if (!form.time) e.time = "Select a time";
    if (!form.concern) e.concern = "Choose a concern";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    // Build form data for FormSubmit
    const fd = new FormData();
    fd.append("Name", form.name);
    if (form.phone) fd.append("Phone", form.phone);
    if (form.email) fd.append("Email", form.email);
    fd.append("Date", form.date);
    fd.append("Time", form.time);
    fd.append("Concern", form.concern);
    // FormSubmit controls
    fd.append("_captcha", "false"); // disable captcha
    fd.append("_template", "table"); // nicer email formatting
    fd.append("_subject", "New Appointment Request");

    setSubmitted(true);

    fetch(FORM_ACTION, {
      method: "POST",
      body: fd,
      headers: { Accept: "application/json" },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to submit form");
        onSubmit?.({ ...form });
        setForm({
          name: "",
          phone: "",
          email: "",
          date: "",
          time: "",
          concern: "",
        });
        // Auto close after a moment
        setTimeout(() => {
          onClose?.();
          setSubmitted(false);
        }, 1200);
      })
      .catch(() => {
        setSubmitted(false);
      });
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-[101] w-full max-w-lg sm:max-w-xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-[#e0a075] text-white">
            <h3 className="text-lg sm:text-xl font-semibold">
              Book an Appointment
            </h3>
            <button
              type="button"
              aria-label="Close appointment form"
              onClick={onClose}
              className="p-2 hover:text-white/90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <form
            action={FORM_ACTION}
            method="POST"
            onSubmit={handleSubmit}
            className="px-5 sm:px-6 py-5 grid grid-cols-1 gap-4"
          >
            {/* FormSubmit hidden controls */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input
              type="hidden"
              name="_subject"
              value="New Appointment Request"
            />

            {/* Name */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c98963]"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="(+91) 9xxxxxxxxx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c98963]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c98963]"
                />
              </div>
            </div>
            {errors.contact && (
              <p className="-mt-2 text-sm text-red-600">{errors.contact}</p>
            )}

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c98963]"
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => updateField("time", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                {errors.time && (
                  <p className="mt-1 text-sm text-red-600">{errors.time}</p>
                )}
              </div>
            </div>

            {/* Concern */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Concern
              </label>
              <select
                value={form.concern}
                onChange={(e) => updateField("concern", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#c98963]"
              >
                <option value="">Select a concern</option>
                <option>Anti-aging solutions</option>
                <option>Deep peelings</option>
                <option>Facials</option>
                <option>Laser hair removal</option>
                <option>Laser skin therapy</option>
                <option>Mesotherapy</option>
                <option>Microdermabrasion</option>
                <option>Pigmentation solutions</option>
                <option>Skin tightening</option>
                <option>Hair PRP</option>
                <option>HAIR GFC</option>
                <option>Hair regrowth laser</option>
                <option>Korean Skin Treatment</option>
                {/* <option>Botox Treatment</option> */}
                <option>Eczema</option>
                <option>Psoriasis</option>
                <option>Dermatitis</option>
                <option>Alopecia Areata</option>
                <option>Others</option>
              </select>
              {errors.concern && (
                <p className="mt-1 text-sm text-red-600">{errors.concern}</p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#c98963] hover:bg-[#be7f58] text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Confirm Booking
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-md"
              >
                Cancel
              </button>
              {submitted && (
                <span className="text-sm text-green-600">
                  Appointment request sent. We'll contact you soon.
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
