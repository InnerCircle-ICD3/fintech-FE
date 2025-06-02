import { showQRCode } from "../components/qrCodeModal";
import { generateQR } from "./generateQR";
import type { PaymentReqBody } from "./type";


export async function requestPayment(reqBody: PaymentReqBody) {
  try {
    console.log("requestPayment", reqBody);
    const qrCodeUrl = await generateQR(reqBody.merchant_order_id);
    showQRCode({qrCodeUrl});

    // TODO: TransactionToken 을 받는 url 나오면 확인
    // const tokenResponse = await getTransactionToken(reqBody);
    // const qrCodeUrl = await generateQR(tokenResponse.transaction_token);
    //
    // showQRCode(qrCodeUrl);
  } catch (error) {
    console.error("Payment process failed:", error);
    throw error;
  }
}
