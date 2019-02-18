import * as React from "react";
import { Dimensions } from "react-native";

// tslint:disable-next-line:no-var-requires
const expo = require("expo");

const { MapView } = expo;

const width = Dimensions.get("window").width;

interface CoorMarker {
  color: string;
  coordinates: number[];
}

type Props = {
  latitude: number;
  longitude: number;
  coordinates: CoorMarker[];
  height: number;
};

const EDGE_PADDING = {
  top: 100,
  right: 100,
  bottom: 100,
  left: 100,
};

export class MapViewContainer extends React.PureComponent<Props> {
  mapRef: any;
  constructor(props) {
    super(props);
    this.mapRef = null;
  }

  handleFitToSuppliedMarkers() {
    setTimeout(() => {
      const markers = this.props.coordinates.map(
        (_: any, index: number) => `${index}-mvm-id`
      );
      const options = {
        edgePadding: EDGE_PADDING,
        animeted: false, // not animated
      };
      this.mapRef.fitToSuppliedMarkers(markers, options);
    }, 2000);
  }

  componentDidUpdate() {
    this.handleFitToSuppliedMarkers();
  }

  componentDidMount() {
    this.handleFitToSuppliedMarkers();
  }
  render() {
    const { latitude, longitude, coordinates, height } = this.props;
    console.log({ latitude, longitude, coordinates });
    return (
      <MapView
        ref={ref => (this.mapRef = ref)}
        style={{
          width,
          height,
        }}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {coordinates.map((marker: CoorMarker, index: number) => (
          <MapView.Marker
            key={`${index}-mvm`}
            identifier={`${index}-mvm-id`}
            pinColor={marker.color}
            coordinate={{
              latitude: marker.coordinates[0],
              longitude: marker.coordinates[1],
            }}
          />
        ))}
      </MapView>
    );
  }
}
