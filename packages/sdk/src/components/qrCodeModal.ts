import { styles } from "./styles";

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

  const title = document.createElement("h2");
  title.textContent = "열정페이";
  title.style.cssText = styles.title;

  const closeButton = document.createElement("button");
  closeButton.innerHTML = "×";
  closeButton.style.cssText = styles.closeButton;
  closeButton.onclick = onClose;

  header.appendChild(title);
  header.appendChild(closeButton);

  // Content
  const content = document.createElement("div");
  content.style.cssText = styles.content;

  modalContent.appendChild(header);
  modalContent.appendChild(content);
  modal.appendChild(modalContent);

  return { modal, content };
}

export function showQRCode(qrCodeUrl: string): void {
  const cleanup = () => {
    if (modal.parentNode) {
      modal.parentNode.removeChild(modal);
    }
  };

  const { modal, content } = createModalElements({ onClose: cleanup });

  // QR 코드 이미지
  const qrImage = document.createElement("img");
  qrImage.src = qrCodeUrl;
  qrImage.style.cssText = styles.qrImage;

  // 안내 텍스트
  const guide = document.createElement("p");
  guide.textContent = "열정페이 앱으로 QR코드를 스캔하여 결제를 진행해주세요.";
  guide.style.cssText = styles.guide;

  content.appendChild(qrImage);
  content.appendChild(guide);

  document.body.appendChild(modal);
}
