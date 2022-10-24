This is an experimental project using mainly [Next.js](https://nextjs.org/) and [Tailwincss](https://tailwindcss.com).

The main focus is to allow teachers to create studnets and races. The teacher is to
register studnets into races and record the results.

It has been a long time since I wrote react. The code so far might not follow the best practices.

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
# or
yarn && yarn dev
```

Open [http://localhost:3000/admin](http://localhost:3000) with your browser to see the result.

As of now, There are no authentication flow.

## Demo

Live demo is also available [here](https://liveheats.vercel.app/admin).

## Diagrams

The following is just a rough [ER diagram](https://dbdiagram.io/d/6356e7c6fa2755667d621a78) of the system.
![ER diagram](./diagrams/LiveHeats%20assignment.png)

## Things to work on

- Refactor (standardised duplicated views/funtions, separate out logics stuffed in files from `pages` folder)
- Test cases
- Fix requiring absolute path while importing (E.g `.../.../`)
- look into code splitting
- find out more on how to write better nextjs
- better folder strucutre
- Do authentication
- Add animiaton or good page/action transitions
- come up with better UX
- Typescript
- dockerize
- 404 page
