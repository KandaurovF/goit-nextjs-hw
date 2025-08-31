import React from 'react';
import Button from '../Buttons/Button';

interface HandleErrorComponentProps {
  error: Error;
  notFoundMessage: string;
  refetch: () => void;
}

const HandleErrorComponent: React.FC<HandleErrorComponentProps> = ({
  error,
  notFoundMessage,
  refetch,
}) => {
  const status = (error as any).status;

  if (status === 404) {
    return <h2 className="text-lg">{notFoundMessage}</h2>;
  }

  if (error.message === 'Failed to fetch') {
    return (
      <>
        <h2 className="font-semibold ">Ooops! Something went wrong... </h2>
        <p className="text-sm text-gray-500 mb-2">{`Error: ${error.message}`}</p>
        <Button onClick={() => refetch()}>Try again</Button>
      </>
    );
  }

  throw error;
};

export default HandleErrorComponent;
