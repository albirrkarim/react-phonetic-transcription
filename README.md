# React Phonetic Transcription

Phonetic transcription tools with react js for input, outputing, etc.

<img title="React Phonetic Transcription" alt="React Phonetic Transcription" src="./docs/ilus.gif" style="width:300px" />

<a href='https://paypal.me/AlbirrKarim' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://user-images.githubusercontent.com/29292018/186840848-65e25ff9-47e2-424b-bfa0-4ca5d027b346.png' border='0' alt='Donate via paypal' /></a>

<a href='https://ko-fi.com/Q5Q0BC92X' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## Future update

Let me know what you want. You can write issue on my repo.

## Example

```js

import React,{useState} from "react";
import { InputPhonetic, TextToPhonetic } from "react-phonetic-transcription";

const [text,setText] = useState("");

<TextToPhonetic>
    {text}
</TextToPhonetic>

<InputPhonetic
  sx={{
    mt: 2,
  }}
  addValue={(newValue) => {
    setValue(text + newValue);
  }}
/>
```

## API

```js
function InputPhonetic({
    addValue, // for the output if you click the phonetic symbol
    useRemember = true, // Remembering your last phonetic symbol
    dataDefault = common_java,
    height = "300px", // the height of phonetic keyboard
    ...rest
})
```

```js
function TextToPhonetic({ children, ...rest }) {
  return (
    <span className="fonetis" {...rest}>
      {children}
    </span>
  );
}
```
