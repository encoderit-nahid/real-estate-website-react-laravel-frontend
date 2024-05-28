// import useWindowDimensions from "@/hooks/useCurrentDisplaySize";
import React, { useState } from "react";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Box, Stack, Typography } from "@mui/material";

const VideoCarousel = ({ videoLinks }) => {
  console.log("🟥 ~ VideoCarousel ~ VideoCarousel:", videoLinks);

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
      {videoLinks.length > 0 && (
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
      )}

      {/* Embedded YouTube iframe */}
      {videoLinks.length > 0 ? (
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
      ) : (
        <Typography
          color={"red"}
          sx={{ p: 2, fontWeight: 600, textAlign: "center" }}
        >
          No video available
        </Typography>
      )}
    </div>
  );
};

export default VideoCarousel;
