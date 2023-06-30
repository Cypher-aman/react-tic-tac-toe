import "./winnerScreen.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faO } from "@fortawesome/free-solid-svg-icons";
import Button from "./button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WinnerScreen = function ({ winner, onNext, firstPMark, handleReset }) {
  const [mounted, setMounted] = useState("");

  useEffect(() => {
    setTimeout(() => setMounted(true), 1000);
  }, winner);

  return (
    mounted && (
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="winnerDiv winnerScreen"
      >
        {winner === "tie" ? (
          <p className="playerNum">ROUND TIED</p>
        ) : (
          <PlayerWin firstPMark={firstPMark} winner={winner}></PlayerWin>
        )}

        <NextBtn handleReset={handleReset} onNext={onNext}></NextBtn>
      </motion.div>
    )
  );
};

const PlayerWin = function ({ winner, firstPMark }) {
  return (
    <>
      {" "}
      <p className="playerNum">
        Player {winner === firstPMark ? "1" : "2"} wins!
      </p>
      <div className="playerTag">
        {winner === "x" ? (
          <FontAwesomeIcon icon={faX} className="xMark_p" />
        ) : (
          <FontAwesomeIcon icon={faO} className="oMark_p" />
        )}
        <p className={winner === "x" ? "xWon" : "oWon"}> TAKES THE ROUND!</p>
      </div>
    </>
  );
};

const NextBtn = function ({ onNext, handleReset }) {
  return (
    <div className="nextBtn">
      <Link to="/">
        <Button onClick={handleReset} size="small" color="lightGrey">
          QUIT
        </Button>
      </Link>
      <Button onClick={onNext} size="small" color="yellow">
        NEXT ROUND
      </Button>
    </div>
  );
};

export default WinnerScreen;
