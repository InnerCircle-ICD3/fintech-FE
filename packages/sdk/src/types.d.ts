declare global {
  interface Window {
    PaymentSDK: () => import("./index").PaymentSDK;
  }
}

export {};
