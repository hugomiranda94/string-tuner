# String Tuner
## A multitool package that helps you manage strings fast and easy.

Fine-tune your strings the way you like it. A tool made by a dev for devs.


## Installation

```bash
npm install string-tuner
```

## How to Use

### Importing

You can import the entire library or individual modules based on your needs:

#### Import Everything (Recommended)

```javascript
import st from 'string-tuner';

// Use all modules
st.transform.camel('hello world');
st.validate.email('test@example.com');
st.edit.trim('long string', 5);
st.clean.html('<p>text</p>');
st.format.mask('1234567890');
```

#### Import Individual Modules

```javascript
import { transform, validate, edit, clean, format } from 'string-tuner';

// Use individual modules directly
transform.camel('hello world');
validate.email('test@example.com');
edit.trim('long string', 5);
clean.html('<p>text</p>');
format.mask('1234567890');
```

#### Destructuring for Cleaner Code

```javascript
import st from 'string-tuner';

// Extract only what you need
const { transform, validate } = st;

transform.pascal('my function name');
validate.url('https://example.com');
```

---

## API Reference

### `transform` - String Transformation

String transformation utilities for converting strings to different formats and cases.

#### `transform.capitalize(str, fullSentence?)`
Capitalizes a string or sentence.

```javascript
st.transform.capitalize('the guitar strings vibrate beautifully');
// Input: 'the guitar strings vibrate beautifully'
// Output: 'The Guitar Strings Vibrate Beautifully'

st.transform.capitalize('the guitar strings vibrate beautifully', false);
// Input: 'the guitar strings vibrate beautifully'
// Output: 'The guitar strings vibrate beautifully'
```

#### `transform.camel(str)`
Converts a string to camelCase.

```javascript
st.transform.camel('acoustic guitar solo');
// Input: 'acoustic guitar solo'
// Output: 'acousticGuitarSolo'
```

#### `transform.snake(str)`
Converts a string to snake_case.

```javascript
st.transform.snake('Electric Bass Guitar');
// Input: 'Electric Bass Guitar'
// Output: 'electric_bass_guitar'
```

#### `transform.snakeScream(str)`
Converts a string to SCREAMING_SNAKE_CASE.

```javascript
st.transform.snakeScream('Electric Bass Guitar');
// Input: 'Electric Bass Guitar'
// Output: 'ELECTRIC_BASS_GUITAR'
```

#### `transform.kebab(str)`
Converts a string to kebab-case.

```javascript
st.transform.kebab('Piano Chord Progression');
// Input: 'Piano Chord Progression'
// Output: 'piano-chord-progression'
```

#### `transform.pascal(str)`
Converts a string to PascalCase.

```javascript
st.transform.pascal('violin concerto in d major');
// Input: 'violin concerto in d major'
// Output: 'ViolinConcertoInDMajor'
```

#### `transform.reverse(str)`
Reverses a string.

```javascript
st.transform.reverse('melody');
// Input: 'melody'
// Output: 'ydomel'
```

#### `transform.slugify(str)`
Creates a URL-friendly slug from a string.

```javascript
st.transform.slugify('Jazz & Blues: A Musical Journey!');
// Input: 'Jazz & Blues: A Musical Journey!'
// Output: 'jazz-blues-a-musical-journey'
```

---

### `validate` - String Validation

Validation utilities for checking string formats.

#### `validate.email(str, customRegex?)`
Validates if a string is a valid email address.

```javascript
st.validate.email('musician@orchestra.com');
// Input: 'musician@orchestra.com'
// Output: true

st.validate.email('not-an-email');
// Input: 'not-an-email'
// Output: false
```

#### `validate.url(str, customRegex?)`
Validates if a string is a valid URL.

```javascript
st.validate.url('https://guitar-lessons.com');
// Input: 'https://guitar-lessons.com'
// Output: true

st.validate.url('not a url');
// Input: 'not a url'
// Output: false
```

#### `validate.phone(str, customRegex?)`
Validates if a string is a valid phone number.

```javascript
st.validate.phone('+1-555-MUSIC-01');
// Input: '+1-555-MUSIC-01'
// Output: true

st.validate.phone('call me maybe');
// Input: 'call me maybe'
// Output: false
```

---

### `edit` - String Manipulation

String editing utilities for modifying and manipulating strings.

#### `edit.trim(str, maxLength?, trimChar?)`
Trims a string to a maximum length and appends a trim character.

```javascript
st.edit.trim('The symphony orchestra performs tonight', 12);
// Input: 'The symphony orchestra performs tonight'
// Output: 'The symphony...'

st.edit.trim('The symphony orchestra performs tonight', 12, '♪');
// Input: 'The symphony orchestra performs tonight'
// Output: 'The symphony♪'
```

#### `edit.repeat(str, count)`
Repeats a string n times.

```javascript
st.edit.repeat('♪ ', 5);
// Input: '♪ '
// Output: '♪ ♪ ♪ ♪ ♪ '
```

#### `edit.pad(str, length, char?, position?)`
Pads a string to a specified length with a character.

