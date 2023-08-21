var auto = null;

function OnLoad() {
    OnLoadDice();
    OnLoadUpgrades();

    auto = setInterval(Auto, 5000);
}

function Auto() {
    RollDice("rollableDiceNumberAuto");
}