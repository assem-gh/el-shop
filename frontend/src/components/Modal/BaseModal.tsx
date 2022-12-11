import React, { Dispatch, ReactNode, SetStateAction, useCallback } from "react";
import { LoadingOverlay, Modal as MantineModal } from "@mantine/core";

interface ModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  withCloseBtn?: boolean;
  title?: string;
  loading?: boolean;
}

const BaseModal = ({
  openModal,
  setOpenModal,
  withCloseBtn = false,
  children,
  loading = false,
  title = "",
}: ModalProps) => {
  const handleClose = useCallback(() => setOpenModal(false), [setOpenModal]);
  return (
    <MantineModal
      opened={openModal}
      onClose={handleClose}
      withCloseButton={withCloseBtn}
      title={title}
    >
      <LoadingOverlay visible={loading} />
      {children}
    </MantineModal>
  );
};

export default BaseModal;
