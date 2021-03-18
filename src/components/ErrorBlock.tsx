import { FC, memo } from 'react';

interface IErrorBlock {
  error: String;
}

/**
 * Simple component to show error to user.
 */
const ErrorBlock: FC<IErrorBlock> = ({ error }) => {
  if (!error) {
    return null;
  }

  return <div>{error}</div>;
};

export default memo(ErrorBlock);
