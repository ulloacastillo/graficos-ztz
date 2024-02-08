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

  var xml = new XMLSerializer().serializeToString(svg);
  var svg64 = btoa(xml);
  var b64Start = 'data:image/svg+xml;base64,';

  // prepend a "header"
  var image64 = b64Start + svg64;
  const a = document.createElement('a');
  a.href = image64;
  a.download = fileName;
  a.click();
};
