import styled from "styled-components";

export const NotFoundContainer = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  display: flex; /* <-- FALTAVA ISSO */
  flex-direction: column; /* para empilhar h1 e h2 */
  user-select: none;
  background-color: #090814;
  overflow-y: 0;

  & > svg {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
  }

  h1,
  h2 {
    width: 100%;
    text-align: center;
  }

  h1 {
    color: #6c63ff;
    font-size: clamp(5rem, 5.25vw, 11.875rem);
  }

  svg circle.undraw_to-the-moon_w1wa_svg__star {
    animation: floatY 4s ease-in-out infinite alternate;

    @keyframes floatY {
      from {
        cy: 7;
      }
      to {
        cy: 12;
      }
    }
  }

  svg path.undraw_to-the-moon_w1wa_svg__star {
    animation: pulse 10s ease-in-out infinite alternate;

    @keyframes pulse {
      from {
        transform: scale(0.99);
        opacity: 0.8;
      }
      to {
        transform: scale(1.01);
        opacity: 1;
      }
    }
  }

  svg .undraw_to-the-moon_w1wa_svg__right-arm {
    transform-box: fill-box;
    transform-origin: top center;
    animation: moveRight 1.2s ease-in-out infinite alternate;

    @keyframes moveRight {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(5deg);
      }
    }
  }

  svg .undraw_to-the-moon_w1wa_svg__left-arm {
    transform-box: fill-box;
    transform-origin: top center;
    animation: moveLeft 1.2s ease-in-out infinite alternate;

    @keyframes moveLeft {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(-5deg);
      }
    }
  }

  svg .undraw_to-the-moon_w1wa_svg__astronaut {
    transform-box: fill-box;
    transform-origin: top center;
    animation: moveUp 1.2s ease-in-out infinite alternate;

    @keyframes moveUp {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(-5px);
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;

    svg .undraw_to-the-moon_w1wa_svg__star {
      display: none;
    }

    svg {
      width: 100%;
      height: fit-content;
      left: 5vw;
      right: 5vw;
      top: auto;
      bottom: 0;
    }
  }
`;
