/**
 * 根据 action.type 确定对 state 中的某个状态做修改, 并返回修改了该状态的一个全新 state 副本.
 * @param {Object} state 状态集 
 * @param {*} action 将要在状态集上执行的操作
 */
const todos = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      case 'TOGGLE_TODO':
        return state.map(todo =>
          (todo.id === action.id)
            ? {...todo, completed: !todo.completed}
            : todo
        )
      default:
        return state
    }
  }
  
  export default todos
  