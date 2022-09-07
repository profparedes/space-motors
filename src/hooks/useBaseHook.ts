import { useMemo, useState } from 'react';

type BaseHookType = (
  arg1: boolean,
  arg2: boolean,
) => {
  value1: boolean;
  value2: boolean;
  setValue1: React.Dispatch<React.SetStateAction<boolean>>;
  setValue2: React.Dispatch<React.SetStateAction<boolean>>;
};

const useBaseHook: BaseHookType = (arg1, arg2) => {
  const [value1, setValue1] = useState(arg1);
  const [value2, setValue2] = useState(arg2);

  return useMemo(
    () => ({
      value1,
      value2,
      setValue1,
      setValue2,
    }),
    [value1, value2],
  );
};

export default useBaseHook;
