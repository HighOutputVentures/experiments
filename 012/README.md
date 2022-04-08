# Building a custom text editor

## Authors

- [Roger Madjos](https://app.identifi.com/profile/00797e4189900e4762e3f459337dd735)

## Goal Statements

At the end of this experiment, we should be able to;

- Create a custom text editor similar the one in notion
  - [ ] basic markdown support
  - [ ] headers
  - [ ] bullet list
  - [ ] numbered list
  - [ ] todo list
  - [ ] mentions
  - [ ] links
  - [ ] images
  - [ ] videos
  - [ ] files

## Abstract


## Conclusion


## Resources

- [information about making contents of a div editable by the user](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable)
- [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)

## Documentation
### Usage

```html
<div id="editor"></div>
```
```html
<script>
  const editor = new Editor(document.querySelector( '#editor' ));

  const data = editor.serialize();
</script>
```