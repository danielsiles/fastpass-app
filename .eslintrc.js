module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off', // <--- THIS IS THE NEW RULE
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _assets: './src/assets',
          _components: './src/components',
          _atoms: './src/components/atoms',
          _molecules: './src/components/molecules',
          _organisms: './src/components/organisms',
          _navigations: './src/navigations',
          _scenes: './src/scenes',
          _services: './src/services',
          _styles: './src/styles',
          _utils: './src/utils',
        },
      },
    },
  },
};
