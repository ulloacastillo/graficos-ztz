import { useChartSettings } from '@/app/store/store';

function CheckBoxImage({ index }) {
  const showImages = useChartSettings((state) => state.showImages);
  const setShowImages = useChartSettings((state) => state.setShowImages);

  const handleClick = () => {
    setShowImages(
      showImages.map((b, i) => {
        if (i === index) {
          return !b;
        }
        return b;
      }),
    );
  };

  return (
    <input
      type="checkbox"
      onClick={handleClick}
      defaultChecked={showImages[index]}
    />
  );
}

export default CheckBoxImage;
