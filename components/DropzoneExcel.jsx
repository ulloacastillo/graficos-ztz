import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { validateData } from '../src/app/utils/validation';
import {
  updateChartData,
  updateChartHeaders,
  updateOriginalData,
  updateClaims,
  updadateColNumber,
} from '../src/app/redux/actions';
import Swal from 'sweetalert2';

export default function Dropzone(props) {
  const { title, titleSize, dateType } = props;
  const dispatch = useDispatch();
  const [isUpload, setUpload] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const fileType = file.name.split('.').pop().toLowerCase();
        if (fileType !== 'csv' && fileType !== 'xlsx') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Solo se permiten archivos Excel (.xlsx) o CSV (.csv)',
          });
          return;
        }

        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
          const binaryStr = reader.result;
          const workbook = XLSX.read(binaryStr, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const csvData = XLSX.utils.sheet_to_csv(worksheet);

          const validation = validateData(csvData, dateType);
          if (!validation.isValid) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: validation.error,
            });
            return;
          }

          dispatch(updateOriginalData(validation.data));
          dispatch(updateChartData(validation.data));
          dispatch(updateChartHeaders(validation.headers));
          dispatch(
            updateClaims({
              total: validation.total,
              notAnswered: validation.notAnswered,
            }),
          );
          dispatch(updadateColNumber(validation.colNumber));

          setUpload(true);
        };
        reader.readAsBinaryString(file);
      });
    },
    [dispatch, dateType],
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    maxFiles: 2,
    accept: {
      'text/csv': [`.csv`],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
    },
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
