var React = require('react');
var Header = require('./Header.js');
var Footer = require('./Footer.js');
var SplitSwitch = require('./SplitSwitch.js');
var Armband = require('./Armband.js');
var DistanceButton = require('./DistanceButton.js');


// style objects
var mainDivStyle = {
	backgroundColor: '#aaa',
	color: '#222',
	fontFamily: 'Calibri',
	width: 1000,
	margin: '0px auto'
};

var centerDivStyle = {
	padding: 10,
	fontSize: 20
};

var spanStyle = {
	display: 'inline-block',
	minWidth: 78,
	marginBottom: 12
};

var textBoxStyle = {
	border: 0,
	backgroundColor: '#eee',
	width: 60,
	height: 24,
	color: '#222',
	fontSize: 16,
	textAlign: 'center'
};

var centeredDivStyle = {
	textAlign: 'center'
};

var downloadLinkStyle = {
	display: 'inline-block',
	margin: 5,
	border: 0,
	borderRadius: 5,
	backgroundColor: '#222',
	color: '#fff',
	width: 200,
	height: 42,
	fontSize: 20,
	lineHeight: '42px',
	cursor: 'pointer',
	textDecoration: 'none'
};

var hrStyle = {
	margin: -10,
	marginTop: 10,
	marginBottom: 5,
	border: 0,
	borderBottom: '4px dotted #444'
};

var redTextStyle = {
	color: '#d00'
};

var smallMarginStyle = {
	height: 8,
};


// App component class
var App = React.createClass({

	// initial states
	getInitialState: function () {
		return {
			distance: '42.195',
			hours: '3',
			minutes: '00',
			seconds: '00',
			even: true,
			exactPace: '',
			pace: '',
			pace1: '',
			pace2: '',
			error: false
		};
	},
	
	// calculating paces for the first time
	componentWillMount: function() {
		this.calculatePaces();
	},
	
	// updating distance textfield and recalculating paces / armband values
	changeDistance: function(dist) {
		this.setState({
			distance: dist
		}, function () {
				this.calculatePaces();
			}
		);
	},
	
	// updating even/negative-split setting and recalculating paces / armband values
	changeSplitType: function() {
		this.setState({
			even: !this.state.even
		}, function () {
				this.calculatePaces();
			}
		);
	},
	
	// updating distance textfield after any textfield changes and recalculating paces / armband values
	inputChange: function(whichState, e) {
		var key = whichState;
		var value = e.target.value;
		var object  = {};
		object[key] = value;
		this.setState(
			object, 
			function () {
				this.calculatePaces();
			}
		)},
	
	// calculating paces and armband values
	calculatePaces: function() {
		var dist = this.state.distance;
		var h = this.state.hours;
		var m = this.state.minutes;
		var s = this.state.seconds;
		var even = this.state.even;
		
		// validating inputs
		if(
			!dist || 
			!h ||
			!m ||
			!s ||
			isNaN(dist) ||
			!Number.isInteger(parseFloat(h)) ||
			isNaN(h) ||
			!Number.isInteger(parseFloat(m)) ||
			isNaN(m) ||
			!Number.isInteger(parseFloat(s)) ||
			isNaN(s) ||
			h < 0 ||
			m < 0 ||
			m >= 60 ||
			s < 0 ||
			s >= 60
		) {
			this.setState({
				error: true
			});
		} else { 
			// if validation passed, calculating new paces
			var totalS = parseInt(h * 3600) + parseInt(m * 60) + parseInt(s);
			var avgPace = totalS / dist;
			var pace1 = avgPace * 1.01;
			var pace2 = avgPace * 0.99;
			var avgPaceConverted = this.convertPace(avgPace);
			var pace1Converted = this.convertPace(pace1);
			var pace2Converted = this.convertPace(pace2);
			
			this.setState({
				exactPace: avgPace,
				pace: avgPaceConverted,
				pace1: pace1Converted,
				pace2: pace2Converted,
				error: false
			});
		}
	},
	
	// converting paces from s/km to min/km
	convertPace: function(pace) {
			var minutes = Math.floor(pace / 60);
			var seconds = (((pace / 60)%1)*60).toFixed(0);
			if(seconds < 10) {
				seconds = '0' + seconds;
			}
			var converted = minutes + ':' + seconds;
			return converted;
	},
	
	// calling a function from Armband component, that is able to save PNG file on users hard drive
	callSavingImage: function () {
		this.refs.armband.saveImage(this.refs.downloadLink);
	},

	// rendering component
	render: function() {
		return (
			<div style={mainDivStyle}>
				{/* page header */}
				<Header />
				<div style={centerDivStyle}>
					{/* distance textfield */}
					<span style={spanStyle}>Dystans: </span><input style={textBoxStyle} type="text" value={this.state.distance} onChange={this.inputChange.bind(this, 'distance')} /> km 
					{/* buttons to change distance */}
					<DistanceButton handler={this.changeDistance.bind(null, 5)} buttonText="5 km" />
					<DistanceButton handler={this.changeDistance.bind(null, 10)} buttonText="10 km" />
					<DistanceButton handler={this.changeDistance.bind(null, 21.097)} buttonText="półmaraton" />
					<DistanceButton handler={this.changeDistance.bind(null, 42.195)} buttonText="maraton" />
					<br />
					{/* time textfields */}
					<span style={spanStyle}>Czas: </span><input style={textBoxStyle} type="text" value={this.state.hours} onChange={this.inputChange.bind(this, 'hours')} /> h <input style={textBoxStyle} type="text" value={this.state.minutes} onChange={this.inputChange.bind(this, 'minutes')} /> min <input style={textBoxStyle} type="text" value={this.state.seconds} onChange={this.inputChange.bind(this, 'seconds')} /> s
					<br />
					{/* even pace / negative split switch */}
					<span style={spanStyle}>Tempo równe czy negative split?</span> <SplitSwitch even={this.state.even} handler={this.changeSplitType} />
					<hr style={hrStyle} />
					{/* info about paces */}
					<div>
						{
							(this.state.error)
							? <div style={redTextStyle}> {/* if inputs validation not passes */}
									Dane są niepoprawne. Popraw je, aby umożliwić obliczenia i wygenerowanie opaski.
								</div>
							: (this.state.even) /* if inputs validation ok */
								? <div> {/* if even pace selected */}
										Aby uzyskać taki czas, musisz biec w tempie <strong>{this.state.pace} min/km</strong>
									</div>
								: <div> {/* if negative split selected */}
										Aby uzyskać taki czas, musisz biec w średnim tempie <strong>{this.state.pace} min/km</strong>*<br />
										Tempo pierwszej połowy: <strong>{this.state.pace1} min/km</strong><br />
										Tempo drugiej połowy: <strong>{this.state.pace2} min/km</strong><br />
										<small><small>*założony rozkład sił dla negative split: pierwsza połowa 1% wolniej, druga 1% szybciej niż średnie tempo.</small></small>
									</div>
						}
					</div>
					<hr style={hrStyle} />
					<div style={centeredDivStyle}>
						{/* generated armband and link to download it */}
						<div style={smallMarginStyle}></div>
						<Armband ref="armband" error={this.state.error} distance={this.state.distance} even={this.state.even} exactPace={this.state.exactPace} />
						<a ref="downloadLink" style={downloadLinkStyle} onClick={this.callSavingImage} >Pobierz opaskę</a>
					</div>
				</div>
				{/* page footer */}
				<Footer />
			</div>
		);
	}
});


module.exports = App;