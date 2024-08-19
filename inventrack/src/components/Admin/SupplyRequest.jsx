import React, { useEffect, useState } from 'react';
import { getSupplyRequests, updateSupplyRequest, deleteSupplyRequest } from '../../api'; // Corrected import path
import './SupplyRequest.css';

const SupplyRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getSupplyRequests(); // Use the imported API function
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching supply requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await updateSupplyRequest(id, { status: 'approved' });
      // Refresh the list of requests after updating
      const response = await getSupplyRequests();
      setRequests(response.data);
    } catch (error) {
      console.error('Error updating supply request:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSupplyRequest(id);
      // Refresh the list of requests after deleting
      const response = await getSupplyRequests();
      setRequests(response.data);
    } catch (error) {
      console.error('Error deleting supply request:', error);
    }
  };

  return (
    <div className="supply-request">
      <h1>Supply Requests</h1>
      <table>
        <thead>
          <tr>
            {/* <th>Product</th> */}
            <th>Quantity</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th> {/* Added Actions column */}
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map(request => (
              <tr key={request.id}>
                {/* <td>{request.product.name}</td> */}
                <td>{request.quantity}</td>
                <td>{request.status}</td>
                <td>{new Date(request.created_at).toLocaleDateString()}</td>
                <td>
                  {request.status === 'pending' && (
                    <button onClick={() => handleApprove(request.id)}>Approve</button>
                  )}
                  <button onClick={() => handleDelete(request.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No supply requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SupplyRequest;
