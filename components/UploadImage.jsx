import Dropzone from './Dropzone';
export default function UploadImage({ className }) {
  return (
    <div className={className}>
      <h2> Suelta tu imagen aquí</h2>
      <Dropzone />
    </div>
  );
}
