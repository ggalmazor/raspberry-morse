var pulses = {
      ".": {id: 'dot', label: 'dit', signal: 'hi', duration: 1},
      "-": {id: 'dash', label: 'dah', signal: 'hi', duration: 3},
      "·": {id: 'inter-element-silence', label: ' ', signal: 'low', duration: 1},
      " ": {id: 'inter-character-silence', label: '   ', signal: 'low', duration: 3},
      "_": {id: 'inter-word-silence', label: '       ', signal: 'low', duration: 7}
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
      ' ': ' '
    };

function morsify(text) {
  return text
      .toLowerCase()
      .split('')
      .map(function (char) {
        return !!codes[char] ? codes[char] : '';
      });
}

function pulsifySymbol(symbol) {
  return symbol
      .split('')
      .reduce(function (elements, element) {
        elements.push(pulses[element]);
        elements.push(pulses['·']); // Añado un espacio entre elementos
        return elements;
      }, [])
      .slice(0, -1); // Quito el espacio entre elementos final
}
function pulsify(morseCode) {
  return morseCode
      .reduce(function (pulsified, symbol) {
        if (symbol != ' ') {
          pulsified = pulsified.concat(pulsifySymbol(symbol));
          pulsified.push(pulses[' ']); // Añado un espacio entre símbolos
        } else {
          pulsified = pulsified.slice(0, -1); // Quito el espacio entre símbolos precedente
          pulsified.push(pulses['_']); // Añado un espacio entre palabras
        }
        return pulsified;
      }, [])
      .slice(0, -1); // Quito el espacio entre palabras final
}

var texto = '',
    morse = '',
    morseCodes = [],
    stdin = process.stdin;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
process.stdin.on('data', function (key) {
  if (key == '\u0003')
    terminar(texto, morse, morseCodes);
  var morseKey = morsify(key);
  if (!!morseKey[0]) {
    morseCodes = morseCodes.concat(morseKey);
    texto += key;
    morse += morseKey + '   ';
    process.stdout.write(morseKey + '   ');
  }
});

function terminar(texto, morse, morseCodes) {
  process.stdout.write('\n\nEsto es lo que has escrito:\n');
  process.stdout.write(texto + '\n\n');
  process.stdout.write('\n\nEn morse sería esto:\n');
  process.stdout.write(morse + '\n\n');
  process.stdout.write('\n\nEn pulsos sería esto:\n');
  pulsify(morseCodes).forEach(function (pulse) {
    process.stdout.write(pulse.label);
  });

  process.stdout.write("\n");
  process.exit();
}

