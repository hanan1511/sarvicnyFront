import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Assuming you're using React Router for handling routes

function ResponsePage() {
  const location = useLocation();
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const responseObject = {
      id: queryParams.get('id'),
      pending: queryParams.get('pending') === 'true',
      amount_cents: queryParams.get('amount_cents'),
      success: queryParams.get('success') === 'true',
      is_auth: queryParams.get('is_auth') === 'true',
      is_capture: queryParams.get('is_capture') === 'true',
      is_standalone_payment: queryParams.get('is_standalone_payment') === 'true',
      is_voided: queryParams.get('is_voided') === 'true',
      is_refunded: queryParams.get('is_refunded') === 'true',
      is_3d_secure: queryParams.get('is_3d_secure') === 'true',
      integration_id: queryParams.get('integration_id'),
      profile_id: queryParams.get('profile_id'),
      has_parent_transaction: queryParams.get('has_parent_transaction') === 'true',
    };
    setResponse(responseObject);
  }, [location.search]);

  return (
    <div>
      <h1>Response Page</h1>
      {response && (
        <div>
          <p>ID: {response.id}</p>
          <p>Pending: {response.pending.toString()}</p>
          <p>Amount Cents: {response.amount_cents}</p>
          <p>Success: {response.success.toString()}</p>
          <p>Is Auth: {response.is_auth.toString()}</p>
          <p>Is Capture: {response.is_capture.toString()}</p>
          <p>Is Standalone Payment: {response.is_standalone_payment.toString()}</p>
          <p>Is Voided: {response.is_voided.toString()}</p>
          <p>Is Refunded: {response.is_refunded.toString()}</p>
          <p>Is 3D Secure: {response.is_3d_secure.toString()}</p>
          <p>Integration ID: {response.integration_id}</p>
          <p>Profile ID: {response.profile_id}</p>
          <p>Has Parent Transaction: {response.has_parent_transaction.toString()}</p>
        </div>
      )}
    </div>
  );
}

export default ResponsePage;
