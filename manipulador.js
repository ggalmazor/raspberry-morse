var pulses = {
      ".": {signal: 'hi', duration: 1},
      "-": {signal: 'hi', duration: 3},
      " ": {signal: 'low', duration: 1},
      "_": {signal: 'low', duration: 3}
    },
    codes = {
      a: '.-',
      b: '-...',
      c: '-.-.',
      d: '-..',
      e: '.',
      f: '..-.',
      g: '--.',
      h: '....',
      i: '..',
      j: '.---',
      k: '-.-',
      l: '.-..',
      m: '--',
      n: '-.',
      ñ: '-.',
      o: '---',
      p: '.--.',
      q: '--.-',
      r: '.-.',
      s: '...',
      t: '-',
      u: '..-',
      v: '...-',
      w: '.--',
      x: '-..-',
      y: '-.--',
      z: '--..',
      0: '-----',
      1: '.----',
      2: '..---',
      3: '...--',
      4: '....-',
      5: '.....',
      6: '-....',
      7: '--...',
      8: '---..',
      9: '----.',
      '.': '.-.-.-',
      ',': '--..--',
      '?': '..--..',
      ' ': '_' // Hack para representar espacios entre palabras
    };

function morsify(text) {
  return text
      .toLowerCase()
      .split('')
      .map(function (char) {
        return !!codes[char] ? codes[char] + ' ' : '';
      });
}

function pulsify(code) {
  return code
      .trim()
    // Juntar el espacio después de la última letra
    // con el espacio antes de la siguiente palabra
      .replace(/ _ /, '_')
      .split('')
      .map(function (char) {
        return pulses[char];
      });
}

var texto = '',
    morse = '',
    stdin = process.stdin;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
process.stdin.on('data', function (key) {
  if (key == '\u0003')
    terminar(texto, morse);
  var morseKey = morsify(key);
  texto += key;
  morse += morseKey;
  process.stdout.write(morseKey + ' ');
});

function terminar(texto, morsified) {
  process.stdout.write('\n\nEsto es lo que has escrito:\n');
  process.stdout.write(texto + '\n\n');
  process.stdout.write('\n\nEn morse sería esto:\n');
  process.stdout.write(morsified + '\n\n');
  process.stdout.write('\n\nEn pulsos sería esto:\n');
  var pulsified = pulsify(morsified);
  pulsified.forEach(function (pulse) {
    if (pulse.duration == 3)
      process.stdout.write(pulse.signal.toUpperCase() + ' ');
    else
      process.stdout.write(pulse.signal + ' ');
  });
  process.stdout.write("\n");
  process.exit();
}

