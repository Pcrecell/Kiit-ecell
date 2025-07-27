import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const TooltipPortal = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState(null);

  useEffect(() => {
    const el = document.getElementById("tooltip-root");
    if (el) {
      setContainer(el);
      setMounted(true);
    }
  }, []);

  if (!mounted || !container) return null;
  return createPortal(children, container);
};

export default TooltipPortal;
