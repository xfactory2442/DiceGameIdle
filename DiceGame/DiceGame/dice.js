var cubeSize = 6;
var diceTemplate = null;
var dice = [];
var points = 0;
var diceSize = 6;
var diceMultiplier = 1;

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

    AddPoints(r * diceMultiplier);
}

function GetId(x, y) {
    return y * cubeSize + x
}

function AddPoints(num) {
    if (points + num >= 0) {
        points += num;
        UpdateAllDice();
        return true;
    }
    return false;
}

function UpdateAllDice() {
    for (var i = 0; i < dice.length; i++) {
        dice[i].UpdateDice();
    }
}

function SetDiceMultiplier(multi) {
    diceMultiplier = multi;
    document.getElementById("diceMultiplier").innerHTML = "x" + diceMultiplier;
    document.getElementById("diceMultiplier").style.display = "inline-block";
}


class Dice {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.value = 0;

        document.getElementById("dice").id = "dicex" + this.x + "y" + this.y;
        document.getElementById("number").id = "numberx" + this.x + "y" + this.y;
        document.getElementById("diceIdText").innerHTML = GetId(this.x, this.y);
        document.getElementById("diceIdText").id = "diceIdTextx" + this.x + "y" + this.y;
    }

    UpdateDice() {
        var newNum = Math.floor(points / (diceSize** GetId(this.x, this.y))) % 6 + 1;

        document.getElementById("numberx" + this.x + "y" + this.y).src = "./dice/" + newNum + "_dice.png";
        if (this.value == newNum) {
            return false;
        }
        return true;
    }
}