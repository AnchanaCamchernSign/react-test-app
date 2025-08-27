import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0)

    return (
        <div className="flex flex-row gap-4 mb-4">
            <h1>Counter: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            <button onClick={() => setCount(0)}>Clear</button>
        </div>
    )
}

export default Counter