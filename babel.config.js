module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          screens: './app/screens',
          components: './app/components',
          assets: './app/assets',
          constants: './app/constants',
          navigation: './app/navigation',
          services: './app/services',
          store: './app/store',
          types: './app/types',
          utils: './app/utils',
          enum: './app/enum',
        },
      },
    ],
  ],
};
