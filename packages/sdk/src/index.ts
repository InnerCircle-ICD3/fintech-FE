import { loader } from "./loader";
import { doPayment, isInitialized } from "./core";

const PaymentSDK = {
  loader,
  doPayment,
  isInitialized,
};

export default PaymentSDK;
