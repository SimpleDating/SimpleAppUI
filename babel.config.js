module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  "plugins": [
    [
      "module-resolver",
      {
        "root": ["./src"],
        "extensions": [".js", ".ios.js", ".android.js", ".ts", ".tsx", ".json"],
        "alias": {
          "tests": ["./tests/"],
          "@components": "./src/components",
          "@screens": "./src/components/screens",
        }
      }
    ]
  ]
};
