import React from 'react';

function LazyComp () {
    return <div>{ new Date().toLocaleTimeString() }</div>
}

export default LazyComp