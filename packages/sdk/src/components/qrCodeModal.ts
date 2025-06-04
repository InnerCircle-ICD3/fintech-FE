import { styles } from "./styles";
import {expiredImageBase64, logoIconBase64} from "../assets/imageBase64";

interface ShowQRCodeProps {
  qrCodeUrl: string;
  productName?: string;
  price?: number;
}

interface CreateModalElements {
  onClose: () => void;
}

function createModalElements({ onClose }: CreateModalElements) {
  const modal = document.createElement("div");
  modal.style.cssText = styles.overlay;

  const modalContent = document.createElement("div");
  modalContent.style.cssText = styles.modal;

  // Header
  const header = document.createElement("div");
  header.style.cssText = styles.header;

  const closeButton = document.createElement("button");
  closeButton.innerHTML = "×";
  closeButton.style.cssText = styles.closeButton;
  closeButton.onclick = onClose;

  header.appendChild(closeButton);
  modalContent.appendChild(header);

  const content = document.createElement("div");
  content.style.cssText = styles.content;

  modalContent.appendChild(content);
  modal.appendChild(modalContent);

  return { modal, content };
}

export function showQRCode({ qrCodeUrl }: ShowQRCodeProps): void {

  const productName = '[2PACK] 싱글 에어그램 반팔 티셔츠';
  const price = 39800;
  const expireDate = new Date(Date.now() + 60 * 1000);

  const cleanup = () => {
    if (modal.parentNode) {
      modal.parentNode.removeChild(modal);
    }
    clearInterval(timerId);
  };

  const { modal, content } = createModalElements({ onClose: cleanup });

  // 로고
  // ✅ SVG 로고
  const logoBox = document.createElement("div");
  logoBox.style.cssText = styles.logoBox;

  const logoImage = document.createElement("img");
  logoImage.src = logoIconBase64;
  logoImage.alt = "로고";
  logoImage.style.cssText = styles.logoImage;

  logoBox.appendChild(logoImage);
  content.appendChild(logoBox);

  // 제품 정보
  const productInfoBox = document.createElement("div");
  productInfoBox.style.cssText = styles.productInfoBox;

  const productNameText = document.createElement("p");
  productNameText.textContent = productName;
  productNameText.style.cssText = styles.productName;

  const priceText = document.createElement("p");
  priceText.textContent = `${price.toLocaleString('ko-KR')}원`;
  priceText.style.cssText = styles.priceText;

  productInfoBox.appendChild(productNameText);
  productInfoBox.appendChild(priceText);
  content.appendChild(productInfoBox);

  // QR 안내 및 타이머
  const qrWrapper = document.createElement("div");
  qrWrapper.style.cssText = styles.qrWrapper;

  const guide = document.createElement("p");
  guide.textContent = "열정페이 앱으로 QR코드를 스캔하여 결제를 진행해주세요.";
  guide.style.cssText = styles.guide;

  const qrImage = document.createElement("img");
  qrImage.src = qrCodeUrl;
  qrImage.style.cssText = styles.qrImage;

  const expireText = document.createElement("p");
  expireText.style.cssText = styles.expireText;

  qrWrapper.appendChild(guide);
  qrWrapper.appendChild(qrImage);
  qrWrapper.appendChild(expireText);
  content.appendChild(qrWrapper);

  document.body.appendChild(modal);

  const updateRemainingTime = () => {
    const now = new Date();
    const seconds = Math.max(0, Math.floor((expireDate.getTime() - now.getTime()) / 1000));
    expireText.textContent = `유효시간 ${seconds}초`;
    return seconds;
  };

  // 타이머
  let timerId = setInterval(() => {
    const remaining = updateRemainingTime();

    if (remaining <= 0) {
      clearInterval(timerId);
      modal.style.cssText = styles.expiredOverlay;

      qrImage.src = ""; // 기존 QR 제거
      qrImage.style.display = "none";

      const expiredImage = document.createElement("img");
      expiredImage.src = expiredImageBase64; // 실제 이미지 경로로 대체
      expiredImage.alt = "만료된 결제";
      expiredImage.style.cssText = styles.expiredImage;

      qrWrapper.insertBefore(expiredImage, expireText);

      guide.textContent = "결제 유효시간이 만료되었습니다.";
      expireText.textContent = "다시 시도해주세요.";
    }
  }, 1000);

  updateRemainingTime();
}
