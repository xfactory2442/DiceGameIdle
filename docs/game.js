var auto = null;
var points = 0;

function OnLoad() {
    OnLoadDice();
    OnLoadUpgrades();

    auto = setInterval(Auto, 5000);
}

function Auto() {
    RollDice("rollableDiceNumberAuto");
}

function GetPointsFromDice(dice) {
       
}