import Dropzone from './Dropzone';

export default function UploadImage() {
  return (
    <div className="size-96 border-dashed border-2 border-indigo-600 rounded-[2.5rem] flex flex-col justify-center items-center relative">
      <Dropzone />
    </div>
  );
}
