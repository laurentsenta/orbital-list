![logo](https://github.com/laurentsenta/orbital-list/raw/master/social.png?raw=true 'orbital-list logo')

# orbital-list

A React library to create interfaces using circles, orbits, and planets.

[![NPM](https://img.shields.io/npm/v/orbital-list.svg)](https://www.npmjs.com/package/orbital-list)

![capture orbital-list](https://github.com/laurentsenta/orbital-list/raw/master/capture.png?raw=true 'orbital-list Example')

Visit [orbital-list.laurentsenta.com](https://orbital-list.laurentsenta.com/) for an interactive example.

Check it out in production: **[whena.re](https://whena.re/)** is built with the library and helps you and your team to deal with timezones.

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

Check the example to see the code behind the [demo](https://orbital-list.laurentsenta.com/).


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

MIT © [laurentsenta](https://github.com/laurentsenta)
