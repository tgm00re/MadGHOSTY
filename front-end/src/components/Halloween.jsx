import { useNavigate } from 'react-router-dom';
import './GalleryPage.css';
import Button from 'react-bootstrap/Button';

const imageNames = [
  'halloweenImg1.jpg',
  'halloweenImg2.jpg',
  'halloweenImg3.jpg',
  'halloweenImg4.jpg',
  'halloweenImg5.jpg',
  'halloweenImg6.jpg',
  'halloweenImg7.jpg',
];

const images = imageNames.map(name => require(`../gallery/halloween/${name}`));



export default function Halloween() {
    const navigate = useNavigate();

    return (
        <div className="gallery-page halloween-theme">

            {/* Back button */}
            <Button
                variant="pink" // We'll add a custom pink variant below
                onClick={() => navigate('/gallery')}
                className="mb-3"
            >
                ← Back to Gallery
            </Button>


            {/* Left floating emojis */}
            <div className="floating-decor left">
                <div>🎃</div>
                <div>👻</div>
                <div>🕷️</div>
                <div>🐈‍⬛</div>
            </div>

            {/* Right floating emojis */}
            <div className="floating-decor right">
                <div>🧛</div>
                <div>🦇</div>
                <div>🍬</div>
                <div>☠️</div>
            </div>

            <div className="image-grid">
                {images.map((src, i) => (
                    <img key={i} src={src} alt={`Halloween ${i + 1}`} className='gallery-item' />
                ))}
            </div>
        </div>
    );
}
