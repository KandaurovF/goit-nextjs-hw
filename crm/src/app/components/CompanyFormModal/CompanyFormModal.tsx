'use client';

import React from 'react';
import CompanyForm from './CompanyForm';
import Modal, { ModalProps } from '@/app/components/common/Modal';

interface CompanyFormModalProps extends ModalProps {
  isEditMode?: boolean;
}

export default function CompanyFormModal({
  onClose,
  isEditMode,
  ...rest
}: CompanyFormModalProps) {
  return (
    <Modal {...rest} onClose={onClose}>
      <CompanyForm isEditMode={isEditMode} onSubmit={() => onClose()} />
    </Modal>
  );
}
