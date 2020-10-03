module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        root: ['./src'],
        alias: {
          '@init': './src/init',
          '@component': './src/component',
          '@reducers': './src/reducers',
          '@image': './src/images',
          '@element': './src/element',
        },
      },
    ],
  ],
};
