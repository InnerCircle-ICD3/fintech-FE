// import { initialize } from "../core";

export interface ValidationResponse {
  valid: boolean;
  merchantName?: string;
}

export async function loader({ key }: { key: string }): Promise<void> {
  if (!key) throw new Error("[PaymentSDK] key is required");

  console.log(`sdk key: ${key}`);
  /* const response = await fetch("https://passion-pay-api.com/validate-sdk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
  });

  const json: ValidationResponse = await response.json();

  if (!response.ok || !json.valid) {
    throw new Error("[PaymentSDK] Invalid SDK key");
  }

  initialize(key);
  console.log(`[PaymentSDK] Initialized for merchant: ${json.merchantName}`); */
}
