import { useState, useEffect, useContext } from "react";
import "./App.css";
import HomePage from "./pages/homePage";
import TwoPlayerMode from "./pages/twoPlayerMode";
import GameData from "./context/gameDB";
import { Route, Routes } from "react-router-dom";

function App() {
  const init = useContext(GameData);

  const [firstPMark, setFirstPMark] = useState("x");

  const [gameDB, setGameDB] = useState(init);

  const [winner, setWinner] = useState(null);

  const [streak, setStreak] = useState({
    x: 0,
    o: 0,
    tie: 0,
  });

  const [highLight, setHighLight] = useState([]);

  const checkWinner = function () {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let winner = false;

    // check for winnng of "Y"
    winCombos.forEach((arr) => {
      winner = arr.every((id) => gameDB[id] === "o");

      if (!winner) return;

      setHighLight(arr);
      setWinner("o");
      setStreak({ o: streak.o++, ...streak });
    });

    // check for winnng of "X"
    winCombos.forEach((arr, i) => {
      winner = arr.every((id) => gameDB[id] === "x");

      if (!winner) return;

      setHighLight(arr);
      setWinner("x");
      setStreak({ x: streak.x++, ...streak });
    });

    // check for tie
    const checkTie = gameDB.some((el) => el === "");

    if (!checkTie && !winner) {
      setStreak({ tie: streak.tie++, ...streak });
      setWinner("tie");
    }
    console.log(highLight);
  };

  useEffect(() => {
    checkWinner();
  }, [gameDB]);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<HomePage setFirstPMark={setFirstPMark}></HomePage>}
        ></Route>

        <Route
          path="/vPlayer"
          element={
            <TwoPlayerMode
              gameDB={gameDB}
              setGameDB={setGameDB}
              winner={winner}
              firstPMark={firstPMark}
              setWinner={setWinner}
              streak={streak}
              setStreak={setStreak}
              highLight={highLight}
              setHighLight={setHighLight}
            ></TwoPlayerMode>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
