import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

Navigation.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function Navigation({ title, subheader, ...other }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = '../navigator.html'; // path to the HTML file
    iframe.width = '100%';
    iframe.height = '700px';
    iframe.style.border = 'none';

    const mapNode = mapRef.current;
    mapNode.appendChild(iframe);

    return () => {
      mapNode.removeChild(iframe);
    };
  }, []);

  return <div ref={mapRef} id="map" />;
}
