import FileUpload from './components/FileUpload';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="container mt-4">
      <h4 className="display-4 text-center mb-4">File Upload</h4>
      <FileUpload />
      <ToastContainer />
    </div>
  );
}

export default App;
