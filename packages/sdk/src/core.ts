let initialized = false;
let sdkKey: string | undefined;

export function initialize(key: string) {
  sdkKey = key;
  initialized = true;
}

export function isInitialized(): boolean {
  return initialized;
}

export function doPayment(data: unknown) {
  if (!initialized) {
    throw new Error("[PaymentSDK] Not initialized. Call loader() first.");
  }

  console.log("💸 Processing payment:", data);
}
