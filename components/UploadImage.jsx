import Dropzone from './Dropzone';

export default function UploadImage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-ztz-mainblue hover:bg-ztz-softblue hover:text-white size-60 border-dashed border-2 border-ztz-indigoblue rounded-[2.5rem] flex flex-col justify-center items-center relative text-center text-xs my-auto">
        <Dropzone title="Sube tu imagen aquí" titleSize="text-3xl" />
      </div>
    </div>
  );
}
