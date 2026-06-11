import React from 'react';
import '../styles/home.css';

const Community = () => {
    const platforms = [
        { name: 'Youtube', color: '#ff0000', url: 'https://youtube.com/@yourchannel' },
        { name: 'LinkedIn', color: '#0a66c2', url: 'https://linkedin.com/in/yourprofile' },
        { name: 'Instagram', color: '#e1306c', url: 'https://instagram.com/yourhandle' },
        { name: 'Twitter', color: '#1da1f2', url: 'https://twitter.com/yourhandle' },
        { name: 'Facebook', color: '#1877f2', url: 'https://facebook.com/yourpage' },
        { name: 'Gmail', color: '#ea4335', url: 'mailto:yourmail@gmail.com' }
    ];

    return (
        <section className="community-section">
            <h2>Explore Our <span>Community!</span></h2>
            <div className="community-grid">
                {platforms.map(p => (
                    <a 
                        key={p.name} 
                        href={p.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="community-btn"
                        style={{ backgroundColor: p.color }}
                    >
                        {p.name}
                    </a>
                ))}
            </div>
        </section>
    );
};
export default Community;