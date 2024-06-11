import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UrlList = () => {
  const [urls, setUrls] = useState([]);

  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8001/url/analytics'); // Fetching all URLs' analytics
      setUrls(response.data);
    } catch (error) {
      console.error("Error fetching URL data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // This empty dependency array means this useEffect runs once when the component mounts

  const handleRefresh =() => {
    fetchData();
  }

  return (
    <div className='url-list'>
      <div className='heading-container'>
        <h2>URL List</h2>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
      <ul>
        {urls.map((url) => (
          <li key={url.shortId}>
            <p>Short URL: <a href={`http://localhost:8001/${url.shortId}`} target="_blank" rel="noopener noreferrer">http://localhost:8001/{url.shortId}</a></p>
            <p>Long URL: {url.redirectURL}</p>
            <p>Clicks: {url.visitHistory.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlList;
