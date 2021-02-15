import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

/**
 * 当包裹组件的 state 发生变化的时候, 此方法会被调用
 * @param {*} state 包裹组件的 state
 * @param {*} ownProps 包裹组件的 prop
 */
const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

/**
 * 该方法的允许我们将 action 绑定到组件中
 * @param {*} dispatch 对应 redux 的 dispatch(事件分发器)
 * @param {*} ownProps 被包裹组件自身的 prop
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      console.log('filter link click, filter is ', ownProps.filter)
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

// connect 格式 connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink