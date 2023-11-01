import React from 'react'

const Ask = ({ params }: { params: { count: string } }) => {
  const count = Number(params.count);
  return (
    <div>Ask</div>
  )
}

export default Ask