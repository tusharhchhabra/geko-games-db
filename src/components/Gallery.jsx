import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import lgVideo from "lightgallery/plugins/video";
import "lightgallery/css/lg-video.css";

function Gallery({ children, onInit, className }) {
  return (
    <div>
      <LightGallery
        speed={500}
        onInit={onInit}
        mode="lg-fade"
        download={false}
        startClass="fade-in-short"
        zoomFromOrigin={false}
        elementClassNames={className}
        plugins={[lgVideo]}
        autoplay={true}
        autoplayVideoOnSlide={true}
        gotoNextSlideOnVideoEnd={true}
      >
        {children}
      </LightGallery>
    </div>
  );
}

export default Gallery;
