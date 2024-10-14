import useA2HS from '@/hooks/useA2HS';

const A2HS = () => {
  const { deferredPrompt, installApp, clearPrompt } = useA2HS();

  return deferredPrompt ? (
    <div>
      <button onClick={clearPrompt}>취소</button>
      <button onClick={installApp}>홈 화면에 추가</button>
    </div>
  ) : null;
};
export default A2HS;
