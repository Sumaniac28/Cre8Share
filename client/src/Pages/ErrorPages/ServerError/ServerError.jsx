import React from "react";
import styles from "./ServerError.module.css";
import Typed from "typed.js";

const ServerError = () => {
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Whoops. It seems something went wrong on our end. We apologize for the inconvenience. We're working to fix it."
      ],
      typeSpeed: 30,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);
  return (
    <section id={styles.serverErrorContainer}>
      <h1>500 - Internal Server Error</h1>
     <div> <span ref={el}></span></div>
    </section>
  );
};

export default ServerError;
