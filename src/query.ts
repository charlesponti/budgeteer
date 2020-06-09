interface SearchQuery {
  [key: string]: string | RegExp | Date | { $in: any[] };
}

export const buildRegExpQuery = (str: string): RegExp =>
  new RegExp(`.*${str}.*`, 'i');

/**
 * Builds a mongoose query object to search transactions.
 * @param name String containing the account name or part of the account's name
 * @param routingNumber String containing the birthday or part of the account
 */
export const buildSearchQuery = (
  stringFields: string[],
  query: { [field: string]: any } = {},
): SearchQuery => {
  if (query && Object.keys(query).length > 0) {
    return stringFields.reduce((obj: object, field: string) => {
      if (query[field])
        return { ...obj, [field]: buildRegExpQuery(query[field]) };
      return obj;
    }, {});
  }

  return {};
};
