import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const TableFormat = ({ tableName, table, AWB }) => {
  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(AWB);
    toast.success(`Copied: ${tableName}`);
  };

  return (
    <div>
      <div className="headingcontainer">
        <h2>{tableName}</h2>
        <button className="copy-button" onClick={handleCopy}>
          Copy
        </button>
      </div>
      <table className="table">
        <thead className="tablehead">
          <tr>
            <th>{'Search'}</th>
            <th>{'OrigCtry'}</th>
            <th>{'OrigStn'}</th>
            <th>{'DestCtry'}</th>
            <th>{'DestStn'}</th>
            <th>{'Prod'}</th>
            <th>{'ShipperName'}</th>
            <th>{'LastEventStn'}</th>
            <th>{'LastEventCd'}</th>
            <th>{'LastEventRemark'}</th>
          </tr>
        </thead>
        {table.map((curr) => {
          return (
            <tbody>
              <td>{curr.Search}</td>
              <td>{curr.OrigCtry}</td>
              <td>{curr.OrigStn}</td>
              <td>{curr.DestCtry}</td>
              <td>{curr.DestStn}</td>
              <td>{curr.Prod}</td>
              <td>{curr.ShipperName}</td>
              <td>{curr.LastEventStn}</td>
              <td>{curr.LastEventCd}</td>
              <td>{curr.LastEventRemark}</td>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default TableFormat;
