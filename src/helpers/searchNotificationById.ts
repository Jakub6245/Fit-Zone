export const searchById = (arr: { id: string }[], id: string) => {
  console.log(arr);
  return arr.findIndex((obj) => obj.id === id)!;
};
