module.exports = function rotaryEncoder({
    upButton,
    downButton,
    pressButton,
    onUp,
    onDown,
    onPress,
  }) {
    let waveform = '';
    let waveformTimeout;
  
    upButton.on('up', () => {
      waveform += '1';
      handleWaveform();
    });
  
    downButton.on('up', () => {
      waveform += '0';
      handleWaveform();
    });
  
    pressButton.on('up', () => {
      onPress();
    });
  
    function handleWaveform() {
      if (waveform.length < 2) {
        waveformTimeout = setTimeout(() => {
          waveform = '';
        }, 50);
        return;
      }
  
      if (waveformTimeout) {
        clearTimeout(waveformTimeout);
      }
  
      if (waveform.startsWith('01')) {
        onUp();
      } else if (waveform.startsWith('10')) {
        onDown();
      }
  
      waveform = '';
    }
  }