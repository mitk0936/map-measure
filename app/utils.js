export const omit = (keys, obj) =>
	Object.entries(obj)
		.filter(([ key ]) => !keys.includes(key))
		.reduce((acc, [key, value]) => Object.assign({}, acc, {
			[key]: value,
		}), {})

export const createMapsObjectLatLng = ({ lat, lng }) => new google.maps.LatLng(lat, lng)

export const loadJS = function (src) {
	var ref = window.document.getElementsByTagName('script')[0]
	var script = window.document.createElement('script')
	script.src = src
	script.async = true
	ref.parentNode.insertBefore(script, ref)
}