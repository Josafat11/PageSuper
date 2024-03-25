import React from 'react';

const Map = () => {
  return (
    <div className="map-container flex justify-center mb-8 mt-20">
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.2911472268515!2d-98.42193895305478!3d21.14080866910439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d726eb79bb040f%3A0xddff9d8ec0061464!2s16%20de%20Enero%204%2C%20Centro%2C%2043000%20Huejutla%20de%20Reyes%2C%20Hgo.!5e0!3m2!1ses!2smx!4v1710893210863!5m2!1ses!2smx"
        width="1080"
        height="700"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
