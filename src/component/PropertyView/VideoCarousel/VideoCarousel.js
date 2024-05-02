import useWindowDimensions from "@/hooks/useCurrentDisplaySize";
import React, { useState } from "react";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const VideoCarousel = ({ videoLinks, widthDevice }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const { width } = useWindowDimensions();

  const onVideoEnd = () => {
    // Go to the next video when the current one ends
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoLinks.length);
  };

  return (
    <div className="video-carousel-container">
      <div className="nav-icons">
        {/* Navigation buttons */}
        <button
          style={{
            background: "#F2F5F6",
            borderRadius: "50%",
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
          }}
          onClick={() =>
            setCurrentVideoIndex(
              (prevIndex) => (prevIndex + 1) % videoLinks.length
            )
          }
        >
          <ArrowForwardIosOutlinedIcon
            sx={{
              height: { md: "4vh", lg: "4vh", xl: "4.5vh", xxl: "3.4vh" },
              color: "#ffffff",
            }}
          />
        </button>
      </div>

      {/* Embedded YouTube iframe */}
      <iframe
        title="YouTube Video"
        width={widthDevice === "mobile" ? `100%` : `${width - 300}px`}
        height="500"
        src={`https://www.youtube.com/embed/${videoLinks[currentVideoIndex]}?autoplay=1`}
        frameborder="0"
        allowfullscreen
        onEnd={onVideoEnd}
      ></iframe>
    </div>
  );
};

export default VideoCarousel;
