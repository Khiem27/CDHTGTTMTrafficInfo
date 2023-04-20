import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import GoogleMapReact from 'google-map-react';

// components
import { useState, useEffect } from 'react';

AppCurrentSubject.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppCurrentSubject({ title, subheader, ...other }) {
  const [coords, setCoords] = useState({
    lat: 10.8124974,
    lng: 106.6161661,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <div style={{ marginTop: '20px', height: '500px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBfrr68LOR85piDHsa6trV9o5pJwB6gVgU' }}
          defaultCenter={coords}
          defaultZoom={14}
          layerTypes={['TrafficLayer', 'TransitLayer']}
        >
          <AnyReactComponent
            lat={coords.lat}
            lng={coords.lng}
            text={
              <div style={{ color: 'red', fontSize: '20px' }}>
                <img
                  style={{ width: '30px', height: '30px', transform: 'translate(-50%, -50%)' }}
                  src="../assets/icons/pngegg.png"
                  alt="pngegg"
                  border="0"
                />
              </div>
            }
          />
        </GoogleMapReact>
      </div>
    </Card>
  );
}
