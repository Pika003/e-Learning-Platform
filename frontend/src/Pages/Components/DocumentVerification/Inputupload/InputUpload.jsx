import React, { useState } from 'react';

const InputUpload = ({ label, placeholder }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const uploadFile = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // Adjust the API endpoint based on your server implementation
      fetch('/upload', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log('File uploaded successfully:', data);
          // Handle success or update UI accordingly
        })
        .catch(error => {
          console.error('Error uploading file:', error);
          // Handle error or update UI accordingly
        });
    } else {
      alert('Please choose a file to upload.');
    }
  };

  return (
      <div>
      <label className='text-white ml-7 font-bold'>{label}</label>
      <div className="mt-3 relative">
        {/* Hidden file input */}
        <input
          type="file"
          // value={file ? file.name : ''}
          className="absolute inset-0 z-50 opacity-0 cursor-pointer"
          onChange={handleFileChange}
          readOnly
        />
        {/* Custom styled button */}
        <div className="relative z-0 flex items-center justify-center w-80 py-3 px-7 border-2 text-[#e5e5e5] rounded-md cursor-pointer">
          <span className='mr-28'>
            {file ? file.name : placeholder}
          </span>
          <span className=' bg-[#0D286F] text-white p-[0.4rem] rounded-sm absolute right-2'>Browse Files</span>
        </div>
      </div>
    </div>
  );
}

export default InputUpload;
