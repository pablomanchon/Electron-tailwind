import React from 'react'

export default function Steel({ children, styles }) {

    return (
        <div className={`p-2 justify-end bg-zinc-800 ${styles}`}>{children}</div>
    )
}
