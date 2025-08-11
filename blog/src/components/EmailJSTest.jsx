import React from 'react';
import emailjs from 'emailjs-com';

// Test component to verify EmailJS configuration
const EmailJSTest = () => {
  const testEmailJS = () => {
    const testParams = {
      from_name: "Test User",
      from_email: "test@example.com",
      message: "This is a test message to verify EmailJS template configuration.",
      timestamp: new Date().toLocaleString()
    };

    console.log('Testing EmailJS with params:', testParams);

    emailjs.send(
      'service_mqx6mdd',
      'template_l8qc4gk',
      testParams,
      'xovb8DpxDw8-pEpBA'
    )
    .then((response) => {
      console.log('✅ Test email sent successfully!', response);
      alert('Test email sent! Check your inbox to see if the user info appears correctly.');
    })
    .catch((error) => {
      console.error('❌ Test email failed:', error);
      alert('Test email failed. Check console for details.');
    });
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>EmailJS Configuration Test</h3>
      <p>Click the button below to send a test email and verify your template configuration:</p>
      <button onClick={testEmailJS} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Send Test Email
      </button>
      <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
        <p><strong>Expected in your inbox:</strong></p>
        <ul>
          <li>Subject: "New Contact Form Message from Test User"</li>
          <li>Body should show: Name, Email, and Message clearly</li>
          <li>Email should come from your configured email address</li>
        </ul>
      </div>
    </div>
  );
};

export default EmailJSTest;