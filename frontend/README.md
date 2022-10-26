# Getting Started with MediBook

## Frontend Local Setup

1. `cd` into `frontend/`

2. Install `Node.js` which comes with `npm`: https://nodejs.org/en/download/

- Check that both are installed with the commands `node -v` and `npm -v`.

- If they were already installed previously, update `npm` by doing
  ```bash
  npm install -g npm@latest
  ```

3. Install `Axios`

```bash
npm i axios
```

4. (optional) Install `nodemon` for auto-reloading of app after changes are made

```bash
npm install --save-dev nodemon
```

5. `npm list` at this point should give similar result

```bash
frontend@0.1.0 path\to\clonedrepo\frontend
├── @testing-library/jest-dom@5.16.5
├── @testing-library/react@13.4.0
├── @testing-library/user-event@13.5.0
├── axios@0.27.2
├── react-dom@18.2.0
├── react-router-dom@6.4.1
├── react-scripts@5.0.1
├── react@18.2.0
└── web-vitals@2.1.4
```

6. `npm run build` to build the frontend.

7. `npm start` to start the frontend. You should be able to view frontend on your localhost.
