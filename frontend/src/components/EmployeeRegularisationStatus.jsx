import { useEffect, useState } from "react";
import { getMyRegularisations } from "../api/regularisation";

const EmployeeRegularisationStatus = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getMyRegularisations().then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h3>My Regularisation Requests</h3>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r._id}>
              <td>{r.date}</td>
              <td>{r.status}</td>
              <td>{r.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeRegularisationStatus;
