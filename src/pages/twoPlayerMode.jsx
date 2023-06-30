import "./twoPlayerMode.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faO, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import WinnerScreen from "../components/winnerSreen";
import GameData from "../context/gameDB";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TwoPlayerMode = function ({
  gameDB,
  setGameDB,
  winner,
  firstPMark,
  setWinner,
  streak,
  setStreak,
  highLight,
  setHighLight,
}) {
  const [turn, setTurn] = useState(0);

  const init = useContext(GameData);

  const handleReset = function () {
    setGameDB(init);
    setWinner(null);
    setTurn(0);
    setStreak({
      x: 0,
      o: 0,
      tie: 0,
    });
    setHighLight([]);
  };

  const handlerNextRound = function (e) {
    const curEl = e.target.closest(".button-19");
    if (!curEl) return;

    setGameDB(init);
    setWinner(null);
    setTurn(0);
    setHighLight([]);
  };

  return (
    <motion.div
      animate={{ scale: 1 }}
      initial={{ scale: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="pageContainer"
    >
      <PageTop turn={turn} handleReset={handleReset}></PageTop>
      <GameBoard
        winner={winner}
        gameDB={gameDB}
        turn={turn}
        setTurn={setTurn}
        setGameDB={setGameDB}
        highLight={highLight}
        setHighLight={setHighLight}
      ></GameBoard>
      {winner ? (
        <WinnerScreen
          handleReset={handleReset}
          onNext={handlerNextRound}
          firstPMark={firstPMark}
          winner={winner}
        ></WinnerScreen>
      ) : (
        ""
      )}
      <PlayerStreak
        streak={streak}
        firstPMark={firstPMark}
        winner={winner}
      ></PlayerStreak>
    </motion.div>
  );
};

const PageTop = function ({ turn, handleReset }) {
  return (
    <div className="top">
      <div>
        <FontAwesomeIcon icon={faX} className="xMark_p" />
        <FontAwesomeIcon icon={faO} className="oMark_p" />
      </div>
      <div className="displayTurn">
        {turn ? (
          <FontAwesomeIcon icon={faO} className="turnIcon" />
        ) : (
          <FontAwesomeIcon icon={faX} className="turnIcon" />
        )}
        <p>Turn</p>
      </div>
      <Link to="/">
        <FontAwesomeIcon
          onClick={handleReset}
          icon={faRotateRight}
          className="refresh"
        />
      </Link>
    </div>
  );
};

const GameBoard = function ({
  winner,
  gameDB,
  turn,
  setTurn,
  setGameDB,
  highLight,
}) {
  const handleClick = function (e) {
    if (winner) return;

    const curEl = e.target.closest(".boardCell");
    const id = +curEl.dataset.id;

    setGameDB(
      gameDB.map((el, i) => {
        if (i !== id || (i === id && el !== "")) return el;
        setTurn(turn ? 0 : 1);
        return turn ? "o" : "x";
      })
    );
  };

  return (
    <div className="gameBoard">
      {gameDB.map((el, i) => {
        return (
          <div
            data-id={i}
            className={`boardCell ${highLight.includes(i) ? winner : ""}`}
            onClick={handleClick}
          >
            <FontAwesomeIcon
              icon={faX}
              className={`xMark_large ${el === "x" ? "" : "hidden"}`}
              hidden
            />
            <FontAwesomeIcon
              icon={faO}
              className={`oMark_large ${el === "o" ? "" : "hidden"}`}
            />
          </div>
        );
      })}
    </div>
  );
};

const PlayerStreak = function ({ firstPMark, streak }) {
  return (
    <div className="streakDiv">
      <div className="xStreak">
        <p>X ({firstPMark === "x" ? "P1" : "P2"})</p>
        <p className="streakNum">{streak.x}</p>
      </div>
      <div className="tie">
        <p>TIES</p>
        <p className="streakNum">{streak.tie}</p>
      </div>
      <div className="oStreak">
        <p>O ({firstPMark === "o" ? "P1" : "P2"})</p>
        <p className="streakNum">{streak.o}</p>
      </div>
    </div>
  );
};

export default TwoPlayerMode;
