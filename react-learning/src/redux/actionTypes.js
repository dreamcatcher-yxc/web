const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';

let add = {
    type : ADD_TODO,
    text : 'build my first redux app'
}

let remove = {
    type : REMOVE_TODO,
    text : 'remove my first redux app'
}

export {
    ADD_TODO,
    REMOVE_TODO
};