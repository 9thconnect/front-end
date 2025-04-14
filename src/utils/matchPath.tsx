export const removeTrailingSlash = (val: string) =>
  val.endsWith("/") ? val.substring(0, val.length - 1) : val;

export const matchesPathname = (
  currentPath: string,
  targetPath: string
): boolean => {
  // Split the path and query parts
  const [currentBasePath, currentQuery] = currentPath.split("?");
  const [targetBasePath, targetQuery] = targetPath.split("?");

  // Match base paths
  const isBasePathMatch =
    currentBasePath === targetBasePath ||
    targetBasePath.startsWith(currentBasePath) ||
    currentBasePath.startsWith(targetBasePath);

  // If base paths don't match, return false
  if (!isBasePathMatch) return false;

  // If there are no query parameters in the target path, it's a match
  if (!targetQuery) return true;

  // Convert query parameters to objects for comparison
  const currentQueryParams = new URLSearchParams(currentQuery);
  const targetQueryParams = new URLSearchParams(targetQuery);

  // Check if the target query parameters are a subset of current query parameters
  for (const [key, value] of targetQueryParams) {
    if (currentQueryParams.get(key) !== value) {
      return false;
    }
  }

  return true;
};
