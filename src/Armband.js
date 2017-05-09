var React = require('react');


// Armband component class
var Armband = React.createClass({

	// drawing armband for the first time
	componentDidMount() {
		this.updateCanvas();
	},
	
	// redrawing armband only if pace changed, split type change or validation error happened / has been fixed
	shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.exactPace != this.props.exactPace ||
		nextProps.error != this.props.error ||
		nextProps.even != this.props.even;
	},
	
	// redrawing armband after a component has been updated
	componentDidUpdate() {
		this.updateCanvas();
	},
	
	// converting time from seconds to h:mm:ss format
	convertTime: function(time) {
		time = time.toFixed(0);
		var hours = Math.floor(time / 3600);
		var minutes = Math.floor((time % 3600) / 60);
		if (minutes < 10 && time >= 600) {
			minutes = '0' + minutes; 
		}
		var seconds = time%60;
		if (seconds < 10) {
			seconds = '0' + seconds; 
		}
		return (hours > 0) 
			? hours + ':' + minutes + ':' + seconds 
			: minutes + ':' + seconds;
	},
	
  // redrawing armband's canvas
	updateCanvas() {
		var ctx = this.refs.canvas.getContext('2d');
		
		// clearing armband's values and drawing empty box
		ctx.fillStyle = '#fff';
		ctx.fillRect(0,0, 100, 700);
		ctx.fillStyle = '#222';
		ctx.strokeRect(0,0,100,700);
		ctx.strokeRect(1,1,98,698);
		
		// filling armband with values only if inputs validation passed
		if(!this.props.error) {	
		
			// writing distance and time
			ctx.font = '18px Calibri';
			ctx.textAlign = 'center';
			ctx.fillText(this.props.distance + ' km', 50, 20);
			ctx.fillText('w ' + this.convertTime(this.props.exactPace * this.props.distance), 50, 40);
			
			// writing pace type (even / negative split)
			ctx.font = '16px Calibri';
			if (this.props.even) {
				ctx.fillText('równe tempo', 50, 58);
			} else {
				ctx.fillText('negative split', 50, 58);
			}
			
			// drawing lines and other static elements
			ctx.fillRect(0, 65, 100, 2);
			ctx.font = '12px Calibri';
			ctx.textAlign = 'start';
			ctx.fillText('km', 5, 78);
			ctx.fillText('czas', 50, 78);
			ctx.fillRect(0, 82, 100, 2);
			ctx.fillRect(0, 650, 100, 2);
			ctx.font = '16px Calibri';
			ctx.textAlign = 'center';
			ctx.fillText('Udanego', 50, 670);
			ctx.fillText('startu!', 50, 690);			
			
			// calculating how often checkpoints should be displayed
			var dist = this.props.distance;
			var halfDist = dist/2;			
			var interval;
			if (dist <= 2) { 
				interval = 0.1;
			} else if (dist <= 5) {
				interval = 0.2;
			} else if (dist <= 10) {
				interval = 0.5;
			} else if (dist <= 42.195) {
				interval = 1;
			} else if (dist <= 200) {
				interval = 5;
			} else {
				interval = 10;
			}
			
			// calculating paces and how many rows an armband should have 
			var segments = Math.ceil(dist / interval);	
			var avgPace = this.props.exactPace;
			var pace1 = avgPace * 1.01;
			var pace2 = avgPace * 0.99;
			var cumulatedDist = interval;
			var cumulatedTime = 0;
			
			// drawing background for rows
			for (var i = 0; i < segments; i++) {
				if(i%2 === 0) {
					ctx.fillStyle = '#e0e0e0';
				ctx.fillRect(2, 84+i*566/segments, 96, 566/segments);
				} else {
					ctx.fillStyle = '#eee';
				}
			}
			
			ctx.fillStyle = '#222';
			ctx.fillRect(42, 65, 2, 585);
			ctx.font = '12px Calibri';
			ctx.textAlign = 'start';
			
			// writing distances and times
			for (var i = 0; i < segments; i++) {
				
				// text position in a row
				var textYPosition = 84 + i*566/segments + 8 + ((566/segments)-8)/2;
				
				// writing distance
				ctx.fillText(cumulatedDist, 5, textYPosition);
				
				// calculating time
				if(this.props.even) {
					cumulatedTime = cumulatedDist * avgPace;
				} else {
					if (cumulatedDist <= halfDist) {
						cumulatedTime = cumulatedDist * pace1;
					} else {
						cumulatedTime = halfDist * pace1 + (cumulatedDist - halfDist) * pace2;
					}
				}
				
				// writing time
				ctx.fillText(this.convertTime(cumulatedTime), 50, textYPosition);
				
				// increasing distance
				if (i !== segments-2) {
					cumulatedDist = parseFloat(cumulatedDist) + parseFloat(interval);
					(cumulatedDist%1 === 0) ? cumulatedDist = cumulatedDist.toFixed(0) : cumulatedDist = cumulatedDist.toFixed(1);
				} else {
					cumulatedDist = dist;
				}

			}
		}
  },
	
	// saving image as PNG file
	saveImage: function(ref) {
		var canvas = this.refs.canvas;
		var href = canvas.toDataURL();
    ref.href = href;
		var fileName = 'opaska_' + this.props.distance + '_km_' + this.convertTime(this.props.exactPace * this.props.distance) + '_' + ((this.props.even) ? 'rowno' : 'NS');
		fileName = fileName.replace(/[.:]/g, '_');
		ref.download = fileName + '.png';
	},

	// rendering component
	render: function () {
		return (
			<div >
				<canvas ref="canvas" width="100" height="700"/>
			</div>
		);
	}
});


module.exports = Armband;