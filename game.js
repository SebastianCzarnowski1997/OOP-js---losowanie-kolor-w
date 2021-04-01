// wallet
"use strict"

const input = document.getElementById("bid");
const colorsDiv = [...document.querySelectorAll(".color")];
const spans = [...document.querySelectorAll(".score span")]
const walletMoney = document.querySelector('.wallet');

// class for checking value in wallet and adding/sub value to money in wallet
class Wallet {
    constructor(money) {
        let _money = money;
        this.getWalletValue = () => _money;

        this.ifCanPlay = () => {
            if (input.value == "" || input.value === "0") {
                alert("Należy wpisać wartość");
                return false;
            } else if (input.value > _money) {
                alert("Masz za mało pieniędzy, żeby zagrać");
                return false;
            } else if (input.value <= _money) {
                return true;
            }
        }
        this.addingAndSubstracting = (type) => {
            let number = input.value;
            if (type) {
                return _money += number * 3;
            } else if (!type) {
                return _money -= number;
            }
        }
    }
}

// class for loss possibility


class Loss {
    constructor() {
        this.options = ["red", "green", "blue"];
        let _color;
        this.getColor = () => _color;

        this.lossChances = () => {
            _color = [];
            for (let i = 0; i < this.options.length; i++) {
                const indexLoss = Math.floor(Math.random() * 3);
                const indexDifferent = this.options[indexLoss];
                _color.push(indexDifferent);
            }
            return _color
        }

        this.changeColorsDiv = function () {
            this.lossChances();
            for (let i = 0; i < this.options.length; i++) {
                let currentColors = this.getColor();
                colorsDiv[i].style.backgroundColor = currentColors[i];
            }
        }

        this.checkIfWin = function () {
            this.changeColorsDiv();
            let currentColors = this.getColor();
            if ((currentColors[0] === "red" && currentColors[1] === "red" && currentColors[2] === "red") || (currentColors[0] === "green" && currentColors[1] === "green" && currentColors[2] === "green") ||
                (currentColors[0] === "blue" && currentColors[1] === "blue" && currentColors[2] === "blue")) return true;
            return false;
        }

    }
}

// class for showing scores and checking if we win or lose

class Scores {
    constructor(value) {
        this.loss = new Loss();
        this.wallet = new Wallet(value);
        this.wins;
        this.losses;
        this.scores = [];
    }

    fillScores() {
        let currentValues = this.loss.checkIfWin();
        // console.log(currentValues)
        this.wallet.addingAndSubstracting(currentValues);
        this.scores.push(currentValues);
        if (currentValues == true) {
            spans[0].textContent = `Wygrałeś: ${input.value * 3}$`
        } else {
            spans[0].textContent = `Przegrałeś: ${input.value}$`
        }
    }

    showScores() {
        this.fillScores();
        this.wins = this.scores.filter(s => s == true);
        this.losses = this.scores.filter(s => s == false);
    }
    showScoresOnTable() {
        this.showScores();
        spans[1].textContent = this.scores.length;
        spans[2].textContent = this.wins.length;
        spans[3].textContent = this.losses.length;
    }

}

// class for play

class Games {
    constructor(value) {
        document.getElementById("start").addEventListener("click", this.startGame.bind(this));
        this.scores = new Scores(value);
        walletMoney.textContent = this.scores.wallet.getWalletValue();
        this.startingPoint();
    }

    startingPoint() {
        spans[1].textContent = "0";
        spans[2].textContent = "0";
        spans[3].textContent = "0";
    }

    startGame() {
        let ifCanPlay = this.scores.wallet.ifCanPlay();
        if (ifCanPlay) {
            this.scores.showScoresOnTable();
            walletMoney.textContent = this.scores.wallet.getWalletValue();
            input.value = "";
        } else {
            input.value = "";
        }
        this.scores.wallet.getWalletValue();
    }
}
const games = new Games(100);