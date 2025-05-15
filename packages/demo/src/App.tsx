import { useEffect } from "react";

function App() {
  const handlePaymentClick = () => {};

  useEffect(() => {
    // @ts-expect-error - SDK는 script 태그로 로드됨
    const sdk = window.PaymentSDK();
    sdk.loader({ key: "test_sdk_key_123" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto max-w-md px-4">
        <div className="space-y-6 rounded-2xl bg-white p-6 shadow-lg">
          <h1 className="text-center text-2xl font-bold text-gray-900">
            결제 SDK 데모
          </h1>

          {/* 결제수단 섹션 */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-600">결제수단</div>
            <div className="flex items-center space-x-2 text-lg font-semibold text-orange-500">
              <span role="img" aria-label="fire" className="text-xl">
                🔥
              </span>
              <span>열정페이</span>
            </div>
          </div>

          {/* 결제금액 섹션 */}
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <div className="text-gray-600">총 결제 금액</div>
              <div className="text-xl font-bold text-gray-900">1,000원</div>
            </div>
          </div>

          {/* 결제 버튼 */}
          <button
            onClick={handlePaymentClick}
            className="relative w-full rounded-xl bg-orange-500 py-4 font-bold text-white transition-colors duration-200 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            1,000원 결제하기
          </button>

          {/* 안내 문구 */}
          <p className="text-center text-xs text-gray-500">
            결제 진행 시 QR코드가 생성됩니다
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
