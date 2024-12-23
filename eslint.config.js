import neostandard from 'neostandard';

export default [
  ...neostandard({
    semi: true,
    ts: false
  }),
  {
    rules: {
      'no-undef': 'off',
      'n/no-callback-literal': 'off'
    },
    ignores: [
      'node_modules/*',
      'material/dist/*'
    ]
  }
];
