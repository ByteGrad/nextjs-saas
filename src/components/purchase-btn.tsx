"use client";

import { createCheckoutSession } from "@/actions/actions";

export default function PurchaseBtn() {
  return (
    <button
      onClick={async () => {
        await createCheckoutSession();
      }}
      className="bg-black text-white px-4 py-2 rounded-lg font-medium"
    >
      Purchase
    </button>
  );
}
