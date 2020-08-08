# orbital-list

A React library to display data using circles, orbits, and planets.

[![NPM](https://img.shields.io/npm/v/orbital-list.svg)](https://www.npmjs.com/package/orbital-list) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Visit [laurentsenta.com/orbital-list](http://www.laurentsenta.com/orbital-list/) for an interactive example.

## Install

With npm:

```bash
npm install --save orbital-list
```

With yarn:

```bash
yarn add orbital-list
```

## Usage

The library provides a set of components.

```tsx
import React, { Component } from 'react'

import {
  Dial,
  Hand,
  Label,
  Orbit,
  OrbitalList,
  Place,
  Planet,
  Slice
} from 'orbital-list'

class Example extends Component {
  render() {
    return (
      <OrbitalList>
        <Dial color='#1f2041' />
        <Slice
          color='rgba(75, 63, 114, 1)'
          length={0.5}
          angleStart={180}
          angleEnd={202.5}
        />
        <Place
          angle={180}
          distance={0.8}
          style={{ color: '#ed254e', fontSize: '1.2rem', fontWeight: 'bold' }}
        >
          <button>Hello</button>
        </Place>
        <Orbit color='rgba(244, 205, 205, 1)' radius={0.15} />
      </OrbitalList>
    )
  }
}
```

## Develop

```
yarn start # start working on the library
```

Go in the `examples/` folder, there is a react app there,

```
yarn start # start the example server
```

## License

MIT © [lsenta](https://github.com/lsenta)
