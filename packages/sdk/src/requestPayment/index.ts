import { showQRCode } from "../components/qrCodeModal";
import { generateQR } from "./generateQR";
import { getTransactionToken } from "./getTransactionToken";
import type { PaymentReqBody } from "./type";

export async function requestPayment(reqBody: PaymentReqBody) {
  try {
    const tokenResponse = await getTransactionToken(reqBody);

    const qrCodeUrl = await generateQR(tokenResponse.transaction_token);

    showQRCode(qrCodeUrl);
  } catch (error) {
    console.error("Payment process failed:", error);
    throw error;
  }
}
