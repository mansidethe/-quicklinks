import React, { useState, useEffect } from 'react'
import './App.css'
import image from './copyclipboard.png'
import axios from 'axios'

function App() {

  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [links, setLinks] = useState([])

  // const generateLink = async () => {
  //   const response = await axios.post('/link', {
  //     url,
  //     slug
  //   })

  //   setShortUrl(response?.data?.data?.shortUrl)
  // }

  // const copyShortUrl = () => {

  //   navigator.clipboard.writeText(shortUrl)
  //   alert('copied to clipboard')
  // }


  // const loadLinks = async () => {
  //   const response = await axios.get('/api/links');

  //   setLinks(response?.data?.data)
  // }

  // useEffect(()=>{
  //   loadLinks();
  // }, [])
  const  generateLink = async () => {
    const response = await axios.post('/link', {
      url,
      slug
    })

    setShortUrl(response?.data?.data?.shortUrl)
  }

  const copyShortUrl = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Copied to clipboard!')
  }

  
  const loadLinks = async () => {
  const response = await axios.get('/api/links');

   setLinks(response?.data?.data)
 }

  useEffect(()=>{
    loadLinks();
   }, [])


  return (
    <div>
      <h1 className='app-title'>🔗 Quick Links</h1>

      <div className='app-container'>

        <div className='link-generation-card'>
          <h2 className='link-gene'>Link Generation</h2>

          <input type='text'
            placeholder='URL'
            className='input-user'
            value={url}
            onChange={(e) => { setUrl(e.target.value) }}
          />

          <input type='text'
            placeholder='Slug (Optional)'
            className='input-user'
            value={slug}
            onChange={(e) => { setSlug(e.target.value) }}
          />

          <div className='short-url-container'>
            <input type='text'
              placeholder='Short URL'
              className='input-short-url'
              value={shortUrl}
              disabled
            />

            <img src={image} alt='copy' className='copy-image' onClick={copyShortUrl} />
          </div>

          < button type='button'
            className='btn-generate-link'
            onClick={generateLink}
          >
            Generate short url</button>
        </div>

       
        <div className='all-links-container'>
            {
              links?.map((linkObj, index)=>{
                const {url, slug, clicks} = linkObj;

                return (
                  <div className="link-card" key={index}>
                    <p>URL: {url}</p>
                    <p>Short URL: {process.env.REACT_APP_BASE_URL}/{slug}</p>
                    <p>Clicks: {clicks}</p>
                  </div>
                )
              })
            }
        </div>

      </div>

    </div>


  )
}

export default App