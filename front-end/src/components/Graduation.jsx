import { useNavigate } from 'react-router-dom';
import './GalleryPage.css';
import Button from 'react-bootstrap/Button';

const imageNames = [
  'graduationImg1.jpg',
  'graduationImg2.jpg',
  'graduationImg3.jpg',
  'graduationImg4.jpg',
];

const images = imageNames.map(name => require(`../gallery/graduation/${name}`));



export default function Graduation() {
    const navigate = useNavigate();

    return (
        <div className="gallery-page graduation-theme">

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
                <div>🎓</div>
                <div>🎊</div>
                <div>🏅</div>
                <div>🎉</div>
            </div>

            {/* Right floating emojis */}
            <div className="floating-decor right">
                <div>📜 </div>
                <div>📚</div>
                <div>🥂</div>
                <div>🦦</div>
            </div>

            <div className="image-grid">
                {images.map((src, i) => (
                    <img key={i} src={src} alt={`graduation ${i + 1}`} className='gallery-item' />
                ))}
            </div>
        </div>
    );
}
