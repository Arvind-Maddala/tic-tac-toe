import styled from "@emotion/styled";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const CustomTableCell = styled(TableCell)`
  color: #2fff;
  height: 100px;
  width: 100px;
  border-radius: 3px;

  :hover {
    color: #2e8b57;
  }
`;

const TicTacToe = () => {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();

  const checkForWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagnol: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
        }
      });
    }
  };

  const handleClick = (num) => {
    if (cells[num] !== "") {
      alert("already clicked");
      return;
    }

    let squares = [...cells];

    if (turn === "X") {
      squares[num] = "X";
      setTurn("O");
    } else {
      squares[num] = "O";
      setTurn("X");
    }

    checkForWinner(squares);
    setCells(squares);
    console.log(squares);
  };

  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
  };

  const Cell = ({ num }) => {
    return <TableCell onClick={() => handleClick(num)}>{cells[num]}</TableCell>;
  };

  return (
    <div className="container">
      <Typography variant="h4">Turn: {turn}</Typography>
      <Table sx={{ maxWidth: 650 }} aria-label="simple table">
        <TableBody>
          <TableRow>
            <Cell num={0} /> <Cell num={1} /> <Cell num={2} />{" "}
          </TableRow>
          <TableRow>
            <TableCell>
              <Cell num={3} />
            </TableCell>
            <TableCell>
              {" "}
              <Cell num={4} />
            </TableCell>
            <TableCell>
              {" "}
              <Cell num={5} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Cell num={6} />
            </TableCell>
            <TableCell>
              {" "}
              <Cell num={7} />
            </TableCell>
            <TableCell>
              {" "}
              <Cell num={8} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {winner && (
        <>
          <p>{winner} is the winner!</p>
          <Button variant="contained" onClick={() => handleRestart()}>
            Play Again
          </Button>
        </>
      )}
    </div>
  );
};

export default TicTacToe;
