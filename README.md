<a href="https://string-tuner.hugomiranda.dev" target="_blank"><img src="st-logo.png" alt="String Tuner logo" width="250" /></a>

## Fine-tune your strings at your rythm.

An easy-to-use JavaScript tool that helps you manage strings fast.

## Getting Started

### Installation

```bash
npm install string-tuner
```

### How to use

You can import the entire library or individual modules based on your needs:

#### >>> Import Everything (Recommended for first-time use)

You can see the full functionality by importing `st` then hitting `.` to see the full list of functions through intelisense.

```javascript
import st from 'string-tuner';

// Use all modules
st.camel('hello world');
st.trim('long string', 5);
st.mask('1234567890');
st.stripHtml('<p>text</p>');
st.valid.email('test@example.com');
```

#### >>> Import Individual Functions (Recommended for cleaner code)
If you are already familiar with the library, you can import only the functions that you need.

```javascript
import { camel, trim, mask, stripHtml, valid } from 'string-tuner';

// Use individual functions directly
camel('hello world');
trim('long string', 5);
mask('1234567890');
stripHtml('<p>text</p>');
valid.email('test@example.com');
```

---

## Documentation

To read more about how to use each function, please visit the documentation web page:<br>https://string-tuner.hugomiranda.dev/docs.

## License

MIT
