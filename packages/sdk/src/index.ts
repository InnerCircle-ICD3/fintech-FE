import { loader } from "./loader";
import { requestPayment } from "./requestPayment";
import type { PassionPaySDKInstance } from "./types";

async function PassionPaySDK(
  clientKey: string
): Promise<PassionPaySDKInstance | null> {
  if (!clientKey) {
    throw new Error("[PassionPaySDK] clientKey is required");
  }

  try {
    // Validate SDK key
    const isValid = await loader(clientKey);

    if (!isValid) {
      throw new Error("[PassionPaySDK] Invalid SDK key");
    }

    // Return SDK instance only if validation succeeds
    return {
      requestPayment,
    };
  } catch (error) {
    console.error("[PassionPaySDK] Initialization failed:", error);
    return null;
  }
}

// Register global object for CDN usage
if (typeof window !== "undefined" && !(window as any).PassionPaySDK) {
  Object.defineProperty(window, "PassionPaySDK", {
    value: PassionPaySDK,
    writable: false,
    configurable: false,
  });
}

export default PassionPaySDK;
