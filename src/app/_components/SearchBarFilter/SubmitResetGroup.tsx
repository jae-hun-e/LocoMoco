import Reset from '../../../../public/reset.svg';

const SubmitResetGroup = ({ onReset }: { onReset: () => void }) => {
  return (
    <div className="mt-20pxr grid grid-cols-[1fr_3fr] gap-7pxr">
      <button
        type="button"
        onClick={onReset}
        className="flex items-center justify-center rounded-[6px] border border-layer-3 bg-white py-10pxr text-white"
      >
        <Reset />
      </button>
      <button
        type="submit"
        className=" rounded-[6px] bg-main-1 py-10pxr text-white"
      >
        적용하기
      </button>
    </div>
  );
};

export default SubmitResetGroup;
