'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function VideoPlayer({ thumbnail, videoId, caption }: { thumbnail: string, videoId: string, caption: string }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="inline-img inline-video-wrapper" style={{ position: 'relative', margin: '48px 0', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', background: '#000' }}>
      {!isPlaying ? (
        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setIsPlaying(true)}>
          <Image src={thumbnail} alt="Video thumbnail" width={800} height={400} style={{ width: '100%', height: '400px', objectFit: 'cover', filter: 'brightness(0.65)', display: 'block' }} />
          <div className="play-btn">
            <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '22px solid var(--primary)', marginLeft: 6 }}></div>
          </div>
        </div>
      ) : (
        <iframe 
          width="100%" 
          height="400" 
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
          title="Construction Video Player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          style={{ display: 'block' }}
        ></iframe>
      )}
      <div className="img-caption" style={{ padding: '12px', background: 'var(--white)', marginTop: 0 }}>▶ Watch: {caption}</div>
    </div>
  )
}
