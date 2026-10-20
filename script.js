// =============================================================================
// DIGITAL TRADING CARD SCRIPT
// Plain JavaScript with simple, beginner-friendly explanations
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Grab all important HTML elements we need to interact with
  const card = document.getElementById('tradingCard');
  const cardFlipper = document.getElementById('cardFlipper');
  const activateBtn = document.getElementById('activateBtn');
  const flipToBackBtn = document.getElementById('flipToBackBtn');
  const flipBackBtn = document.getElementById('flipBackBtn');
  const avatarDisplay = document.getElementById('avatarDisplay');
  const themePromptBtn = document.getElementById('themePromptBtn');
  const topEmojiBadge = document.getElementById('topEmojiBadge');
  const cardTypeLabels = document.querySelectorAll('.card-type');

  // Current list of avatar icons that cycle when ability is activated
  let avatarIcons = ['🌿', '🌱', '🍃', '💻', '✨'];
  let iconIndex = 0;
  let isActivated = false;

  // ---------------------------------------------------------------------------
  // 1. CARD FLIP INTERACTION
  // ---------------------------------------------------------------------------
  // This function adds or removes the "is-flipped" class to rotate the card 180°
  function toggleFlip(event) {
    if (event) event.stopPropagation();
    if (cardFlipper) {
      cardFlipper.classList.toggle('is-flipped');
    }
  }

  if (flipToBackBtn) {
    flipToBackBtn.addEventListener('click', toggleFlip);
  }

  if (flipBackBtn) {
    flipBackBtn.addEventListener('click', toggleFlip);
  }

  // ---------------------------------------------------------------------------
  // 2. 3D CARD TILT ON MOUSE / TOUCH
  // ---------------------------------------------------------------------------
  // Calculates cursor or finger position relative to the center of the card
  function handleMove(e) {
    const rect = card.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles (max +/- 10 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    // Apply 3D perspective tilt
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  // Reset the tilt when cursor leaves
  function handleReset() {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }

  card.addEventListener('mousemove', handleMove);
  card.addEventListener('mouseleave', handleReset);
  card.addEventListener('touchmove', handleMove, { passive: true });
  card.addEventListener('touchend', handleReset);

  // ---------------------------------------------------------------------------
  // 3. SPECIAL ABILITY ACTIVATION
  // ---------------------------------------------------------------------------
  if (activateBtn) {
    activateBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isActivated = !isActivated;

      // Trigger a glow pulse animation
      if (cardFlipper) {
        cardFlipper.classList.remove('card-glow-pulse');
        void cardFlipper.offsetWidth; // Force browser to restart animation
        cardFlipper.classList.add('card-glow-pulse');
      }

      // Cycle to the next avatar emoji
      iconIndex = (iconIndex + 1) % avatarIcons.length;
      if (avatarDisplay) {
        avatarDisplay.querySelector('.avatar-icon').textContent = avatarIcons[iconIndex];
      }

      // Update button text
      activateBtn.textContent = isActivated ? 'Synthesizing! ✨' : 'Activate Ability';
    });
  }

  // ---------------------------------------------------------------------------
  // 4. PROMPT-BASED CUSTOM THEME GENERATOR
  // ---------------------------------------------------------------------------
  // List of base theme archetypes with rich keywords and default colors
  const baseThemes = [
    {
      name: 'Cyberpunk',
      keywords: ['cyber', 'neon', 'matrix', 'hacker', 'synthwave', 'futuristic', 'digital', 'arcade', 'robot'],
      typeName: 'CYBER',
      badgeEmoji: '⚡',
      avatarIcons: ['⚡', '🤖', '💻', '🕹️', '🔮'],
      bgGradient: 'radial-gradient(circle at 50% 20%, #030712, #0f172a, #020617)',
      cardBg: 'linear-gradient(150deg, #090d16, #0f172a, #1e1b4b)',
      borderGradient: 'linear-gradient(135deg, #06b6d4, #ec4899, #8b5cf6, #3b82f6)',
      cardGlow: 'rgba(6, 182, 212, 0.5)',
      accentLime: '#06b6d4',
      accentMint: '#38bdf8',
      accentGold: '#ec4899'
    },
    {
      name: 'Fire / Volcanic',
      keywords: ['fire', 'flame', 'magma', 'lava', 'volcano', 'inferno', 'ember', 'dragon', 'blaze', 'warm'],
      typeName: 'FIRE',
      badgeEmoji: '🔥',
      avatarIcons: ['🔥', '🌋', '☄️', '🐲', '✨'],
      bgGradient: 'radial-gradient(circle at 50% 20%, #450a0a, #1c1917, #0c0a09)',
      cardBg: 'linear-gradient(150deg, #450a0a, #292524, #1c1917)',
      borderGradient: 'linear-gradient(135deg, #ef4444, #f97316, #eab308, #dc2626)',
      cardGlow: 'rgba(239, 68, 68, 0.5)',
      accentLime: '#f97316',
      accentMint: '#facc15',
      accentGold: '#ef4444'
    },
    {
      name: 'Water / Ocean / Ice',
      keywords: ['water', 'ocean', 'sea', 'ice', 'glacier', 'frost', 'aqua', 'rain', 'wave', 'deep sea'],
      typeName: 'WATER',
      badgeEmoji: '🌊',
      avatarIcons: ['🌊', '💧', '🧊', '❄️', '🐋'],
      bgGradient: 'radial-gradient(circle at 50% 20%, #082f49, #0c4a6e, #031e30)',
      cardBg: 'linear-gradient(150deg, #075985, #0369a1, #082f49)',
      borderGradient: 'linear-gradient(135deg, #38bdf8, #0ea5e9, #67e8f9, #bae6fd)',
      cardGlow: 'rgba(56, 189, 248, 0.5)',
      accentLime: '#38bdf8',
      accentMint: '#67e8f9',
      accentGold: '#e0f2fe'
    },
    {
      name: 'Cosmic / Space',
      keywords: ['space', 'galaxy', 'cosmic', 'nebula', 'star', 'astral', 'celestial', 'void', 'starlight'],
      typeName: 'COSMIC',
      badgeEmoji: '🌌',
      avatarIcons: ['🌌', '✨', '🪐', '🚀', '🌠'],
      bgGradient: 'radial-gradient(circle at 50% 20%, #2e1065, #0f0a1e, #05030a)',
      cardBg: 'linear-gradient(150deg, #3b0764, #1e1b4b, #0f0a1e)',
      borderGradient: 'linear-gradient(135deg, #c084fc, #a855f7, #6366f1, #f472b6)',
      cardGlow: 'rgba(192, 132, 252, 0.5)',
      accentLime: '#c084fc',
      accentMint: '#e879f9',
      accentGold: '#fde047'
    },
    {
      name: 'Cozy Coffee / Autumn',
      keywords: ['coffee', 'cafe', 'autumn', 'cozy', 'fall', 'warm', 'latte', 'vintage', 'sepia', 'wood'],
      typeName: 'COZY COFFEE',
      badgeEmoji: '☕',
      avatarIcons: ['☕', '🍂', '🥐', '🍁', '🍪'],
      bgGradient: 'radial-gradient(circle at 50% 20%, #451a03, #1c1917, #0c0a09)',
      cardBg: 'linear-gradient(150deg, #451a03, #291508, #1c1917)',
      borderGradient: 'linear-gradient(135deg, #d97706, #b45309, #f59e0b, #78350f)',
      cardGlow: 'rgba(217, 119, 6, 0.45)',
      accentLime: '#f59e0b',
      accentMint: '#fbbf24',
      accentGold: '#fde68a'
    },
    {
      name: 'Pastel / Fairy',
      keywords: ['pastel', 'candy', 'fairy', 'bubblegum', 'cute', 'pink', 'kawaii', 'sakura', 'dream'],
      typeName: 'FAIRY',
      badgeEmoji: '🌸',
      avatarIcons: ['🌸', '🦄', '🍬', '🧁', '🎀'],
      bgGradient: 'radial-gradient(circle at 50% 20%, #500724, #1f1020, #100612)',
      cardBg: 'linear-gradient(150deg, #701a35, #3b1029, #1f1020)',
      borderGradient: 'linear-gradient(135deg, #f472b6, #ec4899, #f9a8d4, #c084fc)',
      cardGlow: 'rgba(244, 114, 182, 0.5)',
      accentLime: '#f472b6',
      accentMint: '#f9a8d4',
      accentGold: '#fbcfe8'
    },
    {
      name: 'Shadow / Goth',
      keywords: ['ghost', 'shadow', 'spooky', 'haunted', 'vampire', 'goth', 'dark', 'skull', 'noir'],
      typeName: 'SHADOW',
      badgeEmoji: '👻',
      avatarIcons: ['👻', '🦇', '💀', '🕯️', '🕷️'],
      bgGradient: 'radial-gradient(circle at 50% 20%, #1e1b4b, #09090b, #030303)',
      cardBg: 'linear-gradient(150deg, #18181b, #09090b, #030303)',
      borderGradient: 'linear-gradient(135deg, #64748b, #71717a, #a855f7, #dc2626)',
      cardGlow: 'rgba(168, 85, 247, 0.4)',
      accentLime: '#cbd5e1',
      accentMint: '#a855f7',
      accentGold: '#ef4444'
    },
    {
      name: 'Grass / Nature',
      keywords: ['grass', 'nature', 'plant', 'leaf', 'botanical', 'garden', 'forest', 'moss', 'green'],
      typeName: 'GRASS',
      badgeEmoji: '🌱',
      avatarIcons: ['🌿', '🌱', '🍃', '💻', '✨'],
      bgGradient: 'radial-gradient(circle at 50% 20%, #064e3b, #022c22, #01140e)',
      cardBg: 'linear-gradient(150deg, #064e3b, #043d2e, #022c22)',
      borderGradient: 'linear-gradient(135deg, #22c55e, #a3e635, #facc15, #10b981, #15803d)',
      cardGlow: 'rgba(34, 197, 94, 0.4)',
      accentLime: '#a3e635',
      accentMint: '#34d399',
      accentGold: '#facc15'
    }
  ];

  // Function to process user prompt and create a customized theme
  function applyThemeFromPrompt(promptText) {
    if (!promptText || promptText.trim() === '') return;

    // Convert prompt to lowercase so words are easy to match
    const text = promptText.toLowerCase().trim();

    // STEP A: Score each base theme by counting how many keywords match the prompt
    let bestTheme = baseThemes[baseThemes.length - 1]; // Default to Grass
    let highestScore = -1;

    baseThemes.forEach((theme) => {
      let score = 0;
      theme.keywords.forEach((keyword) => {
        if (text.includes(keyword)) {
          score += 1;
        }
      });

      if (score > highestScore) {
        highestScore = score;
        bestTheme = theme;
      }
    });

    // Clone the theme object so we can customize it with niche modifiers
    const customTheme = { ...bestTheme };

    // STEP B: Detailed description modifiers (creates niche customization)
    // 1. Midnight / Deep / Dark modifier
    const isDark = text.includes('dark') || text.includes('midnight') || text.includes('deep') || text.includes('black');
    if (isDark) {
      customTheme.bgGradient = 'radial-gradient(circle at 50% 20%, #09090b, #000000, #000000)';
      customTheme.cardBg = 'linear-gradient(150deg, #18181b, #09090b, #000000)';
    }

    // 2. Gold / Royal / Luxury modifier
    const isGold = text.includes('gold') || text.includes('golden') || text.includes('royal') || text.includes('luxury');
    if (isGold) {
      customTheme.borderGradient = 'linear-gradient(135deg, #ffd700, #fbbf24, #f59e0b, #d97706)';
      customTheme.accentGold = '#ffd700';
      customTheme.badgeEmoji = '👑';
    }

    // 3. Neon / Glowing / Laser modifier
    const isNeon = text.includes('neon') || text.includes('glow') || text.includes('laser') || text.includes('bright');
    if (isNeon) {
      customTheme.cardGlow = 'rgba(6, 182, 212, 0.85)';
    }

    // 4. Color overrides mentioned directly in the prompt
    if (text.includes('crimson') || text.includes('red')) {
      customTheme.accentMint = '#ef4444';
    }
    if (text.includes('purple') || text.includes('violet')) {
      customTheme.accentLime = '#c084fc';
    }
    if (text.includes('cyan') || text.includes('teal')) {
      customTheme.accentMint = '#06b6d4';
    }
    if (text.includes('emerald') || text.includes('green')) {
      customTheme.accentLime = '#10b981';
    }

    // STEP C: Apply the custom theme colors to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--bg-gradient', customTheme.bgGradient);
    root.style.setProperty('--card-bg', customTheme.cardBg);
    root.style.setProperty('--card-border-gradient', customTheme.borderGradient);
    root.style.setProperty('--card-glow', customTheme.cardGlow);
    root.style.setProperty('--accent-lime', customTheme.accentLime);
    root.style.setProperty('--accent-mint', customTheme.accentMint);
    root.style.setProperty('--accent-gold', customTheme.accentGold);

    // STEP D: Update card labels and emojis
    // Format card type nicely (e.g. "TYPE: CYBER ⚡" or custom title)
    cardTypeLabels.forEach((label) => {
      label.textContent = `TYPE: ${customTheme.typeName} ${customTheme.badgeEmoji}`;
    });

    if (topEmojiBadge) {
      topEmojiBadge.textContent = customTheme.badgeEmoji;
      topEmojiBadge.title = `${customTheme.name} Crest`;
    }

    // Update avatar icons list to match the new theme
    avatarIcons = customTheme.avatarIcons;
    iconIndex = 0;
    if (avatarDisplay) {
      avatarDisplay.querySelector('.avatar-icon').textContent = avatarIcons[0];
    }

    // Give visual feedback by pulsing the card
    if (cardFlipper) {
      cardFlipper.classList.remove('card-glow-pulse');
      void cardFlipper.offsetWidth;
      cardFlipper.classList.add('card-glow-pulse');
    }
  }

  // STEP E: Hook up the Change Theme button to prompt the user
  if (themePromptBtn) {
    themePromptBtn.addEventListener('click', () => {
      const promptInput = window.prompt(
        "Describe your custom theme!\nDetailed descriptions create unique, niche palettes.\n\nExamples:\n• 'cyberpunk neon hacker in a dark rain-soaked city'\n• 'cozy autumn coffee shop with warm golden lights'\n• 'volcanic magma dragon deep underground'\n• 'pastel fairy bubblegum dream'\n• 'deep space cosmic galaxy with starlight gold'"
      );

      if (promptInput) {
        applyThemeFromPrompt(promptInput);
      }
    });
  }
});
