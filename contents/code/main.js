// based on this work:
// https://www.reddit.com/r/kde/comments/7h6g8e/move_window_to_center_patch/

// checkout KWin scripting tutorial for details:
// https://techbase.kde.org/Development/Tutorials/KWin/Scripting

var GEOMETRY_TOLERANCE_PERCENT = 0.005;
var MIN_GEOMETRY_TOLERANCE_PIXELS = 2;

function toggleCurrentWindowSize() {
  print("CenterCurrentWindow: Shortcut triggered");
  var win = workspace.activeWindow;
  if (!win) {
    print("CenterCurrentWindow: No active window found");
    return;
  }
  print("CenterCurrentWindow: Resizing window: " + win.caption);
  
  var clientArea = workspace.clientArea(KWin.MaximizeArea, win);
  var displayWidth = clientArea.width;
  var displayHeight = clientArea.height;
  var offsetX = clientArea.x;
  var offsetY = clientArea.y;

  // Allow a small tolerance because KWin can report geometry with minor rounding differences.
  var geometryTolerance = Math.max(
      MIN_GEOMETRY_TOLERANCE_PIXELS,
      Math.round(Math.min(displayWidth, displayHeight) * GEOMETRY_TOLERANCE_PERCENT)
  );
  var halfWidth = Math.round(displayWidth * 0.5);
  var halfHeight = Math.round(displayHeight * 0.5);
  var largeWidth = Math.round(displayWidth * 0.8);
  var largeHeight = Math.round(displayHeight * 0.8);
  var halfX = offsetX + Math.round((displayWidth - halfWidth) / 2);
  var halfY = offsetY + Math.round((displayHeight - halfHeight) / 2);
  
  var isHalfSizeAndCentered =
      Math.abs(win.x - halfX) <= geometryTolerance &&
      Math.abs(win.y - halfY) <= geometryTolerance &&
      Math.abs(win.width - halfWidth) <= geometryTolerance &&
      Math.abs(win.height - halfHeight) <= geometryTolerance;
  var targetWidth = isHalfSizeAndCentered ? largeWidth : halfWidth;
  var targetHeight = isHalfSizeAndCentered ? largeHeight : halfHeight;

  win.frameGeometry = {
      x: offsetX + Math.round((displayWidth - targetWidth) / 2),
      y: offsetY + Math.round((displayHeight - targetHeight) / 2),
      width: targetWidth,
      height: targetHeight,
  }
}

registerShortcut("centercurrentwindow_toggle", "Toggle current window size", "Meta+Shift+M", toggleCurrentWindowSize);
