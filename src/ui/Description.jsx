import React from 'react'

function Description(props) {
  return (
   <span className="text-secondary" {...props}>{props.children}</span>
  )
}

export default Description