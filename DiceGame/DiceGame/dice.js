var cubeSize = 6;
var diceTemplate = null;
var dice = [];
var points = 0;
var diceSize = 6;

function OnLoadDice() {
    diceTemplate = document.getElementById("diceTemplate");
    for (var y = 0; y < cubeSize; y++) {
        for (var x = 0; x < cubeSize; x++) {
            var div = diceTemplate.content.cloneNode(true);
            document.getElementById("diceHolder").appendChild(div);
            dice[dice.length] = new Dice(x, y);
        }
        var newLine = document.createElement("br");
        document.getElementById("diceHolder").appendChild(newLine);
    }
}

function RollDice() {
    var r = Math.floor(Math.random() * diceSize) + 1;

    document.getElementById("rollableDiceNumber").src = "./dice/" + r + "_dice.png";

    points += r * 50;
    for (var i = 0; i < dice.length; i++) {
        dice[i].ChangeDice();
    }
}


class Dice {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.value = 0;

        document.getElementById("dice").id = "dicex" + this.x + "y" + this.y;
        document.getElementById("number").id = "numberx" + this.x + "y" + this.y;
    }

    ChangeDice() {
        var newNum = Math.floor(points / (diceSize** (this.y * cubeSize + this.x))) % 6 + 1;

        document.getElementById("numberx" + this.x + "y" + this.y).src = "./dice/" + newNum + "_dice.png";
        if (this.value == newNum) {
            return false;
        }
        return true;
    }
}