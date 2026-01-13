# Aural Battler

A competitive two-player music ear training game where players battle by identifying different chord qualities in real-time. Test your ear and prove you're the ultimate chord master!

## Overview

**Aural Battler** is an interactive web-based game that combines music theory with competitive gaming. Players listen to musical chords and race to correctly identify the quality of the chord. With every correct answer, you deal damage to your opponent. Make mistakes and take damage yourself.

## Features

- **Real-time Audio Synthesis**: Uses the Web Audio API to generate chords with customizable ADSR envelopes
- **4 Chord Types**: Major, minor, diminished, and augmented chords
- **Competitive Gameplay**: Two-player battle system with health bars
- **Responsive UI**: Built with React and Tailwind CSS, works on desktop and tablet devices
- **Visual Feedback**: Real-time countdown timers, answer selection interface, and results display
- **Type-Safe Code**: Full TypeScript support with strict type checking
- **State Management**: Zustand for predictable game state management

## Game Mechanics

### Game Flow

1. **Ready Phase**: Players start a new round
2. **Countdown**: 3-second countdown before the chord plays
3. **Listening**: A chord is played through the speakers (0.5 seconds)
4. **Answering**: Players have a limited time to select the correct chord quality
5. **Results**: Game displays correct answers and calculates damage
6. **Game Over**: Game ends when a player's health reaches 0

### Health & Damage

- Each player starts with 100 health points
- Correct answers deal damage to the opponent
- Incorrect answers deal damage to yourself
- Game ends when any player's health drops to 0

## Setup & Installation

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Install Dependencies

```bash
npm install
# or
pnpm install
```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create an optimized production build:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Testing

Run the test suite:

```bash
npm test
```

### Linting

Check code quality:

```bash
npm run lint
```

## Future Enhancements

- Difficulty levels (preset chord progressions, faster rounds)
- Sound configuration (different instruments/tones)
- Score tracking and leaderboards
- Accessibility improvements (keyboard shortcuts)
- AI opponent
- Extended chord types (7th, suspended, slash chords)
- Multiplayer networking support
