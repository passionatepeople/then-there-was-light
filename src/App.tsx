import React, { useCallback, useEffect, useState } from 'react';
import map from 'lodash/map';
import { auth, HueApi } from './utils/hue';
import { useLocalStorage } from './hooks';
import { rgb_to_cie } from './utils/xy-rgb-conversion';
import config from './config';
import { ColorPicker, Webcam } from './components';
import './App.css';

// If account creation is needed.
const Auth = auth();

const App: React.FC = () => {
  const [username, setUsername, remove] = useLocalStorage('hue-username', '');
  const [deviceUser, setDeviceUser] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lights, setLights] = useState([]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      if (deviceUser || username) {
        setIsLoading(true);

        Auth.createUser(deviceUser).then(([result, error]) => {
          setIsLoading(false);

          if (error) {
            setError(error);
          } else {
            setUsername(result);
          }
        });
      } else {
        setUsername('');
      }
    },
    [deviceUser, username, setUsername]
  );

  const effect = () => {
    if (username) {
      // TODO: Create 1 reusable hue client after a valid username is provided
      const client = HueApi(username);

      client.lights((err, result) => {
        if (err) throw err;
        setLights(result);
      });
    }
  };
  useEffect(effect, [username]);
  const getLightInfo = useCallback(effect, [username]);

  const handleColorChange = (color, index) => {
    // TODO: Create 1 reusable hue client after a valid username is provided
    const client = HueApi(username);

    const xy = rgb_to_cie(color.rgb.r, color.rgb.g, color.rgb.b);
    client.setLightState(index, { xy }, (err, res) => {
      if (err) throw err;

      getLightInfo();
    });
  };

  return (
    <div className="App">
      <main>
        <img src="/images/logo.png" />
        <Webcam imageUrl={config.webcam.imageUrl} />
        {username ? (
          <React.Fragment>
            <button onClick={getLightInfo}>getLightInfo</button>
            <button onClick={remove}>logout</button>
          </React.Fragment>
        ) : (
          <form onSubmit={handleClick}>
            <label>
              Device username:
              <input
                type="text"
                value={deviceUser}
                onChange={(e) => setDeviceUser(e.target.value)}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        )}
        {isLoading && <div>loading ...</div>}
        {error && <div>{error}</div>}
        <div>
          <div style={{ display: 'flex' }}>
            {map(lights, ({ name, state }, key) => {
              return (
                <div
                  key={`${key}-${name}`}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    margin: '10px',
                    padding: '10px',
                    textAlign: 'left',
                  }}
                >
                  <ColorPicker
                    initialValue={{ h: state.hue, s: state.sat / 255, l: state.bri / 255 }}
                    onChange={(color) => handleColorChange(color, key)}
                  />
                  <p>Name: {name}</p>
                  {/* {map(state, (value, key, index) => (
                    <p key={`${index}-${key}`}>
                      {key}: {value.toString()}
                    </p>
                  ))} */}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
