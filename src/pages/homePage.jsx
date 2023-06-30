import "./homePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faO } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import Button from "../components/button";
import { Link } from "react-router-dom";
import ComingSoon from "../components/comingSoon";
import { motion } from "framer-motion";

const HomePage = function ({ setFirstPMark, setSecondPMark }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: -200 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="homePage"
    >
      <div className="imageDiv">
        <FontAwesomeIcon icon={faX} className="xMark" />
        <FontAwesomeIcon icon={faO} className="oMark" />
      </div>
      <div className="optionDiv">
        <p className="pick">pick player 1's mark</p>
        <ChooseMark
          setFirstPMark={setFirstPMark}
          setSecondPMark={setSecondPMark}
        ></ChooseMark>
        <p className="remember">remember: x goes first</p>
      </div>
      <Link className="link" to="vPlayer">
        <Button color="lightBlue">Player vs Player</Button>
      </Link>
      <Button onClick={() => setShowModal(true)} color="yellow">
        Player vs CPU
      </Button>
      <ComingSoon
        classN="modal"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        COMING SOON!
      </ComingSoon>
    </motion.div>
  );
};

const ChooseMark = function ({ setFirstPMark, setSecondPMark }) {
  const iconX = useRef(null);
  const iconY = useRef(null);

  const handleClick = function (e) {
    const curEl = e.target.closest(".select");

    if (!curEl) return;

    iconX.current.classList.remove("selected");
    iconY.current.classList.remove("selected");

    curEl.classList.add("selected");

    const mark = curEl.dataset.mark;
    setFirstPMark(mark);
  };

  return (
    <div className="chooseMark" onClick={handleClick}>
      <div data-mark="x" className="select selected" ref={iconX}>
        <FontAwesomeIcon icon={faX} className="xMark optionX" />
      </div>
      <div data-mark="o" className="select" ref={iconY}>
        <FontAwesomeIcon icon={faO} className="oMark optionY" />
      </div>
    </div>
  );
};

export default HomePage;
