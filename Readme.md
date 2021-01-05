# Adventure Library

Adventure Library is a react native DnD encyclopedia based on [DnD5eApi](http://dnd5eapi.co)

## Installation

Current State:
This is a refactor of an old app of mine. Currently, only the items screen works.

## Installation

```bash
npm i expo-cli
yarn install
node ./scripts/import_spells.js
node ./scripts/import_items.js
expo start --ios
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Common Issues

Since this project was created over a year ago, clean installing expo-cli will help resolve the below error after running expo start:

```bash
error: unknown option `--assetExts'
```

check expo version:

```bash
expo-cli --version
```

At the start of this refactor, my version was ~2.~.~

To fully remove the old expo versions, i had to find the location of the old expo and expo-cli versions:

```bash
which expo
which expo-cli

rm -rf [path returned from which expo ]
rm -rf [path returned from which expo-cli ]
```

Then install expo-cli

```bash
npm i -g expo-cli@latest
```

check expo version again to make sure everything is gravy

## License

[MIT](https://choosealicense.com/licenses/mit/)
