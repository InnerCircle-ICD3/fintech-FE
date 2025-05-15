interface PaymentRequestBody {
  amount: number;
  merchant_order_id: string;
  merchant_id: string;
}

export interface PassionPaySDKInstance {
  requestPayment: (reqBody: PaymentRequestBody) => Promise<void>;
}

declare global {
  const PassionPaySDK: (
    clientKey: string
  ) => Promise<PassionPaySDKInstance | null>;
  type PassionPaySDKInstance = PassionPaySDKInstance;
}

export {};
