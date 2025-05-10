interface ModalStyles {
  modal: string;
  content: string;
  button: string;
  qrImage: string;
  guide: string;
}

const styles: ModalStyles = {
  modal: `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `,
  content: `
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    max-width: 90%;
    max-height: 90%;
  `,
  button: `
    margin-top: 15px;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `,
  qrImage: `
    max-width: 200px;
    margin-bottom: 15px;
  `,
  guide: `
    margin-bottom: 15px;
  `,
};

interface CreateModalElements {
  onClose: () => void;
}

const createModalElements = ({ onClose }: CreateModalElements) => {
  const modal = document.createElement("div");
  const content = document.createElement("div");
  const closeButton = document.createElement("button");

  modal.style.cssText = styles.modal;
  content.style.cssText = styles.content;

  closeButton.textContent = "닫기";
  closeButton.style.cssText = styles.button;
  closeButton.onclick = onClose;

  content.appendChild(closeButton);
  modal.appendChild(content);

  return { modal, content };
};

interface ShowQRCode {
  qrCodeUrl: string;
  onClose: () => void;
}

export const showQRCode = ({ qrCodeUrl, onClose }: ShowQRCode): void => {
  const cleanup = () => {
    if (modal.parentNode) {
      modal.parentNode.removeChild(modal);
    }
    onClose();
  };

  const { modal, content } = createModalElements({ onClose: cleanup });

  // QR 코드 이미지 생성
  const qrImage = document.createElement("img");
  qrImage.src = qrCodeUrl;
  qrImage.style.cssText = styles.qrImage;

  // 안내 텍스트 추가
  const guide = document.createElement("p");
  guide.textContent = "QR코드를 스캔하여 결제를 진행해주세요.";
  guide.style.cssText = styles.guide;

  // 컨텐츠 추가
  content.insertBefore(guide, content.firstChild);
  content.insertBefore(qrImage, guide);

  // 모달 표시
  document.body.appendChild(modal);
};
