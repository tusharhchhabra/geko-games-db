import Image from "next/image";
import { useState } from "react";

export default function LazyImage({
  key,
  src,
  placeholder,
  alt,
  width,
  height,
  className,
  fadeDuration,
}) {
  const [ready, setReady] = useState(false);

  const handleLoad = () => {
    setReady(true);
  };

  return (
    <Image
      key={key}
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={width ? undefined : "true"}
      placeholder={placeholder ? "blur" : "empty"}
      blurDataURL={placeholder}
      className={className || ""}
      onLoadingComplete={handleLoad}
      style={{
        opacity: ready ? 1 : 0,
        transition: `opacity ${fadeDuration || "0.5"}s ease-in-out`,
        objectPosition: "50% 20%",
      }}
    />
  );
}
