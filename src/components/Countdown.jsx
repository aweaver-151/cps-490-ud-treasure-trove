import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const calculateTimeLeft = (targetDate) => {
  const difference = +new Date(targetDate) - +new Date()
  let timeLeft = {}

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }
  return timeLeft
}

export function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate))

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)

    // Clear interval on component unmount
    return () => clearTimeout(timer)
  }, [targetDate, timeLeft]) // Re-run effect if targetDate or timeLeft changes

  const timerComponents = []

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{' '}
      </span>,
    )
  })

  return (
    <div>
      {timerComponents.length ? timerComponents : <span>Time is up!</span>}
    </div>
  )
}

Countdown.propTypes = {
  targetDate: PropTypes.instanceOf(Date),
}
