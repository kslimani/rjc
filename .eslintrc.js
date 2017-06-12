module.exports = {
    "extends": "standard",
    "plugins": [
      "standard",
      "promise"
    ],
    "env": {
      "browser": true
    },
    "rules": {
      "space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }]
    }
}
