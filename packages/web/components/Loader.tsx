import * as React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const Loading: React.SFC<{}> = () => (
  <Segment>
    <Dimmer active>
      <Loader size="huge">Loading</Loader>
    </Dimmer>

    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
  </Segment>
);

export default Loading;
