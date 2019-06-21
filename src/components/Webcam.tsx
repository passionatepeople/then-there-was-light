import React, { useState } from 'react'

import { useInterval } from '../hooks'

interface Props {
  imageUrl: string
}

export const Webcam: React.FC<Props> = ({ imageUrl }) => {
  const [count, setCount] = useState(0)

  useInterval(() => {
    setCount(count + 1)
  }, 1000);

  return (
    <div>
      <img src={`${imageUrl}?${count}`} alt="webcam" />
    </div>
  )
}
