import React from 'react';

const pathname = window.location.pathname;

export default function() {
    return (
        <b>current page is: {pathname}</b>
      );
  }
