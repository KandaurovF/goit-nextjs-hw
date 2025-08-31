import React, { useState } from 'react';
import clsx from 'clsx';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Image from 'next/image';
import { Company, removeCompany } from '@/app/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CompanyFormModal } from '@/app/components/CompanyFormModal';
import {
  ActionsCompanyState,
  useActionsCompanyStore,
} from '@/app/store/useActionsCompanyStore';
import toast from 'react-hot-toast';

export interface ActionMenuProps {
  company: Company;
}

function ActionMenu({ company }: ActionMenuProps) {
  const queryClient = useQueryClient();

  const setCompany = useActionsCompanyStore(
    (state: ActionsCompanyState) => state.setCompany,
  );

  const [isEditing, setIsEditing] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: removeCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['companies'],
      });

      toast.success('Deleted successfully');
    },

    onError: () => {
      toast.error('Failed to delete');
    },
  });

  const handleRemove = async () => {
    mutateAsync(company._id);
  };

  const handleEdit = () => {
    setCompany(company);
    setIsEditing(true);
  };

  return (
    <>
      <Menu as="div" className="relative text-right">
        <MenuButton className="inline-flex justify-center px-2 py-4 hover:bg-gray-200 rounded">
          <Image
            src="/icons/mini_ellipsis-vertical.svg"
            alt="Actions"
            width={24}
            height={24}
          />
        </MenuButton>

        <MenuItems className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem>
            {({ focus }) => (
              <button
                onClick={handleEdit}
                className={clsx(
                  'group flex rounded items-center w-full p-2 ',
                  focus && 'bg-gray-200 font-semibold',
                )}
              >
                <Image
                  src="/icons/edit.svg"
                  alt="Edit"
                  width={20}
                  height={20}
                  className="mr-3"
                />
                Edit
              </button>
            )}
          </MenuItem>

          <MenuItem>
            {({ focus }) => (
              <button
                onClick={handleRemove}
                disabled={isPending}
                className={clsx(
                  'group flex rounded items-center w-full p-2 ',
                  focus && 'bg-gray-200 font-semibold',
                )}
              >
                <Image
                  src="/icons/trash.svg"
                  alt="Trash"
                  width={20}
                  height={20}
                  className="mr-3"
                />
                Delete
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>

      {isEditing && (
        <CompanyFormModal
          show={isEditing}
          onClose={() => setIsEditing(false)}
          isEditMode
        />
      )}
    </>
  );
}

export default ActionMenu;
