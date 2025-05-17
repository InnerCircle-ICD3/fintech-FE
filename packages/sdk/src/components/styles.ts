export interface ModalStyles {
  modal: string;
  content: string;
  button: string;
  qrImage: string;
  guide: string;
}

export const styles: ModalStyles = {
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
