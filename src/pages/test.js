import React, { Fragment, useState, useEffect } from "react";

export const Test = () => {

    const [count, setCount] = useState(0);

    useEffect(() => {
        alert("hello world!");

        return (() => {
            alert("Goodbye world!");
        })
    }, []);

    useEffect(() => {
        console.log("World updated!");
    }, [count]);

    return (
        <Fragment>
            <h1>Count is: {count}</h1>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </Fragment>
    )
}