import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();

  const scrollPositions = useRef({});

  // Browser native restoration বন্ধ
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  // Save current scroll position
  useEffect(() => {
    const savePosition = () => {
      scrollPositions.current[location.key] = {
        x: window.scrollX,
        y: window.scrollY,
      };
    };

    window.addEventListener("scroll", savePosition);

    return () => {
      window.removeEventListener("scroll", savePosition);
    };
  }, [location.key]);

  // Handle route navigation
  useEffect(() => {
    if (navigationType === "POP") {
      const position = scrollPositions.current[location.key];

      if (position) {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: position.y,
            left: position.x,
            behavior: "instant",
          });
        });
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        });
      }

      return;
    }

    // PUSH / REPLACE
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.key, navigationType]);

  return null;
}

export default ScrollManager;