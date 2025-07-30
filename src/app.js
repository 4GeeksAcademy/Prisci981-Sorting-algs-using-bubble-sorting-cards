import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = () => {
  //write your code here
  const suits = ["♦", "♥", "♠", "♣"];
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const cardContainer = document.querySelector("#cardContainer");
  const sortingList = document.querySelector("#sortingList");
  const generateButton = document.querySelector("#generateButton");
  const sortButton = document.querySelector("#sortButton");
  const inputText = document.querySelector("#inputText");

  let cards = [];

  // Generates one card
  const generateCard = () => {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { suit, value };
  };

  // Converts card value to number for sorting
  const cardValueToNumber = value => {
    if (value === "A") return 1;
    if (value === "J") return 11;
    if (value === "Q") return 12;
    if (value === "K") return 13;
    return parseInt(value);
  };

  // Renders all cards
  const renderCards = cardArray => {
    cardContainer.innerHTML = "";
    cardArray.forEach(card => {
      const cardElement = document.createElement("div");
      cardElement.className = "card";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const cardTitle = document.createElement("div");
      cardTitle.className = "card-title";
      cardTitle.innerHTML = card.value;

      const cardText = document.createElement("div");
      cardText.className = "card-text";
      cardText.innerHTML = card.suit;

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardElement.appendChild(cardBody);
      cardContainer.appendChild(cardElement);
    });
  };

  // Render a single sorting step
  const logSortingStep = (stepArray, stepNum) => {
    const stepItem = document.createElement("li");
    stepItem.className = "list-group-item step";

    stepArray.forEach(card => {
      const cardStep = document.createElement("span");
      cardStep.className = "step-card";
      cardStep.innerHTML = `${card.value}${card.suit}`;
      stepItem.appendChild(cardStep);
    });

    sortingList.appendChild(stepItem);
  };

  // Draw button
  generateButton.addEventListener("click", () => {
    const numberOfCards = parseInt(inputText.value);
    if (isNaN(numberOfCards) || numberOfCards <= 0) {
      alert("Please enter a valid number of cards.");
      return;
    }

    cards = [];
    sortingList.innerHTML = "";

    for (let i = 0; i < numberOfCards; i++) {
      cards.push(generateCard());
    }

    renderCards(cards);
  });

  // Sort button with bubble sort
  sortButton.addEventListener("click", () => {
    if (cards.length === 0) {
      alert("Please draw cards first.");
      return;
    }

    const steps = [];
    const sortedCards = [...cards];

    for (let i = 0; i < sortedCards.length - 1; i++) {
      for (let j = 0; j < sortedCards.length - 1 - i; j++) {
        const current = cardValueToNumber(sortedCards[j].value);
        const next = cardValueToNumber(sortedCards[j + 1].value);

        if (current > next) {
          // Swap
          [sortedCards[j], sortedCards[j + 1]] = [sortedCards[j + 1], sortedCards[j]];
          // Save a deep copy of the state
          steps.push([...sortedCards]);
        }
      }
    }

    renderCards(sortedCards);
    sortingList.innerHTML = "";
    steps.forEach((step, index) => logSortingStep(step, index));
  });
};
