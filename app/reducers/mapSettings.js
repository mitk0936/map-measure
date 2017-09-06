import * as actions from '../actions'
import { omit } from '../utils'

const defaultState = {
	digits: {
		area: 'm',
		path: 'm'
	},
	drawPolygon: true
}

const mapSettings = (state = defaultState, action = { type }) => {
	switch (action.type) {
		case actions.SET_DRAW_TYPE_POLYGON:
			return {
				...state,
				drawPolygon: true
			}
		case actions.SET_DRAW_TYPE_POLYLINE:
			return {
				...state,
				drawPolygon: false
			}
	}

	return state
}

export default mapSettings
