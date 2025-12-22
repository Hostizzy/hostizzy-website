import React from 'react';

const VideoSection = ({ url, title, subtitle, bgColor = 'white' }) => {
    if (!url) return null;

    // Helper to extract YouTube ID
    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId(url);

    return (
        <section className="section" style={{ background: bgColor }}>
            <div className="container" style={{ textAlign: 'center' }}>
                {(title || subtitle) && (
                    <div style={{ marginBottom: '3rem' }}>
                        {title && <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{title}</h2>}
                        {subtitle && <p className="subtitle" style={{ fontSize: '1.2rem', color: 'var(--color-muted)' }}>{subtitle}</p>}
                    </div>
                )}

                <div style={{
                    position: 'relative',
                    paddingTop: '56.25%', /* 16:9 Aspect Ratio */
                    borderRadius: '2rem',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-premium)',
                    backgroundColor: '#000'
                }}>
                    {videoId ? (
                        <iframe
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                border: 0
                            }}
                            src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=0`}
                            title={title || "YouTube Video"}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'grid',
                            placeItems: 'center',
                            color: 'white'
                        }}>
                            Video unavailable
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
