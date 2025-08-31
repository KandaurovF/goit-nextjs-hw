import React from 'react';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type Promotion, removePromotion } from '@/app/lib/api';
import toast from 'react-hot-toast';

export interface PromotionProps {
  promotion: Promotion;
}

export default function Promotion({ promotion }: PromotionProps) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: removePromotion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['promotions', promotion.companyId],
      });

      queryClient.invalidateQueries({
        queryKey: ['promotions'],
        exact: true,
      });

      toast.success('Deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete');
    },
  });

  const handleRemove = async () => {
    mutateAsync(promotion._id);
  };

  return (
    <div className="rounded overflow-hidden bg-gray-100">
      <div className="relative rounded w-full h-40 bg-gray-300">
        {promotion.avatar && (
          <Image
            className="object-contain"
            fill
            src={promotion.avatar}
            alt="promotion avatar"
          />
        )}
        <div className="w-14 h-14 absolute top-0 left-px rounded-br-full bg-lime-200" />
        <div className="w-14 h-14 absolute inset-0 py-3 pr-3 pl-0.5 rounded-br-full bg-gray-900">
          <p className="text-center text-xs font-bold text-lime-200">{`-${promotion.discount}%`}</p>
        </div>
        <button
          type="button"
          className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 border-2 border-lime-200 rounded-full bg-gray-100"
          onClick={handleRemove}
          disabled={isPending}
        >
          <Image
            width={14}
            height={14}
            src="/icons/x-mark.svg"
            alt="close icon"
          />
        </button>
      </div>

      <div className="h-32 p-5 overflow-y-auto">
        <p className="mb-3 text-base font-semibold text-gray-900">
          {promotion.title}
        </p>
        <p className="text-sm text-gray-900">{promotion.description}</p>
      </div>
    </div>
  );
}
