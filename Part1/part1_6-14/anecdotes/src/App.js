import { useState } from 'react'

const Button = (props) => {
  return (
    <div>
      <button type="button" onClick={props.onClick}>{props.text}</button>
    </div>
  )
}

const Title = ({ text }) => {
  return (
    <h3>{text}</h3>
  )
}

const AnecdoteInfo = ({ data, dataindex }) => {
  return (
    <div>
      {data.map((a, index) => { if (index === dataindex) return a.text })}
      < div > has {data.map((a, index) => { if (index === dataindex) return a.votes })} votes</div >
    </div>
  )
}

const App = () => {
  const anecdotes = [
    { text: 'If it hurts, do it more often.', votes: 0 },
    { text: 'Adding manpower to a late software project makes it later!', votes: 0 },
    { text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
    { text: 'Premature optimization is the root of all evil.', votes: 0 },
    { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 },
    { text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0 }
  ];

  const [selected, setSelected] = useState(0)
  const [mostvoted, setMostVoted] = useState(0)
  const [data, setData] = useState(anecdotes);

  //#region Functions
  const getRandomInt = () => Math.floor(Math.random() * 6)

  const getNewAnecdote = () => {
    let random = getRandomInt();
    setSelected(random);
  }

  const addVote = () => {
    let newData = [...data];
    let votecount = newData[selected].votes += 1;
    if (data[mostvoted].votes < votecount) setMostVoted(selected);
    setData(newData);
  }
  //#endregion

  return (
    <div>
      <Title text={"Anecdote of the day"} />
      <AnecdoteInfo data={data} dataindex={selected} />
      <Button onClick={() => { addVote() }} text={"vote"} />
      <Button onClick={() => { getNewAnecdote() }} text={"next anecdote"} />
      <Title text={"Anecdote with most votes"} />
      <AnecdoteInfo data={data} dataindex={mostvoted} />
    </div>
  )
}

export default App