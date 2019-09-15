import React from 'react';

const PrivateRoute: React.FC = props => {
    return (
        <div>
            <div>PrivateRoute (routes/PrivateRoute.js)</div>
            {props.children}
        </div>
    );
};

export default PrivateRoute;
