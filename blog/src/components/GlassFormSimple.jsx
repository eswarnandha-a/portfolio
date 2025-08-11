import React, { useState } from 'react';
import emailjs from 'emailjs-com';

// Simplified version without auto-reply - use this if the main version keeps failing
const GlassFormSimple = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name.trim(),
      from_email: formData.email.trim(),
      message: formData.message.trim(),
      timestamp: new Date().toLocaleString()
    };

    console.log('Sending email with params:', templateParams);

    // Send only the main email (no auto-reply)
    emailjs.send(
      'service_mqx6mdd',   // Your EmailJS service ID
      'template_l8qc4gk',  // Template ID for receiving message
      templateParams,
      'xovb8DpxDw8-pEpBA'  // Your public key
    )
    .then((response) => {
      console.log('✅ Email sent successfully:', response);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      console.error('❌ Email failed:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.status,
        text: error.text,
        name: error.name
      });
      setSubmitStatus('error');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="glass-form-container">
      <form className="glass-form" onSubmit={handleSubmit}>
        <h2>Contact Me (Simple Version)</h2>
        
        {submitStatus === 'success' && (
          <div className="form-message success">
            Message sent successfully! I'll get back to you soon.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="form-message error">
            Something went wrong. Please try again or email me directly at eswaranand1999@gmail.com
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="glass-input"
            placeholder="Enter your name"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="glass-input"
            placeholder="Enter your email"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="glass-textarea"
            placeholder="Enter your message"
            rows="4"
            required
            disabled={isSubmitting}
          />
        </div>

        <button 
          type="submit" 
          className="glass-submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default GlassFormSimple;