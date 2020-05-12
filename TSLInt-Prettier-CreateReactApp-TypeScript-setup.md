> Ps: The current setup was done on 01-04-19

> Project Dependency Versions at the time 👇
```json
  "react": "^16.7.0",
  "react-dom": "^16.7.0",
  "react-scripts": "2.1.3",
  "typescript": "^3.2.2"
  "tslint": "^5.12.0",
  "tslint-config-prettier": "^1.17.0",
  "tslint-plugin-prettier": "^2.0.1",
  "tslint-react": "^3.6.0"
  ```

> Directions:  

1. Install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [TypeScript TSLint Plugin](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)   extensions on your VSCode 

2. Edit (per your desire) the following on your __VSCode settings__ 👇
```json
{
  "editor.formatOnSave": false,
  "[javascript]": {
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.formatOnSave": true
  },
  "prettier.tslintIntegration": true,
  "prettier.eslintIntegration": true,
  "prettier.jsxSingleQuote": false,
  "prettier.singleQuote": true,
}
```

3. `npx create-react-app [project-name] --typescript`

4. cd into [project-name]

5. Install the following dependecies to package.json 👇
  ```javascript
  yarn add --dev typescript 
  yarn add @types/node @types/react @types/react-dom @types/jest
  yarn add --dev tslint
  yarn add --dev tslint-config-prettier
  yarn add --dev tslint-plugin-prettier
  yarn add --dev tslint-react
  ```

6. Create a `tslint.json` file with the following config 👇
```json
{
  "extends": [
    "tslint:recommended",
    "tslint-react",
    "tslint-config-prettier"
  ],
  "rulesDirectory": [
    "tslint-plugin-prettier"
  ],
  "rules": {
    "prettier": true,
    "interface-name": false
  }
}
```

7. Create a `.prettierrc` file and add your desired rules i.e 👇
```json
{
    "trailingComma": "es5",
    "printWidth": 100,
    "semi": false,
    "singleQuote": true
}
  ```

8. Quit and restart VSCode again

> Note:
[tslint-config-prettier](https://www.npmjs.com/package/tslint-config-prettier) is shipped with a little CLI tool to help you check if your configuration contains any rules that are in conflict with Prettier. (require tslint installed <br/> 
In order to execute the CLI tool, first add a script for it to `package.json`:

```json
{
  "scripts": {
    "tslint-check": "tslint-config-prettier-check ./tslint.json"
  }
}
```

> Then run `yarn tslint-check or npm run tslint-check`

You may also run TS lint directlly as a `script` on your `package.json`
```json
"scripts": { 
     "lint": "tslint -c tslint.json src/**/*.{ts,tsx} --fix --format verbose"
 }
```
> Then run `yarn lint or npm run lint` 