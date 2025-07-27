import React, { useState, useEffect, useCallback } from 'react';

/**
 * FormHandler component responsible for sending form data to a specified API endpoint.
 * It manages the loading and error states of the API call.
 *
 * @param {object} props - The component props.
 * @param {object} props.formData - The data to be sent to the API.
 * @param {string} props.apiEndpoint - The URL of the API endpoint.
 * @param {function} [props.onSuccess] - Callback function to execute on successful API response.
 * @param {function} [props.onError] - Callback function to execute on API error.
 * @param {boolean} [props.triggerSend=false] - A boolean prop to trigger the API call.
 * Set to true to initiate the send, then can be reset.
 */
const FormHandler = ({ formData, apiEndpoint, onSuccess, onError, triggerSend }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false); // Prevent multiple triggers

  /**
   * Sends the form data to the specified API endpoint using a POST request.
   * Handles loading, success, and error states.
   * Wrapped in useCallback to prevent unnecessary re-creations, which would
   * cause useEffect to re-run more often than needed.
   */
  const sendFormData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(false); // Reset success state for new attempts

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers like authorization tokens if needed
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // If the response is not OK (e.g., 400, 500 status codes)
        const errorData = await response.json(); // Attempt to parse error message from response body
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      const result = await response.json(); // Parse the successful response body
      console.log('API response:', result);
      setSuccess(true);
      if (onSuccess) {
        onSuccess(result); // Call the success callback with the result
      }
    } catch (err) {
      console.error('Error sending form data:', err);
      setError(err.message); // Set the error message
      if (onError) {
        onError(err.message); // Call the error callback with the message
      }
    } finally {
      setLoading(false); // Always set loading to false after the request
    }
  }, [formData, apiEndpoint, onSuccess, onError]); // Dependencies for useCallback

  // useEffect to trigger the API call when triggerSend changes to true
  useEffect(() => {
    if (triggerSend && apiEndpoint && formData && !hasTriggered && !loading) {
      setHasTriggered(true);
      sendFormData();
    } else if (!triggerSend) {
      setHasTriggered(false); // Reset when trigger is false
    }
  }, [triggerSend, apiEndpoint, formData, sendFormData, hasTriggered, loading]);

  return null; // This component only handles logic, parent component displays status messages
};

export default FormHandler;
