import React from "react";
import { SubscriptionForm } from "./SubscriptionForm";
import { SocialIcons } from "./SocialIcons";

export function SubscriptionPanel({ className = "" }) {
  return (
    <aside
      className={`w-7/12 flex flex-col md:mr-12 z-[5] justify-between bg-[#3ba3ff] p-10 rounded-[44px] max-md:w-[90%] max-md:mb-5 max-sm:w-full max-sm:p-5 ${className}`}
    >
      <div>
        <h2 className="font-bold text-[23px] text-[#D4E9E2] uppercase mb-2.5 max-sm:text-sm">
          STAY UPDATED
        </h2>

        <p className="font-normal text-[17px] text-[#D4E9E2] mb-5 max-sm:text-sm">
          Subscribe for event updates &amp; exclusive content.
        </p>

        <SubscriptionForm />
      </div>

      <div className="mt-8">
        <h2 className="font-bold text-[23px] text-[#D4E9E2] uppercase mb-2.5 max-sm:text-sm">
          FOLLOW US
        </h2>

        <SocialIcons />
      </div>
    </aside>
  );
}
