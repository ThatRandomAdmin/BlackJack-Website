//Global variables
var deck = ["ace_hea", "2_hea", "3_hea", "4_hea", "5_hea", "6_hea", "7_hea", "8_hea", "9_hea", "10_hea", "jack_hea", "queen_hea", "king_hea", "ace_spa", "2_spa", "3_spa", "4_spa", "5_spa", "6_spa", "7_spa", "8_spa", "9_spa", "10_spa", "jack_spa", "queen_spa", "king_spa", "ace_clu", "2_clu", "3_clu", "4_clu", "5_clu", "6_clu", "7_clu", "8_clu", "9_clu", "10_clu", "jack_clu", "queen_clu", "king_clu", "ace_dia", "2_dia", "3_dia", "4_dia", "5_dia", "6_dia", "7_dia", "8_dia", "9_dia", "10_dia", "jack_dia", "queen_dia", "king_dia"];
let cards;
let used = [];
let ai_used = [];
let x = 1;
let ai_score;
let score;
let ai_stood = false;

//Updates you score in real-time
function score_check() {
	score = 0;
	for (card in used) {
		card = used[card];
		test = card.charAt(0);
		var y = parseInt(test);
		if (Number.isInteger(y)) {
			if (y === 1) {
				score += 10;
			}
			else {
				score += y;	
			}
		}
		else if (test === "a") {
			placeholder = score + 11;
			if (placeholder <= 21) {
				score += 11;
			}
			else {
				score += 1;
			}
		}
		else {
			score += 10;
		}
	}
	document.getElementById("card_score").innerHTML = ("Your score is: "+score);
}

//Checks ai's score
function ai_score_check() {
	ai_score = 0;
	for (card in ai_used) {
		card = ai_used[card];
		test = card.charAt(0);
		var y = parseInt(test);
		if (Number.isInteger(y)) {
			if (y === 1) {
				ai_score += 10;
			}
			else {
				ai_score += y;	
			}
		}
		else if (test === "a") {
			placeholder = score + 11;
			if (placeholder <= 21) {
				ai_score += 11;
			}
			else {
				ai_score += 1;
			}
		}
		else {
			ai_score += 10;
		}
	}
}

//Resets the game, like F5ing the page
function deck_reset() {
	document.getElementById("button_start").style.display='block';
	document.getElementById("button_reset").style.display='none';
	document.getElementById("crd1").src = ("blackjack_assets/images/card_back.png");
	document.getElementById("crd2").src = ("blackjack_assets/images/card_back.png");
	document.getElementById("crd3").style.display='none';
	document.getElementById("crd4").style.display='none';
	document.getElementById("crd5").style.display='none';
	document.getElementById("crd6").style.display='none';
	document.getElementById("crd7").style.display='none';
	document.getElementById("crd8").style.display='none';
	used = [];
	ai_used = [];
	x = 1;
	score = 0;
	ai_score = 0;
	document.getElementById("button_hit").disabled = true;
	document.getElementById("button_stand").disabled = true;
	document.getElementById("card_score").innerHTML = ("Your score is: "+score)
}

function deck_start() {
	document.getElementById("button_start").style.display='none';
	document.getElementById("button_reset").style.display='block';
	cards = new Array("ace_hea", "2_hea", "3_hea", "4_hea", "5_hea", "6_hea", "7_hea", "8_hea", "9_hea", "10_hea", "jack_hea", "queen_hea", "king_hea", "ace_spa", "2_spa", "3_spa", "4_spa", "5_spa", "6_spa", "7_spa", "8_spa", "9_spa", "10_spa", "jack_spa", "queen_spa", "king_spa", "ace_clu", "2_clu", "3_clu", "4_clu", "5_clu", "6_clu", "7_clu", "8_clu", "9_clu", "10_clu", "jack_clu", "queen_clu", "king_clu", "ace_dia", "2_dia", "3_dia", "4_dia", "5_dia", "6_dia", "7_dia", "8_dia", "9_dia", "10_dia", "jack_dia", "queen_dia", "king_dia");
	ai_stood = false;
	card_start(cards, used)
	ai_start(cards, ai_used);
	document.getElementById("button_hit").disabled = false;
	document.getElementById("button_stand").disabled = false;
}

document.getElementById("button_start").ontouchstart = deck_start();
document.getElementById("button_reset").ontouchstart = deck_reset();
document.getElementById("hit").ontouchstart = hit();

//Deals out the users first 2 cards
function card_start() {
	var i;
	var folder = "blackjack_assets/cards/";
	var type = ".png";
	var id = "crd";

	function random_item(x) {
		return x[Math.floor(Math.random() * x.length)];
	}

	function removeItemOnce(arr, value) {
		var index = arr.indexOf(value);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	}

	for (i = 0; i < 2; i++) {
		var rand = random_item(cards);
		used = used.concat(rand);
		cards = removeItemOnce(cards, rand);
		var path = folder.concat(rand, type);
		x += i;
		var pic_id = id.concat(x.toString());
		
		document.getElementById(pic_id).src = (path);
	}
	score_check();
}

