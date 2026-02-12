// Solitaire Game Logic

// Game State
let gameState = {
  stock: [],
  waste: [],
  foundations: [[], [], [], []],
  tableau: [[], [], [], [], [], [], []],
  score: 0,
  moves: 0,
  timeStarted: null
};

let history = [];
let elapsedTime = 0;
let timerInterval = null;
let draggedElement = null;
let draggedData = null;

// Card Suits and Ranks
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suitSymbols = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠'
};

// Helper Functions
function isRed(suit) {
  return suit === 'hearts' || suit === 'diamonds';
}

function getRankValue(rank) {
  const values = {
    'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
    '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13
  };
  return values[rank];
}

function createDeck() {
  const deck = [];
  suits.forEach(suit => {
    ranks.forEach(rank => {
      deck.push({
        id: `${suit}-${rank}`,
        suit: suit,
        rank: rank,
        faceUp: false
      });
    });
  });
  
  // Shuffle using Fisher-Yates algorithm
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  
  return deck;
}

function initializeGame() {
  const deck = createDeck();
  const tableau = [[], [], [], [], [], [], []];
  
  // Deal cards to tableau
  let deckIndex = 0;
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row <= col; row++) {
      const card = deck[deckIndex++];
      card.faceUp = row === col;
      tableau[col].push(card);
    }
  }
  
  // Remaining cards go to stock
  const stock = deck.slice(deckIndex);
  
  return {
    stock: stock,
    waste: [],
    foundations: [[], [], [], []],
    tableau: tableau,
    score: 0,
    moves: 0,
    timeStarted: Date.now()
  };
}

function canMoveToFoundation(card, foundation) {
  if (foundation.length === 0) {
    return card.rank === 'A';
  }
  
  const topCard = foundation[foundation.length - 1];
  return card.suit === topCard.suit && getRankValue(card.rank) === getRankValue(topCard.rank) + 1;
}

function canMoveToTableau(card, targetPile) {
  if (targetPile.length === 0) {
    return card.rank === 'K';
  }
  
  const topCard = targetPile[targetPile.length - 1];
  return isRed(card.suit) !== isRed(topCard.suit) && 
         getRankValue(card.rank) === getRankValue(topCard.rank) - 1;
}

function isGameWon(foundations) {
  return foundations.every(foundation => foundation.length === 13);
}

function getHint() {
  // Check if any cards can be moved to foundations
  for (let i = 0; i < gameState.tableau.length; i++) {
    const pile = gameState.tableau[i];
    if (pile.length > 0) {
      const topCard = pile[pile.length - 1];
      if (topCard.faceUp) {
        for (let j = 0; j < gameState.foundations.length; j++) {
          if (canMoveToFoundation(topCard, gameState.foundations[j])) {
            return `Move ${topCard.rank} of ${topCard.suit} to foundation`;
          }
        }
      }
    }
  }
  
  // Check if waste card can be moved
  if (gameState.waste.length > 0) {
    const wasteCard = gameState.waste[gameState.waste.length - 1];
    for (let j = 0; j < gameState.foundations.length; j++) {
      if (canMoveToFoundation(wasteCard, gameState.foundations[j])) {
        return `Move ${wasteCard.rank} of ${wasteCard.suit} from waste to foundation`;
      }
    }
    
    for (let i = 0; i < gameState.tableau.length; i++) {
      if (canMoveToTableau(wasteCard, gameState.tableau[i])) {
        return `Move ${wasteCard.rank} of ${wasteCard.suit} from waste to tableau`;
      }
    }
  }
  
  // Check for tableau to tableau moves
  for (let i = 0; i < gameState.tableau.length; i++) {
    const pile = gameState.tableau[i];
    if (pile.length > 0) {
      const topCard = pile[pile.length - 1];
      if (topCard.faceUp) {
        for (let j = 0; j < gameState.tableau.length; j++) {
          if (i !== j && canMoveToTableau(topCard, gameState.tableau[j])) {
            return `Move ${topCard.rank} of ${topCard.suit} to another tableau pile`;
          }
        }
      }
    }
  }
  
  if (gameState.stock.length > 0) {
    return 'Draw a card from the stock';
  }
  
  return null;
}

