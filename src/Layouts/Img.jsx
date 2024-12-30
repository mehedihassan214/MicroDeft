import React from 'react'

const Img = ({ className, src, alt, imgclassName }) => {
    return (
        <div className={className}>
            <picture>
                <img src={src} alt={alt} className={imgclassName} loading='lazy' />
            </picture>
        </div>
    )
}

export default Img