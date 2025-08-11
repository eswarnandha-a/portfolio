import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const EmailJSDebug = () => {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (step, status, details) => {
    setTestResults(prev => [...prev, { step, status, details, timestamp: new Date().toLocaleString() }]);
  };

  const testMainEmail = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    try {
      addResult('Main Email', 'Testing...', 'Sending main email to you');
      
      const response = await emailjs.send(
        'service_mqx6mdd',
        'template_l8qc4gk',
        {
          from_name: 'Debug Test User',
          from_email: 'debug@test.com',
          message: 'This is a debug test message',
          timestamp: new Date().toLocaleString()
        },
        'xovb8DpxDw8-pEpBA'
      );
      
      addResult('Main Email', 'SUCCESS', `Response: ${JSON.stringify(response)}`);
      return true;
    } catch (error) {
      addResult('Main Email', 'FAILED', `Error: ${error.message} | Status: ${error.status} | Text: ${error.text}`);
      return false;
    }
  };

  const testAutoReply = async () => {
    try {
      addResult('Auto Reply', 'Testing...', 'Sending auto-reply email');
      
      const response = await emailjs.send(
        'service_mqx6mdd',
        'template_qxzxnu7',
        {
          to_name: 'Debug Test User',
          to_email: 'debug@test.com',
          reply_message: 'This is a debug auto-reply test'
        },
        'xovb8DpxDw8-pEpBA'
      );
      
      addResult('Auto Reply', 'SUCCESS', `Response: ${JSON.stringify(response)}`);
      return true;
    } catch (error) {
      addResult('Auto Reply', 'FAILED', `Error: ${error.message} | Status: ${error.status} | Text: ${error.text}`);
      return false;
    }
  };

  const runFullTest = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    const mainEmailSuccess = await testMainEmail();
    
    if (mainEmailSuccess) {
      await testAutoReply();
    }
    
    setIsLoading(false);
  };

  const testMainEmailOnly = async () => {
    setIsLoading(true);
    setTestResults([]);
    await testMainEmail();
    setIsLoading(false);
  };

  const testAutoReplyOnly = async () => {
    setIsLoading(true);
    setTestResults([]);
    await testAutoReply();
    setIsLoading(false);
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #007bff', 
      borderRadius: '8px', 
      margin: '20px',
      backgroundColor: '#f8f9fa'
    }}>
      <h3 style={{ color: '#007bff' }}>🔧 EmailJS Debug Tool</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={runFullTest} 
          disabled={isLoading}
          style={{ 
            padding: '10px 15px', 
            marginRight: '10px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Testing...' : 'Test Full Process'}
        </button>
        
        <button 
          onClick={testMainEmailOnly} 
          disabled={isLoading}
          style={{ 
            padding: '10px 15px', 
            marginRight: '10px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          Test Main Email Only
        </button>
        
        <button 
          onClick={testAutoReplyOnly} 
          disabled={isLoading}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: '#ffc107', 
            color: 'black', 
            border: 'none', 
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          Test Auto-Reply Only
        </button>
      </div>

      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {testResults.map((result, index) => (
          <div 
            key={index} 
            style={{ 
              padding: '10px', 
              margin: '5px 0', 
              borderRadius: '4px',
              backgroundColor: result.status === 'SUCCESS' ? '#d4edda' : 
                             result.status === 'FAILED' ? '#f8d7da' : '#fff3cd',
              border: `1px solid ${result.status === 'SUCCESS' ? '#c3e6cb' : 
                                  result.status === 'FAILED' ? '#f5c6cb' : '#ffeaa7'}`
            }}
          >
            <strong>{result.step}</strong> - 
            <span style={{ 
              color: result.status === 'SUCCESS' ? '#155724' : 
                     result.status === 'FAILED' ? '#721c24' : '#856404',
              fontWeight: 'bold',
              marginLeft: '5px'
            }}>
              {result.status}
            </span>
            <br />
            <small style={{ color: '#666' }}>{result.timestamp}</small>
            <br />
            <code style={{ fontSize: '12px', wordBreak: 'break-all' }}>
              {result.details}
            </code>
          </div>
        ))}
      </div>

      {testResults.length === 0 && !isLoading && (
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          Click a test button to start debugging your EmailJS configuration.
        </p>
      )}
    </div>
  );
};

export default EmailJSDebug;