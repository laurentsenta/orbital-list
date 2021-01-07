import React, { useCallback, useEffect, useState } from 'react'
import {
  Dial,
  Hand,
  Label,
  Orbit,
  OrbitalList,
  Place,
  Planet,
  Slice
} from '../.'

enum Tab {
  All,
  Dial,
  Slice,
  Place,
  Orbit,
  Label,
  Hand1,
  Hand2,
  Planet
}

const App = () => {
  const [active, setActive] = useState<Tab>(Tab.All)

  return (
    <>
      <main className="container">
        <div className="columns is-centered">
          <div className="column is-6 has-text-centered">
            <img className="mb-4 align-center" style={{ maxWidth: '640px' }} src="https://raw.githubusercontent.com/laurentsenta/orbital-list/master/social.png" />
          </div>
        </div>
        <h1 className="title has-text-centered">Demo and Examples:</h1>
        <div className="columns is-centered is-vcentered">
          <div className="column is-8">
            <Demo active={active} />
          </div>
        </div>
        <p className="has-text-centered">
          <a target='_blank' href="http://whena.re/">Check whena.re for a live demo.</a>
        </p>

        <div className="box">
          <div className="tabs is-centered is-toggle">
            <ul>
              <li className={`${active === Tab.All ? 'is-active' : ''}`} onClick={() => setActive(Tab.All)}>
                <a>
                  <span>Basics</span>
                </a>
              </li>
              <li className={`${active === Tab.Dial ? 'is-active' : ''}`} onClick={() => setActive(Tab.Dial)}>
                <a>
                  <span>Dial</span>
                </a>
              </li>
              <li className={`${active === Tab.Slice ? 'is-active' : ''}`} onClick={() => setActive(Tab.Slice)}>
                <a>
                  <span>Slice</span>
                </a>
              </li>
              <li className={`${active === Tab.Place ? 'is-active' : ''}`} onClick={() => setActive(Tab.Place)}>
                <a>
                  <span>Place</span>
                </a>
              </li>
              <li className={`${active === Tab.Orbit ? 'is-active' : ''}`} onClick={() => setActive(Tab.Orbit)}>
                <a>
                  <span>Orbit</span>
                </a>
              </li>
              <li className={`${active === Tab.Label ? 'is-active' : ''}`} onClick={() => setActive(Tab.Label)}>
                <a>
                  <span>Label</span>
                </a>
              </li>
              <li className={`${active === Tab.Hand1 ? 'is-active' : ''}`} onClick={() => setActive(Tab.Hand1)}>
                <a>
                  <span>Hand1</span>
                </a>
              </li>
              <li className={`${active === Tab.Hand2 ? 'is-active' : ''}`} onClick={() => setActive(Tab.Hand2)}>
                <a>
                  <span>Hand2</span>
                </a>
              </li>
              <li className={`${active === Tab.Planet ? 'is-active' : ''}`} onClick={() => setActive(Tab.Planet)}>
                <a>
                  <span>Planet</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="content">
            {active === Tab.All ? <>
              <h3>Basics:</h3>
              <p>
                Coordinates are in angle (0 to 360 degrees),
                Sizes / Radius are between 0 and 1, so that the clock can resize,
                It's all HTML, you can use colors, forms, etc,
                The clock will use all the size it's provided. You might need to give it's container an height.
              </p>
              <ul>
                <li>Supports resizing,</li>
                <li>Position all items in a "orbital context",</li>
                <li>Use raw HTML and CSS pretty much everywhere,</li>
              </ul>
            </> : null}
            {active === Tab.Dial ? <>
              <h3>Dial:</h3>
              <p>
                Coordinates are in angle (0 to 360 degrees),
                Sizes / Radius are between 0 and 1, so that the clock can resize,
                It's all HTML, you can use colors, forms, etc,
                The clock will use all the size it's provided. You might need to give it's container an height.
              </p>
            </> : null}
            {active === Tab.Slice ? <>Slice</> : null}
            {active === Tab.Place ? <>Place can contain HTML, position in the orbital list</> : null}
            {active === Tab.Orbit ? <>Orbit</> : null}
            {active === Tab.Planet ? <>Planet</> : null}
            {active === Tab.Label ? <>Label</> : null}
            {active === Tab.Hand1 ? <>Hand1</> : null}
            {active === Tab.Hand2 ? <>Hand2</> : null}
          </div>
        </div>
      </main>
      <footer className="footer mt-5">
        <div className="content has-text-centered">
          <p>
            <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
      <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
      is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
    </p>
        </div>
      </footer>

    </>
  )
}

