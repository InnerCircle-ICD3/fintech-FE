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

export const styles: ModalStyles = {
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
