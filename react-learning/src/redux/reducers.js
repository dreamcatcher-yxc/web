import { combineReducers } from 'redux'

/**
 * 实际上, 可以将 reducer 看做一个纯粹的函数, 接收旧的 state 和 action, 返回一个新的 state.
 */

/**
 *  reducer 函数中永远不能做的三件事情:
 *  > 修改传入的参数。
 *  > 执行有副作用的操作, 如 API 请求和路由器跳转。
 *  > 调用非纯粹函数, 如 Date.now() 和 Math.random()。
 * 
 *  归纳到一句话和函数式编程的核心概念很相似, 就是: 
 *  只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。
 */

import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'

const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
};

// 不做任何处理
export function todoApp(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }

    // 这里暂不处理任何 action，
    // 仅返回传入的 state。
    return state
}

/**
 * 处理多个 action
 * */ 
export function todoApp2(state = initialState, action) {
    switch (action.type) {
      case SET_VISIBILITY_FILTER:
        return Object.assign({}, state, {
          visibilityFilter: action.filter
        })
      case ADD_TODO:
        return Object.assign({}, state, {
          todos: [
            ...state.todos,
            {
              text: action.text,
              completed: false
            }
          ]
        })
      case TOGGLE_TODO:
          return Object.assign({}, state, {
            todos: state.todos.map((todo, index) => {
              if (index === action.index) {
                return Object.assign({}, todo, {
                  completed: !todo.completed
                })
              }
              return todo
            })
        })
      default:
        return state
    }
}

/**
 * 上面的 Reducer 设计的功能较多, 比较的繁杂, 可以拆分为下面的方式.
 * 从 todoApp2 函数可以发现 reducer 的规律, 每个种类的 action type 都是只会对新 state(传入 state 的深度克隆)
 * 的一部分造成影响
 */
function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
        return [
            ...state,
            {
            text: action.text,
            completed: false
            }
        ]
        case TOGGLE_TODO:
        return state.map((todo, index) => {
            if (index === action.index) {
            return Object.assign({}, todo, {
                completed: !todo.completed
            })
            }
            return todo
        })
        default:
        return state
    }
}

const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
        return action.filter
        default:
        return state
    }
}

/**
 * 此种 reducer 为复合 reducer, 因为它组合了多个简单的 reducer, 可以处理 state 中的多个部分.
 * 
 */
export function todoApp3(state = {}, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        todos: todos(state.todos, action)
    }
}

/**
 * todoApp3 这种形式的 reducer, 可以使用 redux 的 combineReducers  函数简写成如下的形式。
 */
export const todoApp4 = combineReducers({
    visibilityFilter,
    todos
});