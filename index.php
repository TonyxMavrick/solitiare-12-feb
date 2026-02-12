<?php
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Play free Klondike Solitaire online instantly. No download required. Smooth gameplay, drag & drop cards, mobile friendly. Perfect for office breaks and casual gaming.">
  <meta name="keywords" content="solitaire, online solitaire, klondike, card game, free solitaire, play solitaire">
  <title>Online Solitaire - Play Free Solitaire Card Game Online</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Navigation -->
  <nav class="nav">
    <div class="nav-container">
      <a href="index.html" class="nav-logo">♠ Online Solitaire</a>
      <ul class="nav-menu">
        <li><a href="index.html" class="nav-link active">Play</a></li>
        <li><a href="about.html" class="nav-link">About</a></li>
        <li><a href="contact.html" class="nav-link">Contact</a></li>
        <li><a href="terms.html" class="nav-link">Terms</a></li>
        <li><a href="privacy.html" class="nav-link">Privacy</a></li>
      </ul>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-container">
      <div class="hero-content">
        <h1 class="hero-title">
          Play Online Solitaire <br class="hero-break">
          Anytime, Anywhere
        </h1>
        <p class="hero-subtitle">
          Enjoy the classic Solitaire card game directly in your browser. No download required.
        </p>
        <div class="hero-buttons">
          <a href="#game" class="btn btn-primary btn-large">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>Play Now</span>
          </a>
          <a href="about.html" class="btn btn-secondary btn-large">
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Toast Notification -->
  <div id="toast" class="toast"></div>

  <!-- Game Section -->
  <section id="game" class="game-section">
    <div class="container">
      <!-- Game Controls -->
      <div class="game-controls">
        <div class="game-controls-left">
          <button id="newGameBtn" class="btn btn-success">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 4v6h-6M1 20v-6h6"/>
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
            </svg>
            <span>New Game</span>
          </button>
          <button id="undoBtn" class="btn btn-secondary">Undo</button>
          <button id="hintBtn" class="btn btn-info">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 10a3 3 0 1 0-6 0v1m6-1a3 3 0 0 1-6 0m6 0V8a3 3 0 1 0-6 0v2"/>
              <path d="M12 14l0 .01M12 17l0 .01M12 20l0 .01"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
            <span class="hide-mobile">Hint</span>
          </button>
        </div>
        <div class="game-controls-right">
          <div class="game-stat">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span id="timer">0:00</span>
          </div>
          <div class="game-stat">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
            <span>Moves: <span id="moves">0</span></span>
          </div>
          <div class="game-stat">
            <span>Score: <span id="score">0</span></span>
          </div>
        </div>
      </div>

      <!-- Game Board -->
      <div class="game-board">
        <!-- Top Row: Stock, Waste, and Foundations -->
        <div class="top-row">
          <!-- Stock Pile -->
          <div id="stock" class="card-slot clickable">
            <div class="empty-slot">Stock</div>
          </div>

          <!-- Waste Pile -->
          <div id="waste" class="card-slot">
            <div class="empty-slot">Waste</div>
          </div>

          <!-- Empty Space -->
          <div class="card-slot-empty"></div>

          <!-- Foundation Piles -->
          <div class="foundation" data-foundation="0">
            <div class="empty-slot foundation-slot">♥</div>
          </div>
          <div class="foundation" data-foundation="1">
            <div class="empty-slot foundation-slot">♦</div>
          </div>
          <div class="foundation" data-foundation="2">
            <div class="empty-slot foundation-slot">♣</div>
          </div>
          <div class="foundation" data-foundation="3">
            <div class="empty-slot foundation-slot">♠</div>
          </div>
        </div>

        <!-- Tableau Piles -->
        <div class="tableau-row">
          <div class="tableau" data-tableau="0">
            <div class="empty-slot tableau-slot">K</div>
          </div>
          <div class="tableau" data-tableau="1">
            <div class="empty-slot tableau-slot">K</div>
          </div>
          <div class="tableau" data-tableau="2">
            <div class="empty-slot tableau-slot">K</div>
          </div>
          <div class="tableau" data-tableau="3">
            <div class="empty-slot tableau-slot">K</div>
          </div>
          <div class="tableau" data-tableau="4">
            <div class="empty-slot tableau-slot">K</div>
          </div>
          <div class="tableau" data-tableau="5">
            <div class="empty-slot tableau-slot">K</div>
          </div>
          <div class="tableau" data-tableau="6">
            <div class="empty-slot tableau-slot">K</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="features-section">
    <div class="container">
      <h2 class="section-title">Why Play Online Solitaire?</h2>
      
      <div class="features-grid">
        <div class="feature-card feature-green">
          <div class="feature-icon icon-green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </div>
          <h3 class="feature-title">No Download Required</h3>
          <p class="feature-text">Play instantly in your browser. No installation, no registration needed.</p>
        </div>

        <div class="feature-card feature-blue">
          <div class="feature-icon icon-blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <h3 class="feature-title">Free to Play</h3>
          <p class="feature-text">100% free Solitaire game with no ads or hidden costs.</p>
        </div>

        <div class="feature-card feature-purple">
          <div class="feature-icon icon-purple">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
          <h3 class="feature-title">Smooth & Fast Gameplay</h3>
          <p class="feature-text">Optimized performance with smooth animations and instant response.</p>
        </div>

        <div class="feature-card feature-orange">
          <div class="feature-icon icon-orange">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
          </div>
          <h3 class="feature-title">Mobile & Desktop Friendly</h3>
          <p class="feature-text">Fully responsive design that works perfectly on all devices.</p>
        </div>

        <div class="feature-card feature-teal">
          <div class="feature-icon icon-teal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
          </div>
          <h3 class="feature-title">Classic Solitaire Rules</h3>
          <p class="feature-text">Traditional Klondike Solitaire with standard rules and scoring.</p>
        </div>

        <div class="feature-card feature-indigo">
          <div class="feature-icon icon-indigo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
          <h3 class="feature-title">Unlimited Games</h3>
          <p class="feature-text">Play as many games as you want, whenever you want.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- How to Play Section -->
  <section class="how-to-play-section">
    <div class="how-to-play-container">
      <h2 class="section-title">How to Play Solitaire</h2>
      
      <div class="instructions-card">
        <div class="instruction-block">
          <h3 class="instruction-title">Objective</h3>
          <p class="instruction-text">
            Move all cards to the four foundation piles, starting with Ace and building up to King in the same suit.
          </p>
        </div>

        <div class="instruction-block">
          <h3 class="instruction-title">Rules</h3>
          <ul class="instruction-list">
            <li>Cards in the tableau must be arranged in descending order and alternating colors</li>
            <li>Only Kings can be moved to empty tableau columns</li>
            <li>Foundation piles must start with an Ace and build up in the same suit</li>
            <li>Draw cards from the stock when no moves are available</li>
            <li>You can move multiple cards together if they're properly sequenced</li>
          </ul>
        </div>

        <div class="instruction-block">
          <h3 class="instruction-title">Controls</h3>
          <ul class="instruction-list">
            <li>Drag and drop cards to move them</li>
            <li>Click on a card to auto-move it to a foundation (if possible)</li>
            <li>Click the stock pile to draw a card</li>
            <li>Use the "Hint" button if you're stuck</li>
            <li>Use "Undo" to reverse your last move</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta-section">
    <div class="cta-container">
      <h2 class="cta-title">Ready to Play Solitaire?</h2>
      <p class="cta-text">Start playing now and enjoy the classic card game experience!</p>
      <a href="#game" class="btn btn-white btn-large">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        <span>Start Playing</span>
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <p>&copy; 2026 Online Solitaire. All rights reserved.</p>
        <div class="footer-links">
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
          <a href="terms.html">Terms</a>
          <a href="privacy.html">Privacy</a>
        </div>
      </div>
    </div>
  </footer>

  <script src="game.js"></script>
</body>
</html>
