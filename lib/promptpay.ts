import generatePayload from "promptpay-qr";
import QRCode from "qrcode";

export function createPromptPayPayload(phone: string, amount: number | string): string {
  return generatePayload(phone, { amount: Number(amount) });
}

export async function createPromptPayQRSvg(phone: string, amount: number | string): Promise<string> {
  const payload = createPromptPayPayload(phone, amount);
  return QRCode.toString(payload, { type: "svg" });
}

export async function createPromptPayQRDataUrl(phone: string, amount: number | string): Promise<string> {
  const payload = createPromptPayPayload(phone, amount);
  return QRCode.toDataURL(payload, { errorCorrectionLevel: "H" });
}
