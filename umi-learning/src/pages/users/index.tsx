import React from 'react';

const UsersLayout: React.FC = props => {
  return (
    <div >
       <h1>hello world!</h1>
      {props.children}
    </div>
  );
};

export default UsersLayout;
