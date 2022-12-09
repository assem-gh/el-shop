import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Modal as MantineModal } from "@mantine/core";

interface ModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  withCloseBtn?: boolean;
  title?: string;
}

const BaseModal = ({
  openModal,
  setOpenModal,
  withCloseBtn = false,
  children,
  title = "",
}: ModalProps) => {
  return (
    <MantineModal
      opened={Boolean(openModal)}
      onClose={() => setOpenModal(false)}
      withCloseButton={withCloseBtn}
      title={title}
    >
      {children}
    </MantineModal>
  );
};

export default BaseModal;
