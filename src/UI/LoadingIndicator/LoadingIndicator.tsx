import React from "react";
import { Box } from "@mui/material";
import { styled, keyframes } from "@mui/system";

const runAnimation = keyframes`
    0%, 100% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(5px);
    }
`;

const dotAnimation = keyframes`
    0% {
        transform: scale(0);
        opacity: 1;
    }
    50% {
        transform: scale(1);
        opacity: 0.5;
    }
    100% {
        transform: scale(0);
        opacity: 0;
    }
`;

const barAnimation = keyframes`
    0% {
        background-color: #1976d2;
    }
    50% {
        background-color: #42a5f5;
    }
    100% {
        background-color: #1976d2;
    }
`;

const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const RunnerContainer = styled(Box)`
  position: relative;
  width: 80px;
  height: 80px;
`;

const RunnerIcon = styled("svg")`
  width: 50px;
  height: 50px;
  animation: ${runAnimation} 0.6s infinite;
  position: absolute;
  top: 20px;
  left: 20%;
  transform: translateX(-50%);
  z-index: 2;
`;

const Dot = styled(Box)<{ delay: number }>`
  width: 15px;
  height: 15px;
  background-color: #1976d2;
  border-radius: 50%;
  animation: ${dotAnimation} 1.5s infinite;
  animation-delay: ${(props) => props.delay}s;
`;

const DotContainer = styled(Box)`
  display: flex;
  gap: 6px;
  margin-top: -5px;
`;

const AnimatedBar = styled(Box)`
  width: 60px;
  height: 2px;
  margin-top: -18px;
  animation: ${barAnimation} 1.5s infinite;
  z-index: 1;
  border-radius: 2px;
`;

const LoadingIndicator: React.FC = () => {
  return (
    <LoadingContainer>
      <RunnerContainer>
        <RunnerIcon viewBox="0 0 74 74">
          <g>
            <path
              d="M67.44 39.19h-9.78a3.92 3.92 0 0 1-2.8-1.19l-6-6a1 1 0 0 1 0-1.42 1 1 0 0 1 1.41 0l6.05 6.05a1.92 1.92 0 0 0 1.38.58h9.78a2.14 2.14 0 0 0 1.52-.65 2.16 2.16 0 0 0-1.52-3.71h-7.5a2 2 0 0 1-1.43-.61l-5.95-5.85A1 1 0 0 1 54 25l5.92 5.86h7.52a4.17 4.17 0 0 1 0 8.34z"
              fill="#1976d2"
            />
            <path
              d="M48.45 72A4.47 4.47 0 0 1 44 67.55V52.88a1.11 1.11 0 0 0-.37-.82l-9.43-8.38A8.06 8.06 0 0 1 33 33l6-8.57-7.52-.65a.55.55 0 0 0-.42.15l-6.65 6.71a3.71 3.71 0 0 1-2.68 1.12 3.78 3.78 0 0 1-2.66-6.47L28 16.53a3.33 3.33 0 0 1 2.37-1h14.42a5.4 5.4 0 0 1 2.8.78l4.78 2.87A5.12 5.12 0 0 1 54 26.45l-9 13.39 6.87 6.47a3 3 0 0 1 1 2.18l.11 19A4.45 4.45 0 0 1 48.61 72zm-17-50.22h.22l9.27.79a1 1 0 0 1 .73 1.58l-7.08 10a6.06 6.06 0 0 0 .91 8.07l9.43 8.38a3.1 3.1 0 0 1 1 2.31v14.67A2.48 2.48 0 0 0 48.54 70a2.45 2.45 0 0 0 2.38-2.48l-.11-19a1.05 1.05 0 0 0-.32-.75l-7.49-7a1 1 0 0 1-.15-1.28l9.48-14.09a3.13 3.13 0 0 0-1-4.42l-4.78-2.87a3.36 3.36 0 0 0-1.77-.5H30.36a1.35 1.35 0 0 0-1 .4l-8.9 8.77a1.79 1.79 0 0 0 0 2.52 1.78 1.78 0 0 0 1.27.52 1.77 1.77 0 0 0 1.27-.58l6.65-6.71a2.47 2.47 0 0 1 1.79-.75z"
              fill="#1976d2"
            />
            <path
              d="M30.43 56.26H14.68a4.3 4.3 0 1 1 0-8.59H26l6.32-7.8a1 1 0 0 1 1.56 1.26L27.2 49.3a1 1 0 0 1-.78.37H14.68a2.3 2.3 0 1 0 0 4.59H30l7.32-9.09a1 1 0 0 1 1.56 1.25l-7.62 9.47a1 1 0 0 1-.83.37zM56.3 16.91a7.46 7.46 0 1 1 7.45-7.45 7.46 7.46 0 0 1-7.45 7.45zM56.3 4a5.46 5.46 0 1 0 5.45 5.46A5.47 5.47 0 0 0 56.3 4zM24.33 12.58H14a1 1 0 0 1 0-2h10.33a1 1 0 0 1 0 2zM10.59 12.58h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM13.33 18.8H3a1 1 0 0 1 0-2h10.33a1 1 0 1 1 0 2zM17.74 18.8h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 0 2zM21 36.22H10.63a1 1 0 0 1 0-2H21a1 1 0 0 1 0 2zM25.37 36.22h-1a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2zM18 43H7.63a1 1 0 0 1 0-2H18a1 1 0 0 1 0 2zM4.22 43h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 0 2z"
              fill="#1976d2"
            />
          </g>
        </RunnerIcon>
      </RunnerContainer>
      <AnimatedBar />
      <DotContainer>
        <Dot delay={0} />
        <Dot delay={0.2} />
        <Dot delay={0.4} />
      </DotContainer>
    </LoadingContainer>
  );
};

export default LoadingIndicator;
