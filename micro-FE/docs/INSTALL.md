# Docs

How to run this app, etc..

## Installation

- run `cd micro-FE`
- run `npm run install`
- run `cd packages/common && npm run build`
- run `cd ../.. && npm run dev`

## Map

```

+ root
|
+---+ packages
    |
    |---+ host (consumes all federated modules)
    |
    |---+ auth (exposes login and signup page)
    |
    |---+ shop (exposes shop page)
    |
    |---+ cart (exposes cart created using svelte)
    |
    +---+ common (shared utils)

```
