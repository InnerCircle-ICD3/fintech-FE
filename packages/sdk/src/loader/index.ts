import { initialize } from "../core";

export interface ValidationResponse {
  valid: boolean;
  merchantName?: string;
}

export async function loader({ key }: { key: string }): Promise<void> {
  if (!key) throw new Error("[PaymentSDK] key is required");

  const res = await fetch("https://passion-pay-api.com/validate-sdk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
  });

  const json: ValidationResponse = await res.json();

  if (!res.ok || !json.valid) {
    throw new Error("[PaymentSDK] Invalid SDK key");
  }

  initialize(key);
  console.log(`[PaymentSDK] Initialized for merchant: ${json.merchantName}`);
}
