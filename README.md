# The True Romanian History

This repository contains a satirical website dedicated to the "true" history of Romania, blending humor, conspiracy theories, and national pride. The project features a collection of articles with dynamic parallax visuals and culminates in a retro-style, browser-based First-Person Shooter (FPS) game built from scratch using JavaScript and the Canvas API.

## Features

### Website
*   **Parallax Scrolling**: Immersive visual effects on article images that create a sense of depth as you scroll, implemented using modern CSS `scroll-timeline` properties.
*   **Responsive Design**: A fluid layout that adapts to different screen sizes, from mobile devices to desktops.
*   **Custom Styling**: A unique, dark-themed design with animated gradients and transitions to enhance the user experience.

### FPS Game
*   **Raycasting Engine**: A 2D raycasting engine built with vanilla JavaScript, rendering a 3D perspective similar to classic games like Wolfenstein 3D.
*   **Dynamic Rendering**: The engine renders walls, a textured skybox, enemies, and a player weapon on a `<canvas>` element.
*   **Player & Combat**: Includes player movement (forward, backward, strafing), mouse-based camera controls, and a shooting mechanic.
*   **Enemy AI**: Simple enemies that spawn and move towards the player.
*   **Interactive HUD**: A Heads-Up Display showing the player's health and kill count.

## Technologies Used
*   **Frontend**: HTML5, CSS3
*   **Styling Features**: Flexbox, Grid, CSS Animations, `@keyframes`, `scroll-timeline`
*   **Core Logic**: Vanilla JavaScript (ES6 Modules)
*   **Game Engine**: HTML5 Canvas API

## Getting Started

To run this project locally, you need a local web server to handle the ES6 module imports and JSON fetching correctly.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/devero11/proiect-tehnici-web.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd proiect-tehnici-web
    ```

3.  **Start a local web server.** A simple way is to use Python's built-in server:
    ```sh
    # For Python 3
    python -m http.server

    # For Python 2
    python -m SimpleHTTPServer
    ```
    Alternatively, you can use a tool like the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code.

4.  **Open your browser** and navigate to `http://localhost:8000` (or the address provided by your server).

## Game Controls

To play the FPS game, navigate to the **Super Secret** section (via the login page) and click **Play Now**.

*   **Move Forward**: `W`
*   **Move Backward**: `S`
*   **Strafe Left**: `A`
*   **Strafe Right**: `D`
*   **Aim/Look**: Mouse Movement
*   **Shoot**: Left Mouse Click

## File Structure

```
.
├── index.html          # Main landing page with historical articles.
├── login.html          # Login page with a guest option to access the game.
├── game.html           # The page that hosts the canvas for the FPS game.
├── styles.css          # Main stylesheet for the website.
├── game.css            # Specific styles for the login and game pages.
├── game.js             # Main game loop and input handler.
├── login.js            # Handles user authentication logic.
├── users.json          # (Empty) Stores user credentials for login.
│
├── game_src/           # Contains the core modules of the game engine.
│   ├── loader.js       # Loads and processes game assets (maps, textures).
│   ├── player.js       # Defines the player state and properties.
│   ├── renderer.js     # The core raycasting and rendering engine.
│   └── update.js       # General game state update logic.
│
└── assets/             # All static assets, including images for articles and game sprites.
