// import useWindowDimensions from "@/hooks/useCurrentDisplaySize";
import React, { useState } from "react";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Box } from "@mui/material";

const VideoCarousel = ({ videoLinks }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // const { width } = useWindowDimensions();

  const onVideoEnd = () => {
    // Go to the next video when the current one ends
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoLinks.length);
  };

  return (
    <div
      className="video-carousel-container"
      style={{
        position: "relative",
      }}
    >
      <Box
        // className="nav-icons"
        style={{
          position: "absolute",
          bottom: "50px",
          right: "50px",
          display: "flex",
        }}
      >
        {/* Navigation buttons */}
        <button
          style={{
            background: "#F2F5F6",
            borderRadius: "1111px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            cursor: "pointer",
            border: "none",
          }}
          onClick={() =>
            setCurrentVideoIndex(
              (prevIndex) =>
                (prevIndex - 1 + videoLinks.length) % videoLinks.length
            )
          }
        >
          <ArrowBackIosOutlinedIcon
            sx={{
              color: "grey",
              fontSize: "16px",
            }}
          />
        </button>
        <button
          style={{
            background: "#0362F0",
            borderRadius: "1111px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            cursor: "pointer",
            border: "none",
            marginLeft: "10px",
          }}
          onClick={() =>
            setCurrentVideoIndex(
              (prevIndex) => (prevIndex + 1) % videoLinks.length
            )
          }
        >
          <ArrowForwardIosOutlinedIcon
            sx={{
              color: "#ffffff",
              fontSize: "16px",
            }}
          />
        </button>
      </Box>

      {/* Embedded YouTube iframe */}
      <iframe
        title="YouTube Video"
        style={{
          aspectRatio: "4 / 2",
          width: "100%",
        }}
        src={`https://www.youtube.com/embed/${videoLinks[currentVideoIndex]}?autoplay=1`}
        frameborder="0"
        allowfullscreen
        onEnd={onVideoEnd}
      ></iframe>
    </div>
  );
};

export default VideoCarousel;
