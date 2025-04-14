// CoverImageUploadPage.tsx
import React, { useState } from 'react';
import { Button, message } from 'antd';
import DndContainer from './DndContainerVideo';

const CoverImageUploadPage = () => {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (file: File) => {
    setCoverImage(file);
    message.success('Image selected successfully!');
  };

  const handleSubmit = () => {
    if (!coverImage) {
      message.error('Please select an image first');
      return;
    }

    setIsLoading(true);
    
    // Here you would typically upload to your server
    console.log('Uploading image:', coverImage);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      message.success('Cover image uploaded successfully!');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Upload Cover Image</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <DndContainer
          onChangeFile={handleImageUpload}
          aspect={16/9} // Widescreen aspect ratio
          shape="rect"
          text="Drag and drop cover image here"
          orText="click to browse"
          showPreview={true}
          maxSizeMB={10}
        />
        
        <div className="mt-6 flex justify-end">
          <Button 
            type="primary" 
            onClick={handleSubmit}
            loading={isLoading}
            disabled={!coverImage}
          >
            Upload Cover
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoverImageUploadPage;