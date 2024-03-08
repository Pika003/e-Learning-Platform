import React, { useState } from 'react';

const InputUpload = ({ label, placeholder, button }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
      <label className='text-xl text-white ml-3 font-bold relative'>
        {label}:
        <div className="mt-4 relative rounded-md shadow-sm">
         
          <input
          type="file"
            value={file ? file.name : ''}
            placeholder={placeholder}
            onChange={handleFileChange}
            className="focus:border-blue-800 outline-none  placeholder:text-white ring-5 block o  py-3 px-1 border-white border-2 text-white bg-transparent rounded-md"
            readOnly
          />
         
         
        </div>
      </label>
    </div>
  );
}

export default InputUpload;
