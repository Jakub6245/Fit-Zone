export const handlePromise = (onSuccess: () => void, onError: () => void) => {
  try {
    onSuccess();
  } catch (error) {
    console.log(error);
    onError();
  }
};
