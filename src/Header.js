var React = require('react');


// style objects
var headerStyle = {
	padding: 5,
	paddingBottom: 15,
	backgroundColor: '#222',
	color: '#fff',
	borderBottom: '7px dashed #aaa',
	textAlign: 'center',
	fontFamily: 'Poiret One, Calibri'
};

var h1Style = {
	margin: 0,
	fontSize: 56
};

var h2Style = {
	margin: 0,
	marginTop: 5
};


// Header component class
var Header = React.createClass({
	// rendering component
	render: function () {
		return (
			<div style={headerStyle}>
				<h1 style={h1Style}>Opaski na biegi</h1>
				<h2 style={h2Style}>Wygeneruj, wydrukuj, zrób życiówkę!</h2>
			</div>
		);
	}
});


module.exports = Header;