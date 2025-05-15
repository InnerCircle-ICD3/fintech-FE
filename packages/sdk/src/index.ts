import { loader } from "./loader";
import { requestPayment } from "./requestPayment";

interface PaymentSDKInstance {
  requestPayment: (reqBody: {
    amount: number;
    merchant_order_id: string;
    merchant_id: string;
  }) => Promise<void>;
}

async function PassionPaySDK(
  clientKey: string
): Promise<PaymentSDKInstance | null> {
  if (!clientKey) {
    throw new Error("[PassionPaySDK] clientKey is required");
  }

  try {
    // Validate SDK key
    await loader(clientKey);

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
if (typeof window !== "undefined") {
  (window as any).PassionPaySDK = PassionPaySDK;
}

export default PassionPaySDK;
