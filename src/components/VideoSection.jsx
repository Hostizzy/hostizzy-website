import React from 'react';
import ReactPlayer from 'react-player';

const VideoSection = ({ url, title, subtitle, bgColor = 'white' }) => {
    if (!url) return null;

    return (
        <section className="section" style={{ background: bgColor }}>
            <div className="container" style={{ textAlign: 'center' }}>
                {(title || subtitle) && (
                    <div style={{ marginBottom: '2rem' }}>
                        {title && <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{title}</h2>}
                        {subtitle && <p className="subtitle">{subtitle}</p>}
                    </div>
                )}

                <div style={{
                    position: 'relative',
                    paddingTop: '56.25%', /* 16:9 Aspect Ratio */
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.15)',
                    background: '#000'
                }}>
                    <ReactPlayer
                        url={url}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: 0, left: 0 }}
                        controls={true}
                        light={true} // Shows thumbnail first (better performance)
                    />
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
