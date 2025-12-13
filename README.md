# About

Web application to allow you to visualize the nutrition load of your meals.

It is fully offline, ie, it doesn't store any user date in any server, it uses only the built-in storage from the Browser itself.
It will erase all the data if you delete site data from your browser.

Check live at [https://mauricioize.dev/nutrition-calculator/](https://mauricioize.dev/nutrition-calculator/).

# Tech Stack

This web application is using React 19 and React Router 7, for more info check the package.json file.

This project was initialized using Vite with `npm create vite@latest nutrition-calculator -- --template react-ts`.

The Tailwind config file initialized with `npx tailwindcss init --full`.

Icons from `https://react-icons.github.io/react-icons/icons/fa/`.

# Deploying

Once you do a code change, you need to manually run `npm run deploy` to build the project and to move the build folder to the gh-pages branch, which then is automatically hosted by Github Pages.
