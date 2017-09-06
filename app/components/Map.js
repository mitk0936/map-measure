import React from 'react'
import styles from '../resources/css/App.css'
import { loadJS, createMapsObjectLatLng } from '../utils'

class Map extends React.Component {
	constructor (props) {
		super(props)

		this.map = null
		this.poly = null

		this.addMarker = this.addMarker.bind(this)
		this.updateMarkerPosition = this.updateMarkerPosition.bind(this)
		this.deleteMarker = this.deleteMarker.bind(this)

		this._render = this._render.bind(this)
	}

	_render () {
		const path = Object.values(this.props.markerPositions).map(createMapsObjectLatLng)
		const polyObject = this.props.drawPolygon ? google.maps.Polygon : google.maps.Polyline

		this.poly && this.poly.setMap(null)

		this.poly = new polyObject({
			geodesic: !this.props.drawPolygon,
			strokeColor: '#333',
			strokeWeight: 2,
			path
		})

		this.poly.setMap(this.map)
	}

	render () {
		this.map && this._render()

		return (
			<div ref='map' id={ styles.map }></div>
		)
	}

	initMap () {
		this.map = new google.maps.Map(this.refs.map, {
			zoom: 6,
			center: {
				lat: 42.8489128, // Gabrovo, Bulgaria
				lng: 25.255236
			}
		})

		this.map.addListener('click', this.addMarker)
	}

	addMarker (event = { latLng }) {
		const markerId = `marker-${new Date().getTime()}`

		const marker = new google.maps.Marker({
			position: event.latLng,
			map : this.map,
			optimized : true,
			draggable:true,
			clickable: true,
		})

		google.maps.event.addListener(marker, 'click', this.deleteMarker.bind(this, markerId, marker))
		google.maps.event.addListener(marker, 'dragend', this.updateMarkerPosition.bind(this, markerId, marker))
		google.maps.event.addListener(marker, 'drag', this.updateMarkerPosition.bind(this, markerId, marker))

		google.maps.event.addListener(marker, 'mousedown', (event) => {
			// TODO: set icon
		})

		this.props.addMarker(markerId, {
			lat: event.latLng.lat(),
			lng: event.latLng.lng()
		})
	}

	updateMarkerPosition (markerId, marker, event = { latLng }) {
		this.props.addMarker(markerId, {
			lat: event.latLng.lat(),
			lng: event.latLng.lng()
		})
	}

	deleteMarker (markerId, marker) {
		this.props.deleteMarker(markerId)
		marker.setMap(null)
		marker = null
	}

	componentDidMount () {
		window.initMap = this.initMap.bind(this)
		loadJS('https://maps.googleapis.com/maps/api/js?callback=initMap&region=BG')
	}
}

Map.propTypes = {
	addMarker: React.PropTypes.func.isRequired,
	deleteMarker: React.PropTypes.func.isRequired,
	markerPositions: React.PropTypes.array.isRequired,
	drawPolygon: React.PropTypes.bool.isRequired
}

export default Map
