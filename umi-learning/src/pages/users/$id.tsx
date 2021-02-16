import React from 'react';

const pathname = window.location.pathname;

export default function({ location, match }: any) {
  let pathname = location.pathname
  let id = match.params.id
  return (
    <b>current page is: {pathname}, user id is: {id}</b>
  );
}
