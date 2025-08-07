import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Player } from '@lottiefiles/react-lottie-player';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  lottieSrc,
  title = "Card Title",
  containerHeight = "300px",
  containerWidth = "100%",
  cardHeight = "300px",
  cardWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  lottieSize = "w-32 h-32",
  showFigmaIcon = false,
  figmaIconSrc = null,
  figmaLink = null,
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  const handleFigmaClick = () => {
    if (figmaLink) {
      window.open(figmaLink, '_blank');
    }
  };

  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="relative [transform-style:preserve-3d] bg-white rounded-[15px] shadow-lg overflow-hidden"
        style={{
          width: cardWidth,
          height: cardHeight,
          rotateX,
          rotateY,
          scale,
        }}
      >
        <div className="w-full h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center p-6" style={{ minHeight: '200px' }}>
            <div className={`${lottieSize} flex items-center justify-center`}>
              <Player
                src={lottieSrc}
                className="w-full h-full object-contain"
                loop
                autoplay
                style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
          </div>
          <div className="p-4 bg-gradient-to-t from-gray-50 to-transparent">
            <h3 className="text-lg font-semibold text-gray-800">
              {title}
            </h3>
          </div>
        </div>

        {displayOverlayContent && overlayContent && (
          <motion.div
            className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]"
          >
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block shadow-md"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {title}
        </motion.figcaption>
      )}
    </figure>
  );
}