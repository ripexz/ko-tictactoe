function GameViewModel() {
	var self = this;
	
	self.line = ko.observable("");
	
	self.p1 = new player("Player 1");
	self.p2 = new player("Player 2");
	
	self.turn = ko.observable(1);
	self.moveCount = ko.observable(0);
	
	self.moveData = ko.observableArray([
		{
			row: [
				new gridSquare(1, 1),
				new gridSquare(1, 2),
				new gridSquare(1, 3)
			]
		},
		{
			row: [
				new gridSquare(2, 1),
				new gridSquare(2, 2),
				new gridSquare(2, 3)
			]
		},
		{
			row: [ 
				new gridSquare(3, 1),
				new gridSquare(3, 2),
				new gridSquare(3, 3)
			]
		}
	]);
	
	self.showMove = function(coord) {
		var symbol = (self.turn() == 1) ? "X" : "O";
		if ( !coord.clicked() ) {
			coord.content(symbol);
		}
	}
	
	self.hideMove = function(coord) {
		if ( !coord.clicked() ) {
			coord.content("");
		}
	}
	
	self.makeMove = function(coord) {
		var symbol = (self.turn() == 1) ? "X" : "O";
		if ( !coord.clicked() ) {
			coord.clicked(true);
			coord.content(symbol);
			self.turn(self.turn() * -1);
			self.moveCount(self.moveCount() + 1);
			self.checkStatus(coord.x, coord.y, symbol);
		}
		else {
			alert("Illegal move.");
		}
	}
	
	self.checkStatus = function(x, y, symbol) {
		//check rows
		var win = 3;
		var winner = (symbol == "X") ? self.p1.name : self.p2.name;
		for ( var i = 0; i < win; i++ ) {
			if ( self.moveData()[x-1].row[i].content() != symbol ) {
				break;
			}
			if ( i == win-1 ) {
				self.line("a"+x);
				alert(winner + " wins!");
				self.restart();
			}
		}
		//check columns
		for ( var i = 0; i < win; i++ ) {
			if ( self.moveData()[i].row[y-1].content() != symbol ) {
				break;
			}
			if ( i == win-1 ) {
				self.line("d"+y);
				alert(winner + " wins!");
				self.restart();
			}
		}
		//check diagonal \
		if (x == y) {
			for ( var i = 0; i < win; i++ ) {
				if ( self.moveData()[i].row[i].content() != symbol ) {
					break;
				}
				if ( i == win-1 ) {
					self.line("ltr");
					alert(winner + " wins!");
					self.restart();
				}
			}
		}
		//check diagonal /
		for ( var i = 0; i < win ;i++ ) {
			if ( self.moveData()[i].row[(win-1)-i].content() != symbol ) {
				break;
			}
			if ( i == win-1 ) {
				self.line("rtl");
				alert(winner + " wins!");
				self.restart();
			}
		}
	
		if ( self.moveCount() == 9 )
		{
			alert("Draw!");
			self.restart();
		}
	}
	
	self.restart = function() {
		self.moveCount(0);
		for ( var i = 0; i < self.moveData().length; i++ ) {
			for ( var row = 0; row < self.moveData()[i].row.length; row++ ) {
				self.moveData()[i].row[row].content("");
				self.moveData()[i].row[row].clicked(false);
			}
		}
		self.line("");
	}
}

function player(name) {
	var self = this;
	self.name = name;
}

function gridSquare(x, y) {
	var self = this;
	self.x = x;
	self.y = y;
	self.clicked = ko.observable(false);
	self.content = ko.observable("");
}

ko.applyBindings(new GameViewModel());