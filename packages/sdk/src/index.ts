import { loader } from "./loader";
import { requestPayment } from "./requestPayment";
import type { PaymentReqBody } from "./requestPayment";

const PaymentSDK = {
  loader,
  requestPayment,
};

export default PaymentSDK;
export type { PaymentReqBody };
