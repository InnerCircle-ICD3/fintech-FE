export interface PassionPaySDKInstance {
  requestPayment: (reqBody: {
    amount: number;
    merchant_order_id: string;
    merchant_id: string;
  }) => Promise<void>;
}

declare global {
  const PassionPaySDK: (clientKey: string) => PassionPaySDKInstance;
}

export {};
