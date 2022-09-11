import { Fragment, useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState();
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Request to server
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Set the uploaded file on success
      const { fileName, filePath } = response.data;
      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4 text-center">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={handleFile}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
          <input
            type="submit"
            value="Upload"
            className="btn btn-primary btn-block mt-4"
          />
        </div>
      </form>
    </Fragment>
  );
};

export default FileUpload;
