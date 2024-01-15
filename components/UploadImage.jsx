import Dropzone from './Dropzone';

export default function UploadImage() {
  return (
    <div className="bg-slate-200 size-60 border-dashed border-2 border-indigo-600 rounded-[2.5rem] flex flex-col justify-center items-center relative">
      <Dropzone title="Sube tu imagen aquí" titleSize="text-3xl" />
    </div>
  );
}
