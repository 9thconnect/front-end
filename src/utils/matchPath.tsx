export const removeTrailingSlash = (val: string) =>
  val.endsWith("/") ? val.substring(0, val.length - 1) : val;

// export const matchesPathname = (asPath: string, pathname: string) => {
//   if (asPath === pathname) {
//     return true;
//   }
//   const baseAsPath = removeTrailingSlash(asPath.split("?")[0] as string);
//   const basePathname = removeTrailingSlash(pathname.split("?")[0] as string);
//   if (baseAsPath === basePathname) {
//     return true;
//   }
//   const basePathRegex = new RegExp(
//     `^${basePathname.replace(/(\[[a-zA-Z0-9-]+\])+/g, "[a-zA-Z0-9-]+")}$`
//       .replace(/\[\[\.\.\.[a-zA-Z0-9-]+\]\]/g, "?.*")
//       .replace(/\[\.\.\.[a-zA-Z0-9-]+\]/g, ".*")
//   );
//   if (basePathRegex.test(baseAsPath)) {
//     return true;
//   }
//   return false;
// };

// utils/matchPath.ts
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
