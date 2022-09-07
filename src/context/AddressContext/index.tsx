import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import ApiCEP from 'services/ApiCEP';

import { AddressType } from 'types/AddressType';

interface IContextProps {
  address: AddressType | null;
  fetchAddress: (cep: string) => Promise<void>;
}

interface IAddressProviderProps {
  children: React.ReactNode;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

export const AddressProvider: React.FC<IAddressProviderProps> = ({
  children,
}) => {
  const [address, setAddress] = useState<AddressType | null>(null);

  const fetchAddress = useCallback(async (cep: string) => {
    const { data } = await ApiCEP.get(`/${cep}/json/`);
    // eslint-disable-next-line no-console
    setAddress(data);
  }, []);

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          address,
          fetchAddress,
        }),
        [address, fetchAddress],
      )}
    >
      {children}
    </ReactContext.Provider>
  );
};

export const useAddress = (): IContextProps => {
  const context = useContext(ReactContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useAddressHook must be within AddressProvider');
  }

  return context;
};
