import React from 'react'

const Container = ({children,className}) => {
  return (
    <div className={`max-w-container m-auto ${className}`}>
        {children}
    </div>
  )
}

export default Container