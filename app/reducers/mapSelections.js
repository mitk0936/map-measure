import * as actions from '../actions'
import { omit } from '../utils'

const defaultState = {
	markerPositions: {}
}

const mapSelections = (state = defaultState, action = { type }) => {
	switch (action.type) {
		case actions.ADD_MARKER:
			return {
				...state,
				markerPositions: {
					...state.markerPositions,
					[action.markerId]: action.pos
				}
			}
		case actions.DELETE_MARKER:
			return {
				...state,
				markerPositions: omit([action.markerId], state.markerPositions)
			}
	}

	return state
}

export default mapSelections
