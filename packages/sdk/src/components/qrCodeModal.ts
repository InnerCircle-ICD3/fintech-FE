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
  // TODO : 임시로 설정한 expireDate 원래는 QR 데이터 받아오는 API 에서 같이 받아와서 계산해야함!
  const expireDate = new Date(Date.now() + 60 * 1000)


  const cleanup = () => {
    if (modal.parentNode) {
      modal.parentNode.removeChild(modal);
    }
    clearInterval(timerId);
  };

  const { modal, content } = createModalElements({ onClose: cleanup });

  // QR 이미지
  const qrImage = document.createElement("img");
  qrImage.src = qrCodeUrl;
  qrImage.style.cssText = styles.qrImage;

  // 안내 문구
  const guide = document.createElement("p");
  guide.textContent = "열정페이 앱으로 QR코드를 스캔하여 결제를 진행해주세요.";
  guide.style.cssText = styles.guide;

  // 유효기간 표시
  const expireText = document.createElement("p");
  expireText.style.cssText = styles.expireText;

  const updateRemainingTime = () => {
    const now = new Date();
    const seconds = Math.max(0, Math.floor((expireDate.getTime() - now.getTime()) / 1000));
    expireText.textContent = `유효기간: ${seconds} 초`;
    return seconds;
  };

  content.appendChild(qrImage);
  content.appendChild(guide);
  content.appendChild(expireText);

  document.body.appendChild(modal);

  // 타이머 시작
  let timerId = setInterval(() => {
    const remaining = updateRemainingTime();

    if (remaining <= 0) {
      clearInterval(timerId);

      // 만료 처리
      modal.style.cssText = styles.expiredOverlay;

      content.innerHTML = ""; // 기존 내용 제거

      const expiredText = document.createElement("p");
      expiredText.textContent = "만료되었습니다. 다시 시도해주세요.";
      expiredText.style.cssText = styles.expiredMessage;

      content.appendChild(expiredText);
    }
  }, 1000);

  // 최초 표시
  updateRemainingTime();
}
