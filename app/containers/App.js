import React from 'react'
import styles from '../resources/css/App.css'
import { connect } from 'react-redux'
import { addMarker, deleteMarker, setDrawTypePolygon, setDrawTypePolyline } from '../actions'
import Map from '../components/Map'
import MetricsArea from '../components/MetricsArea'

class App extends React.Component {
	constructor (props) {
		super(props)

		this.calcMetricsValue = this.calcMetricsValue.bind(this)
	}

	shouldComponentUpdate (nextProps) {
		return (JSON.stringify(this.props) !== JSON.stringify(nextProps))
	}

	calcMetricsValue () {

		return 0
	}

	render () {
		const { digits, drawPolygon, addMarker, deleteMarker, markerPositions } = this.props

		const digitsString = drawPolygon ? digits.area : digits.path
		const metricsValue = this.calcMetricsValue()

		return (
			<div className={ styles.app }>
				<Map
					addMarker={ addMarker }
					deleteMarker={ deleteMarker }
					markerPositions={ markerPositions }
					drawPolygon={ drawPolygon } />

				<MetricsArea
					value={ metricsValue }
					digits={ digitsString }
					drawPolygon={ drawPolygon }
					setDrawTypePolygon={ setDrawTypePolygon }
					setDrawTypePolyline={ setDrawTypePolyline } />
			</div>
		)
	}

}

App.propTypes = {
	addMarker: React.PropTypes.func.isRequired,
	deleteMarker: React.PropTypes.func.isRequired,
	setDrawTypePolygon: React.PropTypes.func.isRequired,
	setDrawTypePolyline: React.PropTypes.func.isRequired,
	markerPositions: React.PropTypes.arrayOf(React.PropTypes.shape({
		lat: React.PropTypes.number,
		lng: React.PropTypes.number
	}).isRequired).isRequired,
	drawPolygon: React.PropTypes.bool.isRequired,
	digits: React.PropTypes.shape({
		area: React.PropTypes.string.isRequired,
		path: React.PropTypes.string.isRequired
	})
}

export default connect(function (state) {
	return {
		markerPositions: Object.values(state.mapSelections.markerPositions),
		drawPolygon: state.mapSettings.drawPolygon,
		digits: state.mapSettings.digits
	}
}, {
	addMarker,
	deleteMarker,
	setDrawTypePolygon,
	setDrawTypePolyline
})(App)
