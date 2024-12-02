export const validateEmail = (email:string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

export const isUserLoggedIn = () => {
  let getToken = localStorage.getItem('token');
  if(getToken){
    return true;
  }
  return false;
};


export const isUserLoggedInData = () => {
  let getToken = localStorage.getItem('profile');
  if(getToken){
    return JSON.parse(getToken);
  }
  return "";
};

export const getExtension = (filename:any) => {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}

export const file_type = (val:any) => {
  let ext = getExtension(val);
  let type = '';
  switch (ext.toLowerCase()) {
    case 'jpeg':
    case 'jpg':
    case 'png':
    case 'tiff':
    case 'webp':
    case 'gif':
    case 'bmp':
    case 'ppm':
    case 'pgm':
    case 'pnm':
    case 'pbm':
    case 'svg':
    type = 'Image';
    break;
    case 'mp4':
    case 'qt':
    case 'flv':
    case 'mpeg':
    case 'webm':
    case 'avi':
    case 'mkv':
    case 'mov':
    type = 'Video';
    break;
    case 'mp3':
    case 'wav':
    type = 'Audio';
    break;
    case 'pdf' : 
    type = 'Pdf';
    break;
    case 'doc':
    case 'docx': 
    type = 'Doc';
    break;
    case 'pptx': 
    case 'ppt': 
    type = 'Ppt';
    break;
    case 'xlsx': 
    case 'csv': 
    type = 'Xlsx';
    break;
    // case 'txt': 
    // type = 'txt';
    // break;
    }
  return type;
}