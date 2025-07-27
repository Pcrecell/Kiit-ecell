import React, { useState } from "react";

export function SubscriptionForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label
        htmlFor="email-input"
        className="font-normal text-[17px] text-[#D4E9E2] mb-2.5 block max-sm:text-sm"
      >
        Email
      </label>

      <input
        id="email-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full text-[#D4E9E2] text-[17px] bg-[#191919] p-2.5 rounded-[5px] border-[none] focus:outline-none focus:ring-2 focus:ring-[#D4E9E2] placeholder:text-[#D4E9E2]/50"
        aria-label="Email address for updates"
      />

      <button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        className={`w-[150px] text-white text-center font-medium text-[17px] cursor-pointer bg-[#191919] mt-5 p-2.5 rounded-[44px] transition-all hover:bg-[#252525] max-sm:text-sm max-sm:w-full ${
          isSubmitting ? "opacity-70" : ""
        } ${isSubmitted ? "bg-[#0D5C21] hover:bg-[#0D5C21]" : ""}`}
      >
        {isSubmitting
          ? "Submitting..."
          : isSubmitted
          ? "Subscribed!"
          : "Stay updated"}
      </button>
    </form>
  );
}
