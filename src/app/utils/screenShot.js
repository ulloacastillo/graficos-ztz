import html2canvas from 'html2canvas';

const imageToDataURL = async (imageUrl) => {
  return fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    });
};

export const takeScreenshot = async (elementId, fileName, fileType) => {
  const svg = document.getElementById(elementId);

  svg.classList.remove('shadow-2xl');

  if (!svg) {
    return;
  }

  const images = svg.querySelectorAll('image');

  for (const i in images) {
    if (Object.prototype.hasOwnProperty.call(images, i)) {
      const img = images[i];

      const imgHref = img.getAttribute('href');
      const dataURL = await imageToDataURL(imgHref);

      img.setAttribute('href', dataURL);
    }
  }

  html2canvas(svg, { backgroundColor: '#ffffff	' }).then(function (canvas) {
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = fileName;
    a.click();
    svg.classList.add('shadow-2xl');
  });
  // let canvas = document.createElement('canvas');
  // //const svgData = new XMLSerializer().serializeToString(svg);
  // //console.log(svgData);

  // let blob = new Blob([svg.outerHTML], { type: 'text/html' }); //svg+xml
  // const image = new Image();

  // let reader = new FileReader();
  // reader.readAsDataURL(blob);
  // reader.onloadend = function () {
  //   let base64String = reader.result;

  //   //console.log('aca', base64String);
  //   console.log('aqui');
  //   image.addEventListener('load', () => {
  //     canvas.setAttribute('width', 800);
  //     canvas.setAttribute('height', 420);
  //     console.log('aca entra');

  //     const context = canvas.getContext('2d');
  //     context.drawImage(image, 0, 0, 800, 420);

  //     const dataUrl = canvas.toDataURL('image/png');

  //     const a = document.createElement('a');
  //     a.href = dataUrl;
  //     a.download = fileName;
  //     a.click();
  //   });
  //   console.log(base64String.length);

  //   image.src = base64String;
  //   console.log(image);
  //   //console.log(svgDataUrl);
  // };

  // var xml = new XMLSerializer().serializeToString(svg);
  // var svg64 = btoa(xml);
  // var b64Start = 'data:image/svg+xml;base64,';

  // // prepend a "header"
  // var image64 = b64Start + svg64;
};