//Deals out the AI's first 2 cards
function ai_start() {
	var i;

	function random_item(x) {
		return x[Math.floor(Math.random() * x.length)];
	}

	function removeItemOnce(arr, value) {
		var index = arr.indexOf(value);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	}

	for (i = 0; i < 2; i++) {
		var rand = random_item(cards);
		ai_used = ai_used.concat(rand);
		cards = removeItemOnce(cards, rand);
	}
	ai_score_check();
}

//Ai decides if it should hit/hold, and then does the corresponding action 
function ai_hit() {
	ai_score_check();
	function random_item(x) {
		return x[Math.floor(Math.random() * x.length)];
	}

	function removeItemOnce(arr, value) {
		var index = arr.indexOf(value);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	}
	if (ai_score <= 16) {
		var rand = random_item(cards);
		ai_used = ai_used.concat(rand);
		cards = removeItemOnce(cards, rand);
	}
	else {
		ai_stood = true;
	}
}

//Gives the player their next card
function hit() {
	var folder = "blackjack_assets/cards/";
	var type = ".png";
	var id = "crd";

	function random_item(x) {
		return x[Math.floor(Math.random() * x.length)];
	}

	function removeItemOnce(arr, value) {
		var index = arr.indexOf(value);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	}

	var rand = random_item(cards);
	used = used.concat(rand);
	cards = removeItemOnce(cards, rand);
	var path = folder.concat(rand, type);
	x++;
	var pic_id = id.concat(x.toString());
		
	document.getElementById(pic_id).src = (path);
	document.getElementById(pic_id).style.display='block';

	score_check();
	if (ai_stood === false) {
		ai_hit();
	}
	if (score > 21) {
		document.getElementById("button_hit").disabled = true;
		document.getElementById("button_stand").disabled = true;
		while (ai_stood === false) {
			ai_hit()
		}
		if (ai_stood === true) {
			if (ai_score > 21 || score > 21) {
				if (ai_score > score) {
					document.getElementById("score").innerHTML = ("Your score was: "+score);
					document.getElementById("ai").innerHTML = ("Ai's score was: "+ai_score);
					showPopUp('win_dialog');
                    setTimeout(function() {
                        closePopUp('win_dialog');
                        deck_reset();
                    }, 4000)
				}
				else {
					document.getElementById("lost_score").innerHTML = ("Your score was: "+score);
					document.getElementById("lost_ai").innerHTML = ("Ai's score was: "+ai_score);
					showPopUp('lose_dialog');
                    setTimeout(function() {
                        closePopUp('lose_dialog');
                        deck_reset();
                    }, 4000)
				}
			}
			else if (ai_score >= score) {
				document.getElementById("lost_score").innerHTML = ("Your score was: "+score);
				document.getElementById("lost_ai").innerHTML = ("Ai's score was: "+ai_score);
				showPopUp('lose_dialog');
                setTimeout(function() {
                    closePopUp('lose_dialog');
                    deck_reset();
                }, 4000)
			}
			else {
				document.getElementById("score").innerHTML = ("Your score was: "+score);
				document.getElementById("ai").innerHTML = ("Ai's score was: "+ai_score);
				showPopUp('win_dialog');
                setTimeout(function() {
                    closePopUp('win_dialog');
                    deck_reset();
                }, 4000)
			}
		}
	}
}

//User stand button, lets ai still play, even if user stood
function stand() {
	document.getElementById("button_hit").disabled = true;
	document.getElementById("button_stand").disabled = true;
	while (ai_stood === false) {
		ai_hit()
	}
	if (ai_stood === true) {
		if (ai_score > 21 || score > 21) {
			if (ai_score > score) {
				document.getElementById("score").innerHTML = ("Your score was: "+score);
				document.getElementById("ai").innerHTML = ("Ai's score was: "+ai_score);
				showPopUp('win_dialog');
                setTimeout(function() {
                    closePopUp('win_dialog');
                    deck_reset();
                }, 4000)
			}
			else {
				document.getElementById("lost_score").innerHTML = ("Your score was: "+score);
				document.getElementById("lost_ai").innerHTML = ("Ai's score was: "+ai_score);
				showPopUp('lose_dialog');
                setTimeout(function() {
                    closePopUp('lose_dialog');
                    deck_reset();
                }, 4000)
			}
		}
		else if (ai_score >= score) {
			document.getElementById("lost_score").innerHTML = ("Your score was: "+score);
			document.getElementById("lost_ai").innerHTML = ("Ai's score was: "+ai_score);
			showPopUp('lose_dialog');
            setTimeout(function() {
                closePopUp('lose_dialog');
                deck_reset();
            }, 4000)
		}
		else {
			document.getElementById("score").innerHTML = ("Your score was: "+score);
			document.getElementById("ai").innerHTML = ("Ai's score was: "+ai_score);
			showPopUp('win_dialog');
            setTimeout(function() {
                closePopUp('win_dialog');
                deck_reset();
            }, 4000)
		}
	}
}