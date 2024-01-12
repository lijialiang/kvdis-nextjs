# KvDis-Nextjs

Using [Nextjs RSC](https://nextjs.org/docs/app/building-your-application/rendering/server-components) as the rendering component and [Vercel KV](https://vercel.com/docs/storage/vercel-kv) to store the comment data for the lightweight alternative to Disqus.

👉🏼 [kvdis-nextjs-demo.vercel.app](https://kvdis-nextjs-demo.vercel.app/)

## Features

* [ ] Github SSO
* [ ] Comment management
* [ ] More styles

## Simple Use

1. Install

```bash
$ npm i kvdis-nextjs
```


2. Import into use

```ts
import KvDis from 'kvdis-nextjs'

export default function Comment() {
  return (
    <KvDis commentsKey="kvdist-nextjs-demo" />
  )
}
```

## License

MIT
