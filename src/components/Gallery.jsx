import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

function Gallery({ children }) {
  return (
    <div>
      <LightGallery
        speed={500}
        mode="lg-fade"
        download={false}
        elementClassNames="mt-4 py-10 -mx-6 px-6 md:-pl-8 lg:pr-20 lg:-mr-20 flex gap-2.5 overflow-x-scroll no-scrollbar"
      >
        {children}
      </LightGallery>
    </div>
  );
}

export default Gallery;
