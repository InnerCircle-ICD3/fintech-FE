import { loader } from "./loader";
import { requestPayment } from "./requestPayment";

interface PaymentSDK {
  loader: (options: { key: string }) => Promise<void>;
  requestPayment: (reqBody: {
    amount: number;
    merchant_order_id: string;
    merchant_id: string;
  }) => Promise<void>;
}

function createPaymentSDK(): PaymentSDK {
  return {
    loader,
    requestPayment,
  };
}

// Export the function
const PaymentSDK = createPaymentSDK;

// Register global object for CDN usage
if (typeof window !== "undefined") {
  (window as any).PaymentSDK = PaymentSDK;
}

export default PaymentSDK;