```javascript
st.edit.pad('DRUMS', 15, '-', 'both');
// Input: 'DRUMS'
// Output: '-----DRUMS-----'

st.edit.pad('BASS', 10, '*', 'start');
// Input: 'BASS'
// Output: '******BASS'
```

#### `edit.wrap(str, wrapper)`
Wraps a string with specified characters.

```javascript
st.edit.wrap('piano forte', '"');
// Input: 'piano forte'
// Output: '"piano forte"'

st.edit.wrap('crescendo', { start: '[', end: ']' });
// Input: 'crescendo'
// Output: '[crescendo]'
```

#### `edit.unwrap(str, wrapper)`
Removes wrapping characters from a string.

```javascript
st.edit.unwrap('"allegro"', '"');
// Input: '"allegro"'
// Output: 'allegro'

st.edit.unwrap('[diminuendo]', { start: '[', end: ']' });
// Input: '[diminuendo]'
// Output: 'diminuendo'
```

#### `edit.prefix(pf)`
Creates prefix manipulation utilities for a given prefix string.

```javascript
const sharp = st.edit.prefix('#');
sharp.add('C');
// Input: 'C'
// Output: '#C'

sharp.remove('#F');
// Input: '#F'
// Output: 'F'
```

#### `edit.suffix(sf)`
Creates suffix manipulation utilities for a given suffix string.

```javascript
const major = st.edit.suffix(' major');
major.add('C');
// Input: 'C'
// Output: 'C major'

major.remove('D major');
// Input: 'D major'
// Output: 'D'
```

#### `edit.initials(str, maxInitials?)`
Extracts initials from a name or string.

```javascript
st.edit.initials('Ludwig van Beethoven');
// Input: 'Ludwig van Beethoven'
// Output: 'LVB'

st.edit.initials('Wolfgang Amadeus Mozart', 2);
// Input: 'Wolfgang Amadeus Mozart'
// Output: 'WA'
```

---

### `clean` - String Cleaning

String cleaning utilities for removing or normalizing content.

#### `clean.whitespace(str)`
Removes all whitespace from a string.

```javascript
st.clean.whitespace('C D E F G A B');
// Input: 'C D E F G A B'
// Output: 'CDEFGAB'
```

#### `clean.normalizeWhitespace(str)`
Normalizes whitespace by collapsing multiple spaces to single space and trimming.

```javascript
st.clean.normalizeWhitespace('  quarter    note   rest  ');
// Input: '  quarter    note   rest  '
// Output: 'quarter note rest'
```

#### `clean.html(str)`
Removes HTML tags from a string.

```javascript
st.clean.html('<h1>Jazz</h1> <p>is <strong>amazing</strong></p>');
// Input: '<h1>Jazz</h1> <p>is <strong>amazing</strong></p>'
// Output: 'Jazz is amazing'
```

#### `clean.escapeHtml(str)`
Escapes HTML special characters.

```javascript
st.clean.escapeHtml('<chord>C & G</chord>');
// Input: '<chord>C & G</chord>'
// Output: '&lt;chord&gt;C &amp; G&lt;/chord&gt;'
```

#### `clean.unescapeHtml(str)`
Unescapes HTML entities.

```javascript
st.clean.unescapeHtml('&lt;note&gt;A&lt;/note&gt;');
// Input: '&lt;note&gt;A&lt;/note&gt;'
// Output: '<note>A</note>'
```

---

### `format` - String Formatting

String formatting utilities for displaying and highlighting strings.

#### `format.mask(str, visibleChars?, maskChar?)`
Masks sensitive data in a string.

```javascript
st.format.mask('GUITAR-SERIAL-12345');
// Input: 'GUITAR-SERIAL-12345'
// Output: '***************2345'

st.format.mask('VIOLIN-ID-9876', 3, '#');
// Input: 'VIOLIN-ID-9876'
// Output: '###########876'
```

#### `format.highlight(str, search, wrapper?, caseSensitive?)`
Highlights search terms in a string by wrapping them.

```javascript
st.format.highlight('The violin plays a beautiful melody', 'violin');
// Input: 'The violin plays a beautiful melody'
// Output: 'The <mark>violin</mark> plays a beautiful melody'

st.format.highlight('Drums and bass create rhythm', 'bass', { start: '[', end: ']' });
// Input: 'Drums and bass create rhythm'
// Output: 'Drums and [bass] create rhythm'
```

#### `format.quote(type?)`
Creates quote manipulation utilities for wrapping/unwrapping strings with quotes.

```javascript
const dq = st.format.quote('double');
dq.add('staccato');
// Input: 'staccato'
// Output: '"staccato"'

const sq = st.format.quote('single');
sq.remove("'legato'");
// Input: "'legato'"
// Output: 'legato'
```

#### `format.bracket(type?)`
Creates bracket manipulation utilities for wrapping/unwrapping strings with brackets.

```javascript
const round = st.format.bracket('round');
round.add('forte');
// Input: 'forte'
// Output: '(forte)'

const square = st.format.bracket('square');
square.remove('[pianissimo]');
// Input: '[pianissimo]'
// Output: 'pianissimo'
```

---

## License

MIT
