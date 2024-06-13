import React from 'react';
import { Address } from '@/apis/address/useAddressSearch';

interface AddressListProps {
  address: Address[] | undefined;
  onClick: (data: Address) => void;
}

const AddressList = ({ address, onClick }: AddressListProps) => {
  return (
    <div
      data-testid="address-container"
      className="absolute z-10 flex min-h-100pxr w-full rounded-b-lg border bg-layer-1 px-10pxr py-15pxr text-sm"
    >
      {address && address.length > 0 ? (
        <ul className="flex w-full flex-col gap-3">
          {address.map((data) => (
            <li
              className="cursor-pointer hover:font-bold"
              key={data.addressName}
              onClick={() => onClick(data)}
            >
              {data.addressName}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex w-full items-center justify-center">
          <span>검색 결과가 없어요</span>
        </div>
      )}
    </div>
  );
};

export default AddressList;
