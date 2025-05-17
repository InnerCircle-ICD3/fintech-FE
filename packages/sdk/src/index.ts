import checkBrowserCompatibility from "./checkBrowserCompatibility";
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
    if (!checkBrowserCompatibility()) {
      throw new Error(
        "[PassionPaySDK] Unsupported browser environment. Requires Chrome 84+, Firefox 79+, Safari 14+, or Edge 84+"
      );
    }

    const isValidSdkKey = await loader(clientKey);

    if (!isValidSdkKey) {
      throw new Error("[PassionPaySDK] Invalid SDK key");
    }

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
