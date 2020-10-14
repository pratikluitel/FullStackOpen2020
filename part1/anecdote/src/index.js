import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(6).fill(0));
  const [largest, setLargest] = useState(0);

  const selectRandom = () => setSelected(Math.floor(Math.random() * 6));
  const castVote = (selected) => () => {
    const copy = [...votes];
    copy[selected] += 1;
    if (copy[selected] > copy[largest]) setLargest(selected);
    setVotes(copy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={castVote(selected)}>vote</button>
      <button onClick={selectRandom}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[largest]}</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