// UI Functions
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.className = 'toast';
  }, 3000);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateUI() {
  // Update stats
  document.getElementById('timer').textContent = formatTime(elapsedTime);
  document.getElementById('moves').textContent = gameState.moves;
  document.getElementById('score').textContent = gameState.score;
  
  // Update stock pile
  const stockEl = document.getElementById('stock');
  stockEl.innerHTML = '';
  if (gameState.stock.length > 0) {
    const cardEl = createCardElement(gameState.stock[gameState.stock.length - 1], false);
    const counter = document.createElement('div');
    counter.className = 'stock-counter';
    counter.textContent = gameState.stock.length;
    cardEl.appendChild(counter);
    stockEl.appendChild(cardEl);
  } else {
    const emptyEl = document.createElement('div');
    emptyEl.className = 'empty-slot';
    emptyEl.textContent = '↻';
    stockEl.appendChild(emptyEl);
  }
  
  // Update waste pile
  const wasteEl = document.getElementById('waste');
  wasteEl.innerHTML = '';
  if (gameState.waste.length > 0) {
    const card = gameState.waste[gameState.waste.length - 1];
    const cardEl = createCardElement(card, true, { type: 'waste', index: 0 });
    wasteEl.appendChild(cardEl);
  } else {
    const emptyEl = document.createElement('div');
    emptyEl.className = 'empty-slot';
    emptyEl.textContent = 'Waste';
    wasteEl.appendChild(emptyEl);
  }
  
  // Update foundations
  gameState.foundations.forEach((foundation, index) => {
    const foundationEl = document.querySelector(`[data-foundation="${index}"]`);
    foundationEl.innerHTML = '';
    
    if (foundation.length > 0) {
      const card = foundation[foundation.length - 1];
      const cardEl = createCardElement(card, true, { type: 'foundation', index: index });
      foundationEl.appendChild(cardEl);
    } else {
      const emptyEl = document.createElement('div');
      emptyEl.className = 'empty-slot foundation-slot';
      emptyEl.textContent = ['♥', '♦', '♣', '♠'][index];
      foundationEl.appendChild(emptyEl);
    }
  });
  
  // Update tableau
  gameState.tableau.forEach((pile, pileIndex) => {
    const tableauEl = document.querySelector(`[data-tableau="${pileIndex}"]`);
    tableauEl.innerHTML = '';
    
    if (pile.length > 0) {
      const container = document.createElement('div');
      container.style.position = 'relative';
      
      pile.forEach((card, cardIndex) => {
        const cardEl = createCardElement(card, card.faceUp, { 
          type: 'tableau', 
          pileIndex: pileIndex, 
          cardIndex: cardIndex 
        });
        
        if (cardIndex > 0) {
          cardEl.classList.add('card-stacked');
        }
        
        container.appendChild(cardEl);
      });
      
      tableauEl.appendChild(container);
    } else {
      const emptyEl = document.createElement('div');
      emptyEl.className = 'empty-slot tableau-slot';
      emptyEl.textContent = 'K';
      tableauEl.appendChild(emptyEl);
    }
  });
}

