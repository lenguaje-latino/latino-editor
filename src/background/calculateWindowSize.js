import { screen } from 'electron';

function calculateWindowSize() {
  const display = screen.getPrimaryDisplay();
  const dimensions = display.workAreaSize;

  return {
    width: parseInt(dimensions.width * 0.8),
    height: parseInt(dimensions.height * 0.8),
    minWidth: parseInt(dimensions.width * 0.8),
    minHeight: parseInt(dimensions.height * 0.8),
  };
}

export { calculateWindowSize };
