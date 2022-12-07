import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function CartPage() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* dynamically import svelte component */
  useEffect(() => {
    import("cart/index").then((mod) => {
      if (ref.current) {
        new mod.default({
          target: ref.current,
        });
      }
    });
  }, []);

  /* listen to route changes */
  useEffect(() => {
    (function () {
      const hashchange = window.history.pushState;

      window.history.pushState = function (state) {
        if (typeof window.history.hashchange === "function") {
          window.history.hashchange({ state });
        }

        return hashchange.apply(window.history, arguments as any);
      };
    })();

    window.onpopstate = history.hashchange = function ({ state }) {
      if (state.pathname) {
        router.push(state.pathname);
      }
    };
  }, [router]);

  return <div ref={ref} />;
}

declare global {
  interface History {
    hashchange(...args: any): void;
  }
}
