export const removeEmptyKeys = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null && v !== "")
  );
};
