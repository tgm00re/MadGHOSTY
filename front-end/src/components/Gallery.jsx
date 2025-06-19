// src/components/Gallery.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';

// Local image imports
import graduationCover from '../gallery/graduation/graduationImg1.jpg';
import halloweenCover from '../gallery/halloween/halloweenImg1.jpg';

export default function Gallery() {
  const galleries = [
    {
      name: 'Graduation',
      path: '/gallery/graduation',
      cover: graduationCover,
    },
    {
      name: 'Halloween',
      path: '/gallery/halloween',
      cover: halloweenCover,
    },
  ];

  return (
    <div className="gallery-container">
      {galleries.map(({ name, path, cover }, i) => (
        <Link key={i} to={path} className="gallery-item">
          <img src={cover} alt={name} />
          <div className="overlay">
            <span>{name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
