const five = require('johnny-five');
const rotaryEncoder = require('./rotary-encoder');
const win = require('win-audio');

const board = new five.Board({port: 'COM4'});
const speaker = win.speaker;
let savedVolume = null;

board.on('ready', () => {
  const upButton = new five.Button(13);
  const downButton = new five.Button(12);
  const pressButton = new five.Button(11);

  rotaryEncoder({
    upButton,
    downButton,
    pressButton,
    onUp: () => {
      console.log('up');
      speaker.increase(1);
    },
    onDown: () => {
      console.log('down');
      speaker.decrease(1);
    },
    onPress: () => {
      console.log('press');
      if (savedVolume === null) {
          savedVolume = speaker.get();
          speaker.set(0);
      } else {
          speaker.set(savedVolume);
          savedVolume = null;
      }
    },
  });
});