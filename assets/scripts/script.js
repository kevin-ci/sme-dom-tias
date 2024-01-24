let hero = {
  name: "Spider-man",
  health: 100,
  isAlive: true,
  attacks: {
    webshooter: ["web shooter", 10],
    kick: ["swing kick", 5],
    punch: ["spider punch", 2],
  }
};

let villain = {
  name: "Doctor Octopus",
  health: 100,
  isAlive: true,
  attacks: [
    ["leg strike", 10],
    ["punch", 2],
    ["leg choke", 5],
  ],
  attack() {
    let rand = Math.floor(Math.random() * this.attacks.length);
    let attack = this.attacks[rand];
    statusTextDiv.innerHTML = `${this.name} used his ${attack[0]} attack and dealt ${attack[1]} damage!`;
    hero.health -= attack[1];
    heroHealthDiv.innerHTML = hero.health;
    playerTurn = !playerTurn;
  },
};

let playerTurn = true;
let heroHealthDiv = document.getElementById("hero-health");
heroHealthDiv.innerHTML = hero.health;

let villainHealthDiv = document.getElementById("villain-health");
villainHealthDiv.innerHTML = villain.health;

let statusTextDiv = document.getElementById("status-text");

function villainAttack() {
  villain.attack();
  checkHealth();
}

function handleButtonClick(event) {
  if (playerTurn) {
    let attackName = event.target.dataset.attack;
    let attack = hero.attacks[attackName];
    let attackDamage = Math.ceil(attack[1] * Math.random());
    statusTextDiv.innerHTML = `${hero.name} used his ${attack[0]} attack and dealt ${attackDamage} damage!`;
    villain.health -= attackDamage;
    villainHealthDiv.innerHTML = villain.health;
    playerTurn = !playerTurn;
    setTimeout(villainAttack, 2000);
    checkHealth();
  }
}

const allButtons = document.querySelectorAll('.btn');
for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('click', handleButtonClick);
}

function checkHealth() {
  if (hero.health <= 0) {
    statusTextDiv.innerHTML = `${hero.name} has been defeated!`;
    playerTurn = false;
  }
  else if (villain.health <= 0) {
    statusTextDiv.innerHTML = `${villain.name} has been defeated!`;
    playerTurn = false;
  }
}