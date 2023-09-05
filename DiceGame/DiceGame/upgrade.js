var upgrades = [];
var upgradeTemplate;
var upgradeDiceTemplate;

function OnLoadUpgrades() {
    upgradeTemplate = document.getElementById("upgradeTemplate");
    upgradeDiceTemplate = document.getElementById("upgradeDiceTemplate");

    upgrades[upgrades.length] = new Upgrade(upgrades.length, "Increase Dice Value by 2", 64, function () { SetDiceMultiplier(diceMultiplier * 2); }, 3);
    upgrades[upgrades.length] = new Upgrade(upgrades.length, "Reduce Auto Interval by 1.1*", 1280040, function () { SetDiceMultiplier(diceMultiplier * 3); }, 4);
}

function BuyUpgrade(id) {
    var num = id.replace(/\D/g, "");
    upgrades[num].Unlock();
}

class Upgrade {
    constructor(id, name, cost, func, costIncrease) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.func = func;
        this.costIncrease = costIncrease;

        var div = upgradeTemplate.content.cloneNode(true);
        document.getElementById("upgrades").appendChild(div);

        document.getElementById("upgrade").id = "upgrade" + this.id;
        document.getElementById("upgradeText").innerHTML = this.name;
        document.getElementById("upgradeText").id = "upgradeText" + this.id;
        document.getElementById("upgradeInner").id = "upgradeInner" + this.id;
        document.getElementById("upgradeBuy").id = "upgradeBuy" + this.id;

        for (var i = 0; i < 3; i++) {
            var diceDiv = upgradeDiceTemplate.content.cloneNode(true);
            document.getElementById("upgradeInner" + this.id).appendChild(diceDiv);

            document.getElementById("dice").id = "upgradeDice_" + i + "_" + this.id;
            document.getElementById("number").id = "number_" + i + "_" + this.id;
            document.getElementById("diceIdText").id = "diceIdText_" + i + "_" + this.id;
        }

        this.SetUpgradeDice();
    }

    Unlock() {
        if (AddPoints(-this.cost)) {
            this.func();
            this.cost *= this.costIncrease;

            this.SetUpgradeDice();
        }
    }

    SetUpgradeDice() {
        var holder = this.cost;
        for (var i = 0; i < 3; i++) {
            if (holder <= 0) {
                document.getElementById("diceIdText_" + i + "_" + this.id).innerHTML = 0;
                document.getElementById("number_" + i + "_" + this.id).src = "./dice/" + 1 + "_dice.png";
            }
            else {
                var newNum = Math.floor(Math.log(holder) / Math.log(6));
                document.getElementById("diceIdText_" + i + "_" + this.id).innerHTML = newNum;
                var innerNumber = Math.floor(holder / (6 ** (newNum)));
                document.getElementById("number_" + i + "_" + this.id).src = "./dice/" + (innerNumber + 1) + "_dice.png";
                holder -= (6 ** (newNum)) * innerNumber;
                console.log(newNum);
                console.log(innerNumber);
            }
        }

    }

    Show() {
        document.getElementById("upgrade" + this.id).style.display = "inline-block";
    }

    Hide() {
        document.getElementById("upgrade" + this.id).style.display = "none";
    }
}