var React = require('react');


// style object
var smallButtonStyle = {
	marginLeft: 5,
	paddingLeft: 12,
	paddingRight: 12,
	border: 0,
	borderRadius: 5,
	backgroundColor: '#222',
	color: '#fff',
	height: 26,
	fontSize: 15,
	cursor: 'pointer'
}


// DistanceButton component class
var DistanceButton = React.createClass({

	// rendering component
	render: function () {
		return <button style={smallButtonStyle} onClick={this.props.handler} >{this.props.buttonText}</button>;
	}
});


module.exports = DistanceButton;