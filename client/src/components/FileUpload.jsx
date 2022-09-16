import { Fragment, useState } from 'react';
import axios from 'axios';
import TableFormat from './TableFormat';

const FileUpload = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('Choose File');
  const [formattedData, setFormattedData] = useState();

  // Sets the chosen file to state
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  // Sends a request to the server containing the chosen file from handleFile
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
      const {
        data,
        dataAWB,
        cdShipments,
        cdShipmentsAWB,
        shipmentsToRemove,
        shipmentsToRemoveAWB,
      } = response.data;
      // Set the data to state
      setFormattedData({
        data,
        dataAWB,
        cdShipments,
        cdShipmentsAWB,
        shipmentsToRemove,
        shipmentsToRemoveAWB,
      });
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data);
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
      {formattedData ? (
        <div className="tabledata">
          <TableFormat
            tableName={'Shipments to remove'}
            table={formattedData.shipmentsToRemove}
            AWB={formattedData.shipmentsToRemoveAWB}
          />
          <TableFormat
            tableName={'Shipments with checkpoint'}
            table={formattedData.cdShipments}
            AWB={formattedData.cdShipmentsAWB}
          />
          <TableFormat
            tableName={'All shipments'}
            table={formattedData.data}
            AWB={formattedData.dataAWB}
          />
        </div>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default FileUpload;
