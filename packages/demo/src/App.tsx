function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
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
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <div className="text-gray-600">총 결제 금액</div>
              <div className="text-xl font-bold text-gray-900">1,000원</div>
            </div>
          </div>

          {/* 결제 버튼 */}
          <button className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
            1,000원 결제하기
          </button>

          {/* 안내 문구 */}
          <p className="text-xs text-center text-gray-500 mt-4">
            결제 진행 시 QR코드가 생성됩니다
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
