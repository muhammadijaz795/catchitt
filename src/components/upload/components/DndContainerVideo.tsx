// DndContainer.tsx
import React, { useState } from 'react';
import type { UploadProps } from 'antd';
import { Upload, message } from 'antd';
import ImgCrop, { ImgCropProps } from 'antd-img-crop';

const { Dragger } = Upload;

interface DndContainerProps {
  onChangeFile: (file: File) => void;
  aspect?: number;
  quality?: number;
  shape?: 'rect' | 'round';
  modalTitle?: string;
  className?: string;
  text?: string;
  orText?: string;
  subtitle?: string;
  children?: React.ReactNode;
  crop?: boolean;
  accept?: string;
  showPreview?: boolean;
  maxSizeMB?: number;
}

const DndContainer: React.FC<DndContainerProps> = ({
  onChangeFile,
  aspect = 1,
  quality = 1,
  shape = 'rect',
  modalTitle = 'Crop Image',
  className = '',
  text = 'Drag and drop a file here',
  orText = 'Select a file',
  subtitle = '',
  children,
  crop = true,
  accept = 'image/*',
  showPreview = false,
  maxSizeMB = 5,
}) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return Upload.LIST_IGNORE;
    }
    
    const isLtMaxSize = file.size / 1024 / 1024 < maxSizeMB;
    if (!isLtMaxSize) {
      message.error(`Image must be smaller than ${maxSizeMB}MB!`);
      return Upload.LIST_IGNORE;
    }
    
    return false; // Prevent automatic upload
  };

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    listType: 'picture',
    accept: accept,
    fileList,
    onChange: handleChange,
    beforeUpload: beforeUpload,
    onPreview: showPreview ? handlePreview : undefined,
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const DndComp = (
    <Dragger {...uploadProps} className={className}>
      <p className="ant-upload-drag-icon">
        <svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="72" height="72" transform="translate(0.970215 0.0976562)" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M30.3177 7.53836L9.77664 11.9046C4.9147 12.938 1.81108 17.7171 2.84452 22.5791L10.9531 60.7268C11.9865 65.5888 16.7656 68.6924 21.6276 67.659L41.8011 63.3709C40.7238 62.3394 39.6731 60.6702 39.6731 58.4488C39.6731 56.1524 40.796 54.446 41.9107 53.424C42.8827 52.5328 43.9331 52.0609 44.5401 51.8192C45.6137 51.3918 46.9152 51.0888 47.738 50.8972L47.9813 50.8404C48.2326 50.7812 48.4671 50.7251 48.6869 50.6709L40.9923 14.4705C39.9588 9.60854 35.1797 6.50492 30.3177 7.53836ZM34.4071 34.7134C35.9445 35.2129 36.3647 37.1895 35.1633 38.2712L24.1581 48.1804C22.9567 49.2621 21.0349 48.6376 20.6988 47.0564L17.6198 32.571C17.2837 30.9897 18.7854 29.6376 20.3228 30.1371L34.4071 34.7134Z" fill="url(#paint0)"/>
          <path d="M69.9457 32.5242L64.7529 41.5185C64.6284 41.3572 64.4936 41.1957 64.3474 41.0363C63.4748 40.0847 62.1029 39.1267 60.2905 38.8674L63.5413 20.4317C63.6541 19.7916 63.7064 19.1548 63.7023 18.5273L66.6515 20.23C70.9561 22.7153 72.431 28.2196 69.9457 32.5242Z" fill="url(#paint1)"/>
          <path d="M58.5889 22.6035L55.5262 39.9729C55.0452 40.3011 54.6348 40.6688 54.2986 41.0355C53.4074 42.0076 52.9354 43.0579 52.6937 43.6649C52.4837 44.1924 52.3037 44.775 52.1523 45.3287L45.3941 13.5341C45.2055 12.6469 44.9338 11.7988 44.5889 10.9961L51.2885 12.1774C56.1835 13.0406 59.4521 17.7085 58.5889 22.6035Z" fill="url(#paint2)"/>
          <circle cx="54.2202" cy="53.3477" r="18.75" fill="#F7F7F7"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M51.7717 42.1015C53.0315 40.763 55.1589 40.763 56.4187 42.1015L65.6999 51.9627C66.4245 52.7327 66.3878 53.9443 65.6178 54.6689C64.8479 55.3936 63.6363 55.3569 62.9116 54.5869L56.0097 47.2536V64.5709C56.0097 65.6282 55.1525 66.4854 54.0952 66.4854C53.0379 66.4854 52.1807 65.6282 52.1807 64.5709V47.2536L45.2788 54.5869C44.5541 55.3569 43.3425 55.3936 42.5726 54.6689C41.8026 53.9443 41.7659 52.7327 42.4906 51.9627L51.7717 42.1015Z" fill="url(#paint3)"/>
          <defs>
            <linearGradient id="paint0" x1="42.2202" y1="67.5977" x2="42.2202" y2="0.847651" gradientUnits="userSpaceOnUse">
              <stop stopColor="#BEBEBE"/>
              <stop offset="1" stopColor="#EDEDED"/>
            </linearGradient>
            <linearGradient id="paint1" x1="42.22" y1="67.598" x2="42.22" y2="0.848043" gradientUnits="userSpaceOnUse">
              <stop stopColor="#BEBEBE"/>
              <stop offset="1" stopColor="#EDEDED"/>
            </linearGradient>
            <linearGradient id="paint2" x1="42.2204" y1="67.5969" x2="42.2204" y2="0.846894" gradientUnits="userSpaceOnUse">
              <stop stopColor="#BEBEBE"/>
              <stop offset="1" stopColor="#EDEDED"/>
            </linearGradient>
            <linearGradient id="paint3" x1="1.62887" y1="88.879" x2="1.62887" y2="23.881" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5B5B5B"/>
              <stop offset="1" stopColor="#EDEDED"/>
            </linearGradient>
          </defs>
        </svg>
      </p>
      {text && (
        <p className="ant-upload-text flex flex-col items-center justify-center">
          <span className="text-lg font-semibold">{text}</span>
          {orText && (
            <span className="text-base py-2 text-[#0000007A] font-normal">
              Or {orText}
            </span>
          )}
        </p>
      )}
      {subtitle && <p className="ant-upload-hint">{subtitle}</p>}
      {children}
    </Dragger>
  );

  return (
    <div>
      {crop ? (
        <ImgCrop
          aspect={aspect}
          quality={quality}
          modalTitle={modalTitle}
        >
          {DndComp}
        </ImgCrop>
      ) : (
        DndComp
      )}
      
      {showPreview && previewImage && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Preview:</h4>
          <img 
            src={previewImage} 
            alt="Cropped preview" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '300px',
              borderRadius: shape === 'round' ? '50%' : '4px'
            }}
          />
        </div>
      )}
    </div>
  );
};

// Helper function to convert file to base64
const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export default DndContainer;