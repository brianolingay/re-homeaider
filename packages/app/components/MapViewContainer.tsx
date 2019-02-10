import * as React from "react";

// tslint:disable-next-line:no-var-requires
const expo = require("expo");

const { MapView } = expo;

type Props = {
  latitude: number;
  longitude: number;
  coordinates: number[][];
};

export class MapViewContainer extends React.PureComponent<Props> {
  render() {
    const { latitude, longitude, coordinates } = this.props;
    return (
      <MapView
        style={{
          height: 320,
        }}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {coordinates.map((coordinate: any, index: number) => (
          <MapView.Marker
            key={`${index}-mvm`}
            coordinate={{
              latitude: coordinate[0],
              longitude: coordinate[1],
            }}
          />
        ))}
      </MapView>
    );
  }
}
