import { showQRCode } from "../components/qrCodeModal";
import { generateQR } from "./generateQR";
import type { PaymentReqBody } from "./type";
// import { getTransactionToken } from "./getTransactionToken";

export async function requestPayment(reqBody: PaymentReqBody) {
  try {
    console.log("requestPayment", reqBody);
    const qrCodeUrl = await generateQR(reqBody.merchant_order_id);
    showQRCode(qrCodeUrl);

    /* const tokenResponse = await getTransactionToken(reqBody);
    const qrCodeUrl = await generateQR(tokenResponse.transaction_token);
    showQRCode(qrCodeUrl); */
  } catch (error) {
    console.error("Payment process failed:", error);
    throw error;
  }
}
