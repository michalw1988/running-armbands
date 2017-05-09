var React = require('react');



// style objects
var mainDivStyle = {
	display: 'inline-block',
	marginLeft: 5,
	backgroundColor: '#222',
	color: '#fff',
	textAlign: 'center',
	border: '1px solid #222',
	borderRadius: 7,
	fontSize: 18
};

var leftDivStyle = {
	display: 'inline-block',
	cursor: 'pointer',
	width: 75,
	height: 24,
	borderRadius: '5px 0px 0px 5px'
};

var rightDivStyle = {
	display: 'inline-block',
	cursor: 'pointer',
	width: 75,
	height: 24,
	borderRadius: '0px 5px 5px 0px'
};

var darkBackground = {
	backgroundColor: '#222'
};

var lightBackground = {
	backgroundColor: '#888'
};


// SplitSwitch component class
var SplitSwitch = React.createClass({

	// initial states
	getInitialState: function () {
		return {
			even: true
		};
	},
	
	// rendering component
	render: function () {
		return (
			<div style={mainDivStyle} onClick={this.props.handler}>
				<div style={Object.assign(leftDivStyle, (this.props.even) ? darkBackground : lightBackground)}>
					Równo
				</div>
				<div style={Object.assign(rightDivStyle, (this.props.even) ? lightBackground : darkBackground)}>
					NS
				</div>
			</div>
		);
	}
});


module.exports = SplitSwitch;