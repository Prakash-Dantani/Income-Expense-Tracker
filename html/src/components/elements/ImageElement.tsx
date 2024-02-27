import { Image, Input } from "@chakra-ui/react";
import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  boxSize?: string;
}
const ImageElement = ({ src, alt, boxSize = "60px" }: ImageProps) => {
  return <Image src={src} alt={alt} boxSize={boxSize} />;
};

export default ImageElement;
