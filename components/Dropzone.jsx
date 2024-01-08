'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useImageStore } from '../src/app/store/image';

export default function Dropzone() {
  const addImage = useImageStore((state) => state.addImage);
  const image = useImageStore((state) => state.image);
  const [isUpload, setUpload] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    console.log('dsadaj');
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        setUpload(true);
        // Do whatever you want with the file contents
        const img = reader.result;
        addImage(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              src: img,
            }),
          ),
        );
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    maxFiles: 2,
    accept: {
      'image/svg+xml': ['.svg'],
      'image/png': [],
    },
  });

  const files = image.map((file) => (
    <div
      key={file.path}
      className="size-20 rounded-lg bg-slate-300/40 flex flex-col items-center justify-center relative"
    >
      <img key={file.name} src={file.preview} width="50px" />
    </div>
  ));

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
      <h2 className="text-3xl font-bold">Sube tu imagen aquí</h2>
      <p className="mb-[1.5rem]">Arrasta el archivo</p>
      {isUpload && (
        <aside className="absolute top-[60%] flex flex-col items-center">
          <h4>Imagen Subida</h4>
          <ul>{files}</ul>
        </aside>
      )}
    </section>
  );
}
