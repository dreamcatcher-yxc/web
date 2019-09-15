import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';

function App() {
    const [count, setCount] = useState(0);

    useEffect((prevCount) => {
        // Update the document title using the browser API
        console.log('pervCount: ' + prevCount);
        document.title = `You clicked ${ count } times`;
    });

    return (
        <div>
            <p>You clicked { count } times</p>
            <button onClick={() => setCount(count + 1) }>
                Click me
            </button>
        </div>
    );
}

const renderFeature = () => {
    render(
        <App />,
        document.getElementById('root')
      );
};

export default renderFeature;



