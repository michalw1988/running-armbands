var React = require('react');


// style objects
var footerStyle = {
	backgroundColor: '#222',
	color: '#fff',
	borderTop: '7px dashed #aaa',
	textAlign: 'center',
	padding: 10,
	paddingBottom: 15
};

var pStyle = {
	margin: 0
};

var linkStyle = {
	color: '#0086B3',
	textDecoration: 'none'
};


// Footer component class
var Footer = React.createClass({
	// rendering component
	render: function () {
		return (
			<div style={footerStyle}>
				<p style={pStyle}>Autor strony: <a style={linkStyle} href="https://github.com/michalw1988/" target="_blank">Michał Wiśniewski [MW Projects]</a></p>
				<p style={pStyle}>Stworzone przy użyciu <a style={linkStyle} href="https://facebook.github.io/react/" target="_blank">react.js</a></p>
			</div>
		);
	}
});


module.exports = Footer;