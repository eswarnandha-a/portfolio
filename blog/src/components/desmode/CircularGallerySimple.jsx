import React from "react";
import A1 from "../../assets/desmode/A1.jpg";
import A2 from "../../assets/desmode/A2.jpg";
import A3 from "../../assets/desmode/A3.jpg";
import A4 from "../../assets/desmode/A4.jpg";
import A5 from "../../assets/desmode/A5.jpg";
import A6 from "../../assets/desmode/A6.jpg";
import A7 from "../../assets/desmode/A7.jpg";
import A8 from "../../assets/desmode/A8.jpg";
import "./CircularGallerySimple.css";

const images = [
  { src: A1, alt: "A1", aspect: "portrait" },
  { src: A2, alt: "A2", aspect: "landscape" },
  { src: A3, alt: "A3", aspect: "portrait" },
  { src: A4, alt: "A4", aspect: "landscape" },
  { src: A5, alt: "A5", aspect: "portrait" },
  { src: A6, alt: "A6", aspect: "landscape" },
  { src: A7, alt: "A7", aspect: "portrait" },
  { src: A8, alt: "A8", aspect: "landscape" },
];

export default function CircularGallerySimple() {
  // Arrange images in a circle using CSS transforms, bend=1 (radius=50% of container)
  const radius = '50%'; // bend of 1
  return (
    <div className="circular-gallery-outer">
      <div className="circular-gallery">
        {images.map((img, i) => {
          const angle = (360 / images.length) * i;
          return (
            <div
              key={img.alt}
              className={`gallery-img-box ${img.aspect}`}
              style={{
                transform: `rotate(${angle}deg) translate(${radius}) rotate(-${angle}deg)`
              }}
            >
              <img src={img.src} alt={img.alt} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
