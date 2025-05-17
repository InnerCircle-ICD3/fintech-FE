interface ModalStyles {
  overlay: string;
  modal: string;
  header: string;
  closeButton: string;
  title: string;
  content: string;
  qrImage: string;
  guide: string;
}

const styles: ModalStyles = {
  overlay: `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `,
  modal: `
    background: white;
    border-radius: 12px;
    width: 400px;
    max-width: 90%;
    position: relative;
    padding: 0;
  `,
  header: `
    padding: 20px 16px 20px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  closeButton: `
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    color: #333;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  title: `
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
  `,
  content: `
    padding: 32px 24px;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  qrImage: `
    width: 200px;
    height: 200px;
    margin-bottom: 16px;
  `,
  guide: `
    margin: 0;
    color: #666;
    font-size: 14px;
    text-align: center;
  `,
};

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

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      onClose();
    }
  });

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
