export const isEmpty = (value: { trim: () => any }) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