function createCardElement(card, faceUp, dragData = null) {
  const cardEl = document.createElement('div');
  
  if (!faceUp) {
    cardEl.className = 'card card-back';
    return cardEl;
  }
  
  const colorClass = isRed(card.suit) ? 'card-red' : 'card-black';
  cardEl.className = `card ${colorClass}`;
  
  const contentTop = document.createElement('div');
  contentTop.className = 'card-content';
  
  const rankTop = document.createElement('div');
  rankTop.className = 'card-rank';
  rankTop.textContent = card.rank;
  
  const suitTop = document.createElement('div');
  suitTop.className = 'card-suit';
  suitTop.textContent = suitSymbols[card.suit];
  
  contentTop.appendChild(rankTop);
  contentTop.appendChild(suitTop);
  
  const center = document.createElement('div');
  center.className = 'card-center';
  center.textContent = suitSymbols[card.suit];
  
  const contentBottom = document.createElement('div');
  contentBottom.className = 'card-content';
  contentBottom.style.transform = 'rotate(180deg)';
  
  const rankBottom = document.createElement('div');
  rankBottom.className = 'card-rank';
  rankBottom.textContent = card.rank;
  
  const suitBottom = document.createElement('div');
  suitBottom.className = 'card-suit';
  suitBottom.textContent = suitSymbols[card.suit];
  
  contentBottom.appendChild(rankBottom);
  contentBottom.appendChild(suitBottom);
  
  cardEl.appendChild(contentTop);
  cardEl.appendChild(center);
  cardEl.appendChild(contentBottom);
  
  // Make card draggable
  if (dragData) {
    cardEl.draggable = true;
    cardEl.dataset.card = JSON.stringify({ ...card, ...dragData });
    
    cardEl.addEventListener('dragstart', handleDragStart);
    cardEl.addEventListener('click', () => handleCardClick(card, dragData));
  }
  
  return cardEl;
}

// Drag and Drop Handlers
function handleDragStart(e) {
  draggedElement = e.target;
  const data = JSON.parse(e.target.dataset.card);
  draggedData = data;
  
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', e.target.innerHTML);
  
  setTimeout(() => {
    e.target.classList.add('dragging');
  }, 0);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  if (this.classList.contains('foundation') || this.classList.contains('tableau')) {
    this.classList.add('drag-over');
  }
}

function handleDragLeave(e) {
  if (this.classList.contains('foundation') || this.classList.contains('tableau')) {
    this.classList.remove('drag-over');
  }
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  
  this.classList.remove('drag-over');
  
  if (!draggedData) return false;
  
  const targetType = this.classList.contains('foundation') ? 'foundation' : 'tableau';
  const targetIndex = parseInt(this.dataset[targetType]);
  
  performMove(draggedData, targetType, targetIndex);
  
  if (draggedElement) {
    draggedElement.classList.remove('dragging');
  }
  
  draggedElement = null;
  draggedData = null;
  
  return false;
}

function handleDragEnd(e) {
  if (draggedElement) {
    draggedElement.classList.remove('dragging');
  }
  
  document.querySelectorAll('.drag-over').forEach(el => {
    el.classList.remove('drag-over');
  });
}

// Game Actions
function performMove(sourceData, targetType, targetIndex) {
  history.push(JSON.parse(JSON.stringify(gameState)));
  
  // Remove card(s) from source
  let movedCards = [];
  
  if (sourceData.type === 'tableau') {
    const sourcePile = gameState.tableau[sourceData.pileIndex];
    movedCards = sourcePile.splice(sourceData.cardIndex);
    
    // Flip the top card if needed
    if (sourcePile.length > 0 && !sourcePile[sourcePile.length - 1].faceUp) {
      sourcePile[sourcePile.length - 1].faceUp = true;
    }
  } else if (sourceData.type === 'waste') {
    movedCards = [gameState.waste.pop()];
  } else if (sourceData.type === 'foundation') {
    movedCards = [gameState.foundations[sourceData.index].pop()];
  }
  
  // Check if move is valid
  let isValid = false;
  
  if (targetType === 'tableau') {
    const targetPile = gameState.tableau[targetIndex];
    if (movedCards.length === 1) {
      isValid = canMoveToTableau(movedCards[0], targetPile);
    } else if (sourceData.type === 'tableau' && sourceData.pileIndex !== targetIndex) {
      isValid = canMoveToTableau(movedCards[0], targetPile);
    }
  } else if (targetType === 'foundation') {
    if (movedCards.length === 1) {
      const foundation = gameState.foundations[targetIndex];
      isValid = canMoveToFoundation(movedCards[0], foundation);
    }
  }
  
  if (!isValid) {
    // Revert the move
    gameState = history.pop();
    showToast('Invalid move', 'error');
    updateUI();
    return;
  }
  
  // Add card(s) to target
  if (targetType === 'tableau') {
    gameState.tableau[targetIndex].push(...movedCards);
  } else if (targetType === 'foundation') {
    gameState.foundations[targetIndex].push(...movedCards);
    gameState.score += 10;
  }
  
  gameState.moves++;
  
  updateUI();
  checkWin();
}

