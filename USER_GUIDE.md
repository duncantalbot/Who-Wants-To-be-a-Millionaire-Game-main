# Who Wants to Be a Millionaire - User Guide

## How to Run the Game

### Option 1: Use the Batch File (Windows - Easiest!)
1. **Double-click `START_GAME.bat`**
2. A local server will start and open your browser automatically
3. Start playing!
4. Press Ctrl+C in the command window when done

### Option 2: Firefox Browser
1. **Right-click `index.html`**
2. Select **"Open with" → Firefox**
3. Game loads perfectly!

### Option 3: Manual Server Start
Open PowerShell in the game folder and run:
```powershell
python -m http.server 8000
```
Then open: http://127.0.0.1:8000

**Note:** Chrome/Edge block local file:// access for security. Use one of the above methods.

## How to Play

### Answering Questions
1. Click on your answer choice (A, B, C, or D)
2. Click **"Reveal Answer"** to see if you're correct
3. Click **"Next Question"** to continue (if correct)
4. Click **"New Game"** to start over (if wrong or after winning)

### Lifelines (Use Once Each)
- **50/50** - Removes two incorrect answers
- **Phone a Friend** - Grey out after use (decorative)
- **Ask the Audience** - Grey out after use (decorative)

### Prize Ladder
- Questions 1-5: $100 → $1,000 (Safe Haven)
- Questions 6-10: $2,000 → $32,000 (Safe Haven)
- Questions 11-15: $64,000 → $1,000,000 (Grand Prize!)

### Audio Controls
- Click the **speaker icon** to mute/unmute sound

---

## How to Edit Questions

1. Open **`questions.json`** in any text editor (Notepad, VS Code, etc.)
2. Each question has this format:

```json
{
  "question": "What is 2 + 2?",
  "content": ["3", "4", "5", "6"],
  "correct": "1"
}
```

- **"question"** - The question text
- **"content"** - Four answer choices [A, B, C, D]
- **"correct"** - Correct answer: "0"=A, "1"=B, "2"=C, "3"=D

3. Save the file
4. Refresh the game in your browser (F5)

### Tips for Editing Questions
- Keep 4 game sets with 15 questions each (60 total)
- Questions are randomly selected during gameplay
- Use proper JSON format (keep commas and quotes)
- Test your changes by playing the game

---

## System Requirements

- **Any modern web browser** (Chrome, Firefox, Edge, Safari)
- **No internet required** - runs completely offline
- **No installation needed** - just open index.html

---

## Troubleshooting

**Game won't load / Questions not showing?**
- **Chrome/Edge**: These browsers block file:// access. Use Firefox instead!
- **Firefox**: Right-click index.html → Open with Firefox
- **Local Server**: In the game folder, run:
  ```powershell
  python -m http.server 8000
  ```
  Then open: http://127.0.0.1:8000

**Game shows blank screen?**
- Press F12 to open Developer Console
- Check for errors mentioning "CORS" or "fetch"
- This confirms you need to use Firefox or a local server

**Still not working?**
- Make sure all files are in the same folder structure
- Check if JavaScript is enabled in browser settings
- Try Firefox - it's the most compatible for local files

**No sound?**
- Click the mute/unmute button
- Check your system volume
- Make sure audio files are in the `audio/` folder

---

## File Structure

```
Who-Wants-To-be-a-Millionaire-Game/
├── index.html          ← Double-click to play
├── questions.json      ← Edit your questions here
├── dist/
│   └── output.css     ← Compiled styles
├── src/               ← Game code
├── audio/             ← Sound files
├── images/            ← Game graphics
└── USER_GUIDE.md      ← This file
```

**Important Files to Keep:**
- ✅ All folders and files
- ✅ Do NOT delete: dist/, src/, audio/, images/
- ✅ Safe to edit: questions.json only

---

## Support

For issues or questions, refer to the README.md file.

Enjoy the game! 🎮💰
