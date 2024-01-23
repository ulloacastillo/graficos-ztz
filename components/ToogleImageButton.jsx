import { useChartSettings } from '@/app/store/store';

function ToogleImageButton() {
  const useImage = useChartSettings((state) => state.useImage);
  const setUseImage = useChartSettings((state) => state.setUseImage);

  const handleToogle = (e) => {
    setUseImage(!useImage);
  };

  const toogleOffClass = ` bg-slate-100`;
  const toogleOnClass = `bg-green-600 translate-x-[20px]`;

  return (
    <>
      <label>Usar imagen subida</label>
      <button
        className={`w-[50px] my-0 mx-auto cursor-pointer rounded-full p-1 shadow-md bg-slate-200`}
        onClick={handleToogle}
      >
        <span
          className={`block size-[20px] rounded-full transition-all ${
            useImage ? toogleOnClass : toogleOffClass
          }`}
        ></span>
      </button>
    </>
  );
}

export default ToogleImageButton;
