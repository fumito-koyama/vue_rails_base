module.exports = {
  root: true,
  extends: [
    'standard', 
    'plugin:vue/recommend', 
    "plugin:prettier/recommended", 
    "prettier/vue",  
  ],
  env: {
      browser: true,
      es6: true
  },
  parserOptions: {
    "sourceType": "module"
  },
  plugins: [
    'vue'
  ],
}