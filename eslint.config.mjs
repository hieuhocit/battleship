import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    rules: {
      indent: ["error", 2],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "linebreak-style": ["error", "unix"],
    },
  },
];
