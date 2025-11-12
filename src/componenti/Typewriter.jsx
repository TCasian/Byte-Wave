import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import "./Typewriter.css";

const Typewriter = ({
  strings,
  typeSpeed = 50,
  backSpeed = 25,
  loop = true,
}) => {
  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    typed.current = new Typed(el.current, {
      strings,
      typeSpeed,
      backSpeed,
      loop,
      showCursor: false,
    });

    return () => {
      typed.current.destroy();
    };
  }, [strings, typeSpeed, backSpeed, loop]);

  return <span ref={el} className="typewriter" />;
};

export default Typewriter;
