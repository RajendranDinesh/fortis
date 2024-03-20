# fortis

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.

## Stuff that would save you time

- inside the _`src/networking/index.tsx`_ file, you can:
    - find the Request function configured with axios's instance. You can use it to make requests to the server.

    - edit Igress's dev url to quickly switch between your local IP address and localhost, to view previews on other devices in your network.

- inside _`src/pages/components/`_ folder, you can find:
    - <ins>__CircularProgress__</ins>, a component that you can use to show a loading spinner.
    - <ins>__Editor__</ins>, a component that has base monaco-editor configuration, you can use it to create a code editor.
    - <ins>__joditEditor__</ins>, a component that has base jodit-editor configuration, you can use it to create a rich text editor.
    - <ins>__Modal__</ins>, a component that you can use to create a modal.

            Play with the props to see how all of these components work.

- inside _`src/AppRoutes.tsx`_ file, you can:
    - find the routes configuration.
    
    - add new routes here. ( We have nested routes, each module has its own route configuration. )

    - add protected routes here. ( We have a `ProtectedRoute` component that you can use to protect routes. )

    - logout user using the `logout` function.

