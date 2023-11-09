import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

function Gallery({ children, onInit, className }) {
  return (
    <div>
      <LightGallery
        speed={500}
        onInit={onInit}
        mode="lg-fade"
        download={false}
        elementClassNames={className}
      >
        {children}
      </LightGallery>
    </div>
  );
}

export default Gallery;
