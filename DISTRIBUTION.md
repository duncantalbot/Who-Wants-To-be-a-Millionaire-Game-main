# Distribution Checklist

## Files to Include in Distribution

### ✅ Required Files & Folders
- `index.html` - Main game file
- `START_GAME.bat` - Easy launcher for Windows users!
- `questions.json` - Question database (easy to edit!)
- `USER_GUIDE.md` - Instructions for users
- `dist/` folder - Contains compiled CSS
- `src/` folder - Contains game JavaScript
- `audio/` folder - Sound files
- `images/` folder - Graphics

### ❌ Optional (Can Remove)
- `package.json` - Only needed for development
- `package-lock.json` - Only needed for development
- `tailwind.config.js` - Only needed for development
- `node_modules/` - Delete this folder (if exists)
- `.gitignore` - Not needed
- `styles/` folder - Source CSS (not needed, already built)
- `README.md` - Replace with USER_GUIDE.md
- `CONTRIBUTING.md` - Not needed for end users
- `CODE-OF-CONDUCT.md` - Not needed for end users
- `LICENSE.md` - Optional (keep if you want)

## How to Prepare for Distribution

### Option A: Keep Everything (Easiest)
1. Delete `node_modules/` folder (if it exists)
2. Zip the entire folder
3. Share it!

### Option B: Minimal (Smaller Size)
1. Create a new folder called `Millionaire-Game`
2. Copy only these items:
   - `index.html`
   - `questions.json`
   - `USER_GUIDE.md`
   - `dist/` folder (entire folder)
   - `src/` folder (entire folder)
   - `audio/` folder (entire folder)
   - `images/` folder (entire folder)
3. Zip the `Millionaire-Game` folder
4. Share it!

## User Instructions

**Tell your users (Windows):**
1. Extract the zip file
2. **Double-click `START_GAME.bat`** to play (automatically opens browser)
3. Edit `questions.json` to customize questions
4. Read `USER_GUIDE.md` for full instructions

**Tell your users (Mac/Linux or if using Firefox):**
1. Extract the zip file  
2. Right-click `index.html` → Open with Firefox
3. Edit `questions.json` to customize questions

**No installation or setup required!**

---

## Distribution Methods

### Email
- Zip the folder (should be ~5-10 MB)
- Attach to email

### Cloud Storage
- Upload zip to Google Drive, Dropbox, OneDrive
- Share the link

### USB Drive
- Copy the folder directly
- No zip needed if using USB

---

## Testing Before Distribution

1. ✅ Open `index.html` in browser - game loads
2. ✅ Click through a few questions - they work
3. ✅ Test all three lifelines - they activate
4. ✅ Test New Game button - it restarts
5. ✅ Edit a question in `questions.json` and refresh - change appears
6. ✅ Test with audio on/off - buttons work

---

## Current Status

✅ Game is ready for distribution!
✅ Questions file is in root folder (easy to edit)
✅ User guide created
✅ All features working:
   - Manual answer reveal
   - Next question button
   - New game button
   - Lifelines (50/50, Phone, Audience)
   - 15 question progression
   - Money ladder tracking
   - Australian dollar prizes

**You're all set to share!** 🎉
