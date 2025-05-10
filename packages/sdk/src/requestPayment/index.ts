export interface PaymentReqBody {
  amount: number;
  merchant_order_id: string;
  merchant_id: string;
}

export interface PaymentResData {
  transaction_token: string;
  expires_at: string;
}

export const requestPayment = async (
  params: PaymentReqBody
): Promise<PaymentResData> => {
  const response = await fetch(
    `https://passion-pay-api.com/transactions/initiate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get transaction token");
  } else {
    // TODO : QR 생성 및 표시
  }

  return response.json();
};
