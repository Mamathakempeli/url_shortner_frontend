import React, { useState } from 'react';
import axios from 'axios';

const UrlForm = ({ onShorten }) => {
  const [longUrl, setLongUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8001/url', { url: longUrl });
      onShorten(response.data);
      setLongUrl('');
    } catch (error) {
      console.error("Error generating short URL", error);
    }
  };

  return (
    <form className='form-style' onSubmit={handleSubmit}>
      <input
        type="url"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        required
      />
      <button type="submit">Shorten URL</button>
    </form>
  );
};

export default UrlForm;
