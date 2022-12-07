# Importing federated modules to consumer app

Given the `app1` (host) and `app2` that we've setup we now have this

```

+ app1 (nextjs app and also the host app)
+ app2 (svelte app which exposes a module)

```

Now in our `app1` we should be able to consume the federated module from `app2`. In
`app1/page/index` paste the code below

```ts
import { useEffect, useRef } from "react";

export default function Index() {
  const ref = useRef<HTMLDivElement>(null);

  // This is how we could render a svelte component to react
  // To import federated react modules please see below.
  useEffect(function shim() {
    import("app2/index").then((module) => {
      if (ref.current) {
        new module.default({
          target: ref.current,
        });
      }
    });
  }, []);

  return <div ref={ref} />;
}
```

## Import React Federated Module

```ts
import dynamic from "next/dynamic";

const Component = dynamic(() => import("anotherRemoteApp/SomeComponent"), {
  ssr: false,
});

export default function Index() {
  return <Component />;
}
```
