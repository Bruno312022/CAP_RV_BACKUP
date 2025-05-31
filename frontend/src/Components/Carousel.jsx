import React, { useState, useEffect } from 'react';
import '../CSS/Carousel.css';

function Carousel({ items }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [items.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    return (
        <div className="carousel-container">
            <button className="carousel-button prev" onClick={prevSlide}>❮</button>
            <div className="carousel-content">
                {items.map((item, index) => (
                    <a
                        key={item.id}
                        href={item.link}
                        className={`carousel-card ${index === currentIndex ? 'active' : ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="carousel-image-container">
                            <img src={item.imagem} alt={item.nome} className="carousel-image" />
                            <span className="evento-categoria">{item.categoria}</span>
                        </div>
                        <div className="carousel-info">
                            <h3>{item.nome}</h3>
                            <p>{item.descricao}</p>
                            <div className="carousel-footer">
                                <span className="evento-data">Em destaque</span>
                                <span className="evento-link">Saiba mais →</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            <button className="carousel-button next" onClick={nextSlide}>❯</button>
            <div className="carousel-dots">
                {items.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Carousel; 