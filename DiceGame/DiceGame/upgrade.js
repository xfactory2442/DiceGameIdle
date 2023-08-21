var upgrades = [];
var upgradeTemplate;
var upgradeDiceTemplate;

function OnLoadUpgrades() {
    upgradeTemplate = document.getElementById("upgradeTemplate");
    upgradeDiceTemplate = document.getElementById("upgradeDiceTemplate");

    upgrades[upgrades.length] = new Upgrade(upgrades.length, "Increase Dice Value by 2", [3, 1], function () { SetDiceMultiplier(diceMultiplier * 2); });
    upgrades[upgrades.length] = new Upgrade(upgrades.length, "Increase Dice Value by 3", [4, 4], function () { SetDiceMultiplier(diceMultiplier * 3); });
}

function BuyUpgrade(id) {
    var num = id.replace(/\D/g, "");
    upgrades[num].Unlock();
}

class Upgrade {
    constructor(id, name, cost, func) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.func = func;

        var div = upgradeTemplate.content.cloneNode(true);
        document.getElementById("upgrades").appendChild(div);

        document.getElementById("upgrade").id = "upgrade" + this.id;
        document.getElementById("upgradeText").innerHTML = this.name;
        document.getElementById("upgradeText").id = "upgradeText" + this.id;
        document.getElementById("upgradeInner").id = "upgradeInner" + this.id;
        document.getElementById("upgradeBuy").id = "upgradeBuy" + this.id;

        var diceDiv = upgradeDiceTemplate.content.cloneNode(true);
        document.getElementById("upgradeInner" + this.id).appendChild(diceDiv);

        document.getElementById("dice").id = "upgradeDice" + this.id;
        document.getElementById("number").id = "number" + + this.id;
        document.getElementById("diceIdText").innerHTML = this.cost[0];
        document.getElementById("diceIdText").id = "diceIdText" + this.id;
        
        document.getElementById("number" + + this.id).src = "./dice/" + (this.cost[1] + 1) + "_dice.png";
    }

    Unlock() {
        if (AddPoints(-(diceSize** this.cost[0]) * this.cost[1])) {
            this.func();
            this.Hide();
        }
    }

    Show() {
        document.getElementById("upgrade" + this.id).style.display = "inline-block";
    }

    Hide() {
        document.getElementById("upgrade" + this.id).style.display = "none";
    }
}