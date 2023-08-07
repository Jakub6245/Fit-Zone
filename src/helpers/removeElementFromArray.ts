export const removeElementFromArray = (
  array: { id: string }[],
  elementId: string
) => {
  const removeIndex = array.findIndex((el) => el.id === elementId);
  if (removeIndex === -1) return;
  return array.splice(removeIndex, 1);
};
