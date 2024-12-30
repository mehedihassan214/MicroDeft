import React from 'react'

const ListItem = ({className,title,link, ...attributes}) => {
  return (
    <li className={className}>
        <a href={link} {...attributes}> {title} </a>
    </li>
  )
}

export default ListItem