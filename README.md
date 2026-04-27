# Center window in KDE Plasma using KWin scripting

This is a very simple KWin script that does three things via shortcuts that the user can control:

* toggles the current window between 50 % height and width and 80 % height and width of the screen
* grows it horizontally if needed in 40 px steps
* shrinks it horizontally if needed in 40 px steps

I use this functionality every day with my 27" 2K screen. It's super useful to quickly switch between a compact centered window and a larger one. The growing and shrinking are extremely useful, too.

# Installation

### Plasma 6 (Recommended)
Clone this repo and run the following command inside the directory:
```bash
kpackagetool6 --type=KWin/Script --install .
```
If you are updating the script, use:
```bash
kpackagetool6 --type=KWin/Script --upgrade .
```

### Plasma 5
Run the following command inside the directory:
```bash
plasmapkg2 --install .
```
If you are updating, use:
```bash
plasmapkg2 --upgrade .
```

After installation, enable the script in **System Settings > Window Management > KWin Scripts** and configure your shortcuts in the **Shortcuts** section of System Settings.

The script itself is SUPER easy to follow so checkout contents/code/main.js and customize it to fullfil your needs.
