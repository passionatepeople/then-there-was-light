import React, { useState } from 'react'

import { useInterval } from '../hooks'

interface Props {
  imageUrl: string
  updateInterval?: number
}

export const Webcam: React.FC<Props> = ({ imageUrl, updateInterval = 1000 }) => {
  const [count, setCount] = useState(0)

  useInterval(() => {
    setCount(count + 1)
  }, updateInterval);

  return (
    <div>
      <img src={`${imageUrl}?${count}`} alt="webcam" />
    </div>
  )
}
