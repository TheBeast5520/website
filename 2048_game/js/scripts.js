var i, j, k;
var grid = [0, 16, 128, 1024,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0];
var one_digit_size = 4;
var two_digit_size = 3;
var three_digit_size = 2.75;
var four_digit_size = 2;
var colors = {
	"2":["#776e65", "#eee4da", one_digit_size],
	"4":["#776e65","#ede0c8", one_digit_size],
	"8":["#f9f6f2","#f2b179", one_digit_size],
	"16":["#f9f6f2","#f59563", two_digit_size],
	"32":["#f9f6f2","#f67c5f", two_digit_size],
	"64":["#f9f6f2","#f65e3b", two_digit_size],
	"128":["#f9f6f2","#edcf72", three_digit_size],
	"256":["#f9f6f2","#edcc61", three_digit_size],
	"512":["#f9f6f2","#edc850", three_digit_size],
	"1024":["#f9f6f2","#edc53f", four_digit_size],
	"2048":["#f9f6f2","#edc22e", four_digit_size],
	"other":["#f9f6f2","#3c3a32", four_digit_size]
}

var update_graphics = function() {
	for (i=0; i<16; i++) {
		if (grid[i] != 0) {
			/* Create tile */
			document.querySelector("#cell-"+i).innerHTML = "<div class=\"tile\"><span></span></div>";
			/* Set number */
			document.querySelector("#cell-"+i+" .tile span").textContent = grid[i];
			/* Set text-color & background color & fontsize */
			if ((""+grid[i]) in colors) {
				document.querySelector("#cell-"+i+" .tile span").style.color = colors[""+grid[i]][0];
				document.querySelector("#cell-"+i+" .tile span").style.fontSize = ""+colors[""+grid[i]][2]+"vw";
				document.querySelector("#cell-"+i+" .tile").style.background = colors[""+grid[i]][1];
			} else {
				document.querySelector("#cell-"+i+" .tile span").style.color = colors["other"][0];
				document.querySelector("#cell-"+i+" .tile span").style.fontSize = ""+colors["other"][2]+"vw";
				document.querySelector("#cell-"+i+" .tile").style.background = colors["other"][1];
			}
		} else {
			document.querySelector("#cell-"+i).innerHTML = "";
		}
	}
}

update_graphics();

var left = function(event, complete) {
	if (complete==undefined) {
		complete=true;
	}
	var temp = Array.from(grid);
	for (i=0; i<4; i++) { // for each row
		var condense = [];
		var new_condense = [];
		for (j=0; j<4; j++) {
			if (grid[i*4+j]==0) continue; 
			condense[condense.length] = grid[i*4+j];
		}
		var counter = 1;
		while (true) {
			if (counter >= condense.length+1) break;
			if (counter == condense.length) {
				new_condense[new_condense.length] = condense[counter-1];
				counter++;
			} else {
				if (condense[counter]==condense[counter-1]) {
					new_condense[new_condense.length] = 2*condense[counter];
					// ---update score here
					counter += 2;
				} else {
					new_condense[new_condense.length] = condense[counter-1]
					counter++;
				}
			}
		}
		for (j=0; j<new_condense.length; j++) grid[i*4 + j] = new_condense[j];
		for (j=new_condense.length; j<4; j++) grid[i*4 + j] = 0;
	}
	if (temp!=grid && complete) {
		add_tile();
		update_graphics();
	}
	return temp!=grid;
}
var right = function(event, complete) {
	if (complete==undefined) {
		complete=true;
	}
	var temp = Array.from(grid);
	for (i=0; i<4; i++) { // for each row
		var condense = [];
		var new_condense = [];
		for (j=3; j>=0; j--) {
			if (grid[i*4+j]==0) continue; 
			condense[condense.length] = grid[i*4+j];
		}
		console.log("HERE");
		var counter = 1;
		while (true) {
			if (counter >= condense.length+1) break;
			if (counter == condense.length) {
				new_condense[new_condense.length] = condense[counter-1];
				counter++;
			} else {
				if (condense[counter]==condense[counter-1]) {
					new_condense[new_condense.length] = 2*condense[counter];
					// ---update score here
					counter += 2;
				} else {
					new_condense[new_condense.length] = condense[counter-1]
					counter++;
				}
			}
		}
		for (j=3; j>3-new_condense.length; j--) grid[i*4 + j] = new_condense[3-j];
		for (j=3-new_condense.length; j>=0; j--) grid[i*4 + j] = 0;
	}
	if (temp!=grid && complete) {
		console.log(temp, grid, temp!=grid);
		add_tile();
		update_graphics();
	}
	return temp!=grid;
}
var up = function() {
	
}
var down = function() {
	
}
var add_tile = function() {
	var num_value = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4][Math.floor(Math.random()*10)];
	var open_spots = [];
	for (i=0; i<16; i++) {
		if (grid[i] == 0) {
			open_spots[open_spots.length] = i;
		}
	}
	grid[open_spots[Math.floor(Math.random()*open_spots.length)]] = num_value;
	return;
}

var start_game = function() {
	document.querySelector("#left").addEventListener('click', left);
	document.querySelector("#right").addEventListener('click', right);
	document.querySelector("#up").addEventListener('click', up);
	document.querySelector("#down").addEventListener('click', down);
	add_tile();
	update_graphics();
}

var end_game = function() {
	for (i=0; i<16; i++) {
		grid[i]=0;
	}
	update_graphics();
	document.querySelector("#left").removeEventListener('click', left);
	document.querySelector("#right").removeEventListener('click', right);
	document.querySelector("#up").removeEventListener('click', up);
	document.querySelector("#down").removeEventListener('click', down);
}

start_game();