import * as React from "react";
import { Modal } from "semantic-ui-react";

type Props = {
  trigger: any;
  children: any;
  header: string;
  open: boolean;
};

export const ModalFormContainer: React.SFC<Props> = ({
  trigger,
  children,
  header,
  open,
}) => (
  <Modal size="small" trigger={trigger} open={open}>
    <Modal.Header>{header}</Modal.Header>
    <Modal.Content>{children}</Modal.Content>
  </Modal>
);
