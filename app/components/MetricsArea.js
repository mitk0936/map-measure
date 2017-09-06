import React from 'react'
import styles from '../resources/css/App.css'

const MetricsArea = ({ value, digits, drawPolygon, setDrawTypePolygon, setDrawTypePolyline }) => {
	return (
		<section className={styles['metrix-area']}>
			<h2>{`${value} ${digits}`}</h2>
			<ul>
				<li className={ drawPolygon ? '' : styles['selected'] } onClick={ setDrawTypePolyline }>Path</li>
				<li className={ drawPolygon ? styles['selected'] : '' } onClick={ setDrawTypePolygon  }>Area</li>
			</ul>
		</section>
	)
}

MetricsArea.propTypes = {
	value: React.PropTypes.number.isRequired,
	digits: React.PropTypes.string.isRequired,
	drawPolygon: React.PropTypes.bool.isRequired,
	setDrawTypePolygon: React.PropTypes.func.isRequired,
	setDrawTypePolyline: React.PropTypes.func.isRequired
}

export default MetricsArea