function handleCardClick(card, dragData) {
  if (!card.faceUp) return;
  
  // Try to auto-move to foundation
  for (let i = 0; i < gameState.foundations.length; i++) {
    if (canMoveToFoundation(card, gameState.foundations[i])) {
      performMove(dragData, 'foundation', i);
      return;
    }
  }
}

function drawFromStock() {
  if (gameState.stock.length === 0) {
    if (gameState.waste.length === 0) {
      showToast('No cards to draw', 'error');
      return;
    }
    
    // Reset stock from waste
    history.push(JSON.parse(JSON.stringify(gameState)));
    gameState.stock = gameState.waste.reverse().map(card => ({ ...card, faceUp: false }));
    gameState.waste = [];
    gameState.moves++;
    updateUI();
    return;
  }
  
  history.push(JSON.parse(JSON.stringify(gameState)));
  const drawnCard = gameState.stock.pop();
  drawnCard.faceUp = true;
  gameState.waste.push(drawnCard);
  gameState.moves++;
  
  updateUI();
}

function newGame() {
  gameState = initializeGame();
  history = [];
  elapsedTime = 0;
  
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  
  timerInterval = setInterval(() => {
    elapsedTime = Math.floor((Date.now() - gameState.timeStarted) / 1000);
    document.getElementById('timer').textContent = formatTime(elapsedTime);
  }, 1000);
  
  updateUI();
  showToast('New game started!', 'success');
}

function undoMove() {
  if (history.length > 0) {
    gameState = history.pop();
    updateUI();
    showToast('Move undone', 'success');
  } else {
    showToast('No moves to undo', 'error');
  }
}

function showHintAction() {
  const hint = getHint();
  if (hint) {
    showToast(hint, 'info');
  } else {
    showToast('No moves available. Try drawing from the stock.', 'error');
  }
}

function checkWin() {
  if (isGameWon(gameState.foundations)) {
    clearInterval(timerInterval);
    setTimeout(() => {
      showToast(`🎉 Congratulations! You won in ${formatTime(elapsedTime)} with ${gameState.moves} moves!`, 'success');
    }, 500);
  }
}

// Initialize Game
document.addEventListener('DOMContentLoaded', () => {
  // Set up event listeners
  document.getElementById('newGameBtn').addEventListener('click', newGame);
  document.getElementById('undoBtn').addEventListener('click', undoMove);
  document.getElementById('hintBtn').addEventListener('click', showHintAction);
  document.getElementById('stock').addEventListener('click', drawFromStock);
  
  // Set up drop zones
  document.querySelectorAll('.foundation').forEach(el => {
    el.addEventListener('dragover', handleDragOver);
    el.addEventListener('dragenter', handleDragEnter);
    el.addEventListener('dragleave', handleDragLeave);
    el.addEventListener('drop', handleDrop);
  });
  
  document.querySelectorAll('.tableau').forEach(el => {
    el.addEventListener('dragover', handleDragOver);
    el.addEventListener('dragenter', handleDragEnter);
    el.addEventListener('dragleave', handleDragLeave);
    el.addEventListener('drop', handleDrop);
  });
  
  document.addEventListener('dragend', handleDragEnd);
  
  // Start new game
  newGame();
});
