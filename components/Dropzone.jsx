'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useImageStore } from '@/app/store/image';

export default function Dropzone() {
  const addImage = useImageStore((state) => state.addImage);
  const image = useImageStore((state) => state.image);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
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
    <div key={file.path}>
      <img key={file.name} src={file.preview} width="30px" />
      {file.name}
    </div>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Arrastra tus archivos aquí</p>
        <button onClick={open}>Abrir</button>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}
