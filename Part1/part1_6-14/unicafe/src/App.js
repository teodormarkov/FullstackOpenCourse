import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button type="button" onClick={onClick}>{text}</button>
  )
}

const Title = ({ text }) => {
  return (
    <h3>{text}</h3>
  )
}

const StatisticLine = ({ text, value }) => {
  const tr_css = {
    width: "6rem",
    display: "flex",
    justifyContent: "space-between"
  }
  return (
    < table >
      <tr style={tr_css}>
      <td>
        <span>{text}</span>
      </td>
      <td>
        <span>{value}</span>
      </td>
    </tr >
    </table >
  )
}

const Statistics = (props) => {
  if (props.statistics.all === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
      <StatisticLine text='good' value={props.statistics.good} />
      <StatisticLine text='neutral' value={props.statistics.neutral} />
      <StatisticLine text='bad' value={props.statistics.bad} />
      <StatisticLine text='all' value={props.statistics.all} />
      <StatisticLine text='average' value={props.statistics.average} />
      <StatisticLine text='positive' value={props.statistics.positive} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let all = good + neutral + bad;
  let average = 0;
  let positive = 0;
  if (all !== 0) {
    average = (good - bad) / (good + bad + neutral);
    positive = (100 * good) / all;
  }

  let statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: average,
    positive: positive
  }

  return (
    <div>
      <Title text='Give Feedback' />
      <Button onClick={() => { setGood(good + 1) }} text='good' />
      <Button onClick={() => { setNeutral(neutral + 1) }} text='neutral' />
      <Button onClick={() => { setBad(bad + 1) }} text='bad' />
      <Title text='Statistics' />
      <Statistics statistics={statistics} />
    </div>
  )
}

export default App