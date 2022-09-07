import { memo } from 'react';

interface IBaseComponentProps {
  children?: React.ReactNode;
}

const BaseComponent: React.FC<IBaseComponentProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default memo(BaseComponent);
