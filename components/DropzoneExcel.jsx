import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone(props) {
  const { title, titleSize } = props;
  const [isUpload, setUpload] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        setUpload(true);
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    maxFiles: 2,
    accept:
      '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  return (
    <section
      className="relative flex flex-col size-full items-center justify-center hover:cursor-pointer"
      onClick={open}
    >
      <div
        {...getRootProps({
          className:
            'flex flex-col justify-center items-center absolute inset-0',
        })}
      >
        <input {...getInputProps()} />
      </div>
      <h2 className={`${titleSize} font-bold`}>{title}</h2>
      <p className="mb-[1.5rem]">Arrasta el archivo</p>
      {isUpload && (
        <aside className="absolute top-[60%] flex flex-col items-center">
          <h4>Archivo Subido</h4>
        </aside>
      )}
    </section>
  );
}
