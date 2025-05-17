import QRCode from "qrcode";

export async function generateQR(token: string) {
  const qrCodeUrl = await QRCode.toDataURL(token);

  return qrCodeUrl;
}
