# Building a custom text editor around Editor.js

## Authors

- [Niel Berongoy](https://app.identifi.com/profile/00a35cf1911edb3eb888abfaad53d3f4)

## Goal Statements

We are aiming to create an customizable editor plugin (notion like usage) to integrate mainly in [identifi](https://app.identifi.com/) and can also be adaptable to other projects

- Create our own text plugin (that can do mention and '/' command)

## Abstract

## Conclusion

## Resources

- [Repository](https://github.com/HighOutputVentures/highoutput-library)
- [Editor.js](https://editorjs.io/base-concepts)
- [Contenteditable](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable)
- [Event Target](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
- [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

## Documentation

### Usage

```html
<div id="editor"></div>
```

```html
<script>
  const editor = new Editor(document.querySelector("#editor"));

  const data = editor.serialize();
</script>
```
