# Snake-Game
🐍 Snake Game (Easy & Hard Modes)

A simple and fun Snake Game built using HTML, CSS, and JavaScript.
The game includes two difficulty levels — Easy and Hard — each running separate JS logic for movement and collision rules.

🚀 Features
🎮 Two modes: Easy Mode & Hard Mode
⚡ Different difficulty logic using separate JS files (script-easy.js & script-hard.js)
⏱ Built-in timer
🏆 High Score tracking using localStorage
🍎 Random food generation
🔁 Restart & Game Over screen
📱 Responsive layout
🧠 How Levels Work

Players first land on level.html, where they select difficulty.
Level selection page links to:
snake.html?level=easy
snake.html?level=hard


Inside snake.html, a script dynamically loads the correct JS file:
const params = new URLSearchParams(window.location.search);
const level = params.get("level");

let script = document.createElement("script");
script.type = "module";

if (level === "hard") {
    script.src = "script-hard.js";
} else {
    script.src = "script-easy.js";
}
document.body.appendChild(script);

📁 Project Structure
📦 Snake-Game
 ┣ 📜 level.html
 ┣ 📜 snake.html
 ┣ 📜 style.css
 ┣ 📜 script-easy.js
 ┣ 📜 script-hard.js
 ┗ 📁 assets (optional)

🎯 Game Controls
Key	Action
⬆ Arrow Up	Move Up
⬇ Arrow Down	Move Down
⬅ Arrow Left	Move Left
➡ Arrow Right	Move Right
💡 Easy vs Hard Mode
Mode	Boundary Collision	Base Speed	Gameplay
Easy	Snake passes through walls and appears on opposite side	Slower	Beginner friendly
Hard	Snake dies on hitting wall	Faster	Challenging
