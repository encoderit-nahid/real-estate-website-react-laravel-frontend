import useWindowDimensions from "@/hooks/useCurrentDisplaySize";
import { Box } from "@mui/material";
import { _imageURL } from "consts";
import Image from "next/image";
import React, { useState } from "react";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const ImageCarousel = ({ imageUrls, imagesPerSlide }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const totalSlides = Math.ceil(imageUrls.length / imagesPerSlide);

  const onPrevClick = () => {
    setCurrentSlideIndex(
      (prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides
    );
  };

  const onNextClick = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const myLoader = ({ src }) => {
    return `${_imageURL}/${src}`;
  };

  const { width, height } = useWindowDimensions();

  return (
    <div>
      {/* Image grid */}
      <Box sx={{ display: "flex", gap: 1, position: "relative" }}>
        {imageUrls
          .slice(
            currentSlideIndex * imagesPerSlide,
            (currentSlideIndex + 1) * imagesPerSlide
          )
          .map((imageUrl, index) => (
            <Image
              key={index}
              className="carousel-image"
              loader={myLoader}
              src={imageUrl}
              alt={`image_${index}`}
              width={`${width - 300}px`}
              height={`${600}`}
              layout="intrinsic" // Make the image responsive
            />
          ))}
      </Box>

      <Box style={{ position: "absolute", bottom: "15%", right: "10%" }}>
        <button
          style={{
            background: "#F2F5F6",
            borderRadius: "50%",
            cursor: "pointer",
            border: "none",
          }}
          onClick={onPrevClick}
        >
          <ArrowBackIosOutlinedIcon
            sx={{
              height: { md: "4vh", lg: "4vh", xl: "4.5vh", xxl: "3.4vh" },
              color: "grey",
            }}
          />
        </button>
        <button
          style={{
            background: "#0362F0",
            borderRadius: "50%",
            cursor: "pointer",
            border: "none",
            marginLeft: "10px",
          }}
          onClick={onNextClick}
        >
          <ArrowForwardIosOutlinedIcon
            sx={{
              height: { md: "4vh", lg: "4vh", xl: "4.5vh", xxl: "3.4vh" },
              color: "#ffffff",
            }}
          />
        </button>
      </Box>
    </div>
  );
};

export default ImageCarousel;