const Demo: React.FC<{ active: Tab }> = ({ active }) => {
  const currentTimeDelta = useCallback(() => {
    return Math.round((Date.now() / 1000) % 360)
  }, [])

  const [timeDelta, setTimeDelta] = useState(currentTimeDelta())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDelta(currentTimeDelta())
    }, 300)
    return () => clearInterval(interval)
  }, [setTimeDelta])

  const match = useCallback(value => active === Tab.All || value === active, [active])

  return (
    <div style={{ width: '100%', height: '60vh' }}>
      <OrbitalList>
        <Dial color='#1f2041' />
        {match(Tab.Slice) ?
          <>
            <Slice
              color='rgba(75, 63, 114, 1)'
              length={0.5}
              angleStart={180 + 22.5 * 1}
              angleEnd={180 + 22.5 * 5 - 1}
            />
            <Slice
              color='rgba(75, 63, 114, 1)'
              length={0.9}
              angleStart={180 + 22.5 * 5}
              angleEnd={180 + 22.5 * 6 - 1}
            />
            <Slice
              color='rgba(75, 63, 114, 1)'
              length={0.7}
              angleStart={180 + 22.5 * 6}
              angleEnd={180 + 22.5 * 8}
            />
            <Slice
              color='rgba(75, 63, 114, 0.5)'
              length={0.9}
              angleStart={166}
              angleEnd={182}
            />
          </> : null
        }
        {match(Tab.Place) ?
          <>
            <Place
              angle={180}
              distance={0.8}
              style={{ color: '#ed254e', fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              <button>Hello</button>
            </Place>
            <Place
              angle={170}
              distance={0.7}
              style={{ color: '#ed254e', fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              <button>World</button>
            </Place>
            <Place
              angle={180}
              distance={0.6}
              style={{ color: '#ed254e', fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              <ul>
                <li>Hello</li>
              </ul>
            </Place>
            <Place
              angle={170}
              distance={0.5}
              style={{ color: '#ed254e', fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              <ul>
                <li>Universe</li>
              </ul>{' '}
            </Place>
          </> : null
        }
        {match(Tab.Orbit) ?
          <>
            <Orbit color='rgba(244, 205, 205, 1)' radius={0.15} />
            <Orbit color='rgba(244, 205, 205, 1)' radius={0.16} />
            <Orbit color='rgba(244, 205, 205, 1)' radius={0.17} />
            <Orbit color='rgba(244, 205, 205, 1)' radius={0.18} width={2} />
            <Orbit color='rgba(244, 205, 205, 1)' radius={0.2} width={2} />
            <Orbit color='rgba(244, 205, 205, 1)' radius={0.22} width={2} />
            <Orbit color='rgba(244, 205, 205, 1)' radius={0.24} width={3} />
            <Orbit color='rgba(244, 205, 205, 1)' radius={0.28} width={4} />
          </> : null
        }
        {match(Tab.Planet) ?
          <>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
              <Planet
                key={`planet-${x}`}
                angle={60 + Math.pow(x, 1.5) * 4}
                color='#4062BB'
                radius={0.05 + Math.pow(x / 20, 2.2) * 0.6}
                distance={0.4 + x * 0.058}
              />
            ))}
        )
          </> : null
        }
        {match(Tab.Hand1) ?
          <>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
              <Hand
                key={x}
                width={Math.pow(x + 1, 1.1) * 0.3}
                angle={Math.pow(x + 1, 1.3)}
                length={0.4 + (x + 1) / 20}
                color='orange'
                style={{ borderRadius: '0.3rem' }}
              />
            ))}
          </> : null
        }

        {match(Tab.Hand2) ?
          <>
            <>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
                <Hand
                  key={x}
                  width={Math.pow(x + 1, 1.1) * 0.5}
                  angle={25 + Math.pow(x + 1, 1.3)}
                  start={0.8}
                  end={0.9}
                  color='orange'
                  style={{ borderRadius: '0.3rem' }}
                />
              ))}
            </>
            <>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
                <Hand
                  key={x}
                  width={Math.pow(x + 1, 1.1) * 0.5}
                  angle={30 + Math.pow(x + 1, 1.3)}
                  start={0.65}
                  end={0.75}
                  color='orange'
                  style={{ borderRadius: '0.3rem' }}
                />
              ))}
            </>
          </> : null
        }
        {match(Tab.Label) ?
          <>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
              <Label
                key={`label-${x}`}
                angle={timeDelta + x * 5}
                distance={0.7}
                style={{
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 'bold'
                }}
              >
                {x}
              </Label>
            ))}
        )
          </> : null
        }
        {match(Tab.Dial) ?
          <Dial color='#131335' radius={0.1} />
          : null
        }
      </OrbitalList>
    </div>
  )
}

export default App
