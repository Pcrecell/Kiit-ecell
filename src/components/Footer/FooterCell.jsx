import React from "react";
import { EventPanel } from "./EventPanel";
import { SubscriptionPanel } from "./SubscriptionPanel";

export function FooterCell() {
  return (
    <main className=" relative max-w-none flex flex-row justify-center items-center w-full h-screen bg-neutral-950 mx-auto max-md:max-w-[991px] max-md:flex-col max-sm:max-w-screen-sm max-sm:p-5">
      <EventPanel />
      <SubscriptionPanel />
    </main>
  );
}

export default FooterCell;