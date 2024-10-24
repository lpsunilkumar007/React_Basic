# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

# # Form validation client side in react using yup library

For form validiton in client side we have used the the yup library of react which is used for form validation.
Use Yup react library for the form validation

- First install the package in project npm install yup
- Then import it in the login.tsx and signup.tsx file.
- Then use it to validate the form data.
- After that we have set the validation for various input fields using yup object and store it in const varlidationSchema.
- Once the validation is set to all the input fields then we use this validationSchema in the handleSubmit method.
- If the validationSchema is true then after that other method are called and form is submitted.
- If the validationSchema is false then the error message is shown to the user.

# Apply onBlur event in form validation using yup library method

- In this we have applied the onBlur event
- Creating a function handleBlur to handle the blur event.
- HandleBlur function use to display the error if the input fields in the form is not filled and move to the next field then it will show errors.
- We have used the yup library method to display the error and to validate form.
