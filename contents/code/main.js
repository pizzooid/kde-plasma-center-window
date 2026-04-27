// based on this work:
// https://www.reddit.com/r/kde/comments/7h6g8e/move_window_to_center_patch/

// checkout KWin scripting tutorial for details:
// https://techbase.kde.org/Development/Tutorials/KWin/Scripting

var GEOMETRY_TOLERANCE_PERCENT = 0.005;
var MIN_GEOMETRY_TOLERANCE_PIXELS = 2;

function growCurrentWindow() {
  var win = workspace.activeClient;
  win.geometry = {
      x: win.x - 20,
      y: win.y,
      width: win.width + 40,
      height: win.height,
  }
}

function shrinkCurrentWindow() {
  var win = workspace.activeClient;
  win.geometry = {
      x: win.x + 20,
      y: win.y,
      width: win.width - 40,
      height: win.height,
  }
}

function toggleCurrentWindowSize() {
  var win = workspace.activeClient;
  var displayWidth = workspace.displayWidth;
  var displayHeight = workspace.displayHeight;
  // Allow a small tolerance because KWin can report geometry with minor rounding differences.
  var geometryTolerance = Math.max(
      MIN_GEOMETRY_TOLERANCE_PIXELS,
      Math.round(Math.min(displayWidth, displayHeight) * GEOMETRY_TOLERANCE_PERCENT)
  );
  var halfWidth = Math.round(displayWidth * 0.5);
  var halfHeight = Math.round(displayHeight * 0.5);
  var largeWidth = Math.round(displayWidth * 0.8);
  var largeHeight = Math.round(displayHeight * 0.8);
  var halfX = Math.round((displayWidth - halfWidth) / 2);
  var halfY = Math.round((displayHeight - halfHeight) / 2);
  var isHalfSizeAndCentered =
      Math.abs(win.x - halfX) <= geometryTolerance &&
      Math.abs(win.y - halfY) <= geometryTolerance &&
      Math.abs(win.width - halfWidth) <= geometryTolerance &&
      Math.abs(win.height - halfHeight) <= geometryTolerance;
  var targetWidth = isHalfSizeAndCentered ? largeWidth : halfWidth;
  var targetHeight = isHalfSizeAndCentered ? largeHeight : halfHeight;

  win.geometry = {
      x: Math.round((displayWidth - targetWidth) / 2),
      y: Math.round((displayHeight - targetHeight) / 2),
      width: targetWidth,
      height: targetHeight,
  }
}

registerShortcut("Toggle current window size", "Toggle the current window between centered 50% and 80% sizes", "Shift+M", toggleCurrentWindowSize);
registerShortcut("Grow current window horizontally", "Make current window size 40 px wider", "Meta+.", growCurrentWindow);
registerShortcut("Shrink current window horizontally", "Make current window 40 px narrower", "Meta+,", shrinkCurrentWindow);
