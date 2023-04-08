import React from 'react';
import {useState} from 'react';
import './counter.scss'

export const Counter = () => {
    const [count, setCount] = useState(0);

    const increaseCount = () => {
        setCount(v => v + 1)
    }
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increaseCount}>Increase</button>
        </div>
    )
}