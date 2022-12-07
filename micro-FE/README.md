# Micro FE using Webpack ModuleFederationPlugin

<br/>
<img src="https://github.com/webpack/media/blob/master/logo/icon-square-small.png?raw=true" width="150" height="150" />
<br/>
<br/>

## Pros

- **Framework agnostic**
- **Faster deployments**

each micro apps are independently deployed

- **More maintainable**

apps are loosely coupled

- **Easier migration**

## Cons

- **Complex setup**
- **Community support**

Some issues are hard to debug and most tutorials you'll find only use single Framework eg. `React`.
No hybrid setup like `react` together with `svelte`

- **No SSR support**

Critical for apps that requires SEO as federated modules are `spa` apps and are imported in client
side. `nextjs-mf` is currently working on supporting SSR but there is no specific timeline or
roadmap yet.

## MFE set-up guides

- [NextJS](./docs/NEXTJS.md)
- [Svelte](./docs/SVELTE.md)
- [Consuming Federated Modules](./docs/GUIDES.md)

---

to run this app locally, please go [here](./docs/DOCS.md)
