<!-- Please update value in the {}  -->

<h1 align="center">My Chat</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://dev-challenges-chat.vercel.app/">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/ProjectXfire/devChallenges_Chat">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/UgCqszKR7Q7oqb4kRfI0">
      Challenge
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- OVERVIEW -->

## Overview

This project is a chat page. You can send and receive message in real-time with others users that are joined in the same channel.

- First you must register and then you can log in.
- For default, all new members will be joined to the welcome chat channel.
- If you want to change the channel you must click in the hamburguer buttom, only if you are in a mobile,and it will open a sidebar, if you are in a laptop or desktop, the sidebar is already open. This sidebar show the list all of members that are joined to this channel. In the top you will see an arrow icon that say 'ALL CHANNELS', just click there and it will open another sidebar that show all the channels, only click in the channel that you want to join and that's it. In the same sidebar you will see and plus icon, this is to create a new channel.
- In the sidebar that show all the members, are two buttons, one if for log off, and the other is to se your profile and change some data. In this page, you can only change yor username and your avatar. You can upload any image size, internally the size of the image will transform a minor size.
- Finally, you can send and receive message from others members that are in the same channel.

Development this project I have learned about websocket, this was something new for me, and I have try to understand how its works and why is used.
The back-end was development using NESTJS and I have used JWT for the authentication. The expired time for this is 10 minutes, after that will appear and error of authentication if you try to connect to the server doing a request.
To store the token, I have used cookies.

### Built With

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [React](https://reactjs.org/)
- [NextJS](https://nextjs.org/)

NPM:

- [Styled-Components](https://styled-components.com/)
- [react-hook-forms](https://react-hook-form.com/)
- [Joi](https://www.npmjs.com/package/joi)
- [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers)
- [sanitize-html](https://www.npmjs.com/package/sanitize-html)
- [React-Icons](https://react-icons.github.io/react-icons/)
- [socket.io](https://www.npmjs.com/package/socket.io)
- [socket.io-client](https://www.npmjs.com/package/socket.io-client)
- [cookie](https://www.npmjs.com/package/cookie)

## Features

<!-- List the features of your application or follow the template. Don't share the figma file here :) -->

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge. The [challenge](https://devchallenges.io/challenges/UgCqszKR7Q7oqb4kRfI0) was to build an application to complete the given user stories.

## How To Use --------------->

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
