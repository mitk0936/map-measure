const action = (type, payload = {}) => {
	return { type, ...payload }
}

export const ADD_MARKER = 'ADD_MARKER'
export const DELETE_MARKER = 'DELETE_MARKER'
export const SET_DRAW_TYPE_POLYGON = 'SET_DRAW_TYPE_POLYGON'
export const SET_DRAW_TYPE_POLYLINE = 'SET_DRAW_TYPE_POLYLINE'

export const addMarker = (markerId, { lat, lng }) => action(ADD_MARKER, { markerId, pos: { lat, lng } })
export const deleteMarker = (markerId) => action(DELETE_MARKER, { markerId })
export const setDrawTypePolygon = () => action(SET_DRAW_TYPE_POLYGON)
export const setDrawTypePolyline = () => action(SET_DRAW_TYPE_POLYLINE)
