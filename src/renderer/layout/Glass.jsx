import React from 'react'

export default function Glass({ children, styles = '' }) {
    return (
        <div className={`p2 backdrop-blur-sm  ${styles}`}>{children}</div>
    )
}
