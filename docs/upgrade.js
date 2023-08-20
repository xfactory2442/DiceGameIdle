var upgrades = [];
var upgradeTemplate;

function OnLoadUpgrades() {
    upgradeTemplate = document.getElementById("upgradeTemplate");

    upgrades[upgrades.length] = new Upgrade(upgrades.length, "Increase Dice Value by 2", 15, function () { SetDiceMultiplier(diceMultiplier * 2); });
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
        document.getElementById("upgradeCost").innerHTML = "Cost: " + this.cost;
        document.getElementById("upgradeCost").id = "upgradeCost" + this.id;

    }

    Unlock() {
        if (AddPoints(-this.cost)) {
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