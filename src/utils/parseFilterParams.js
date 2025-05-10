const parseContactType = (type) => {
  if (typeof type !== 'string') return;
  const isType = ['work', 'home', 'personal'];

  if (isType.includes(type)) return type;
};

const parseBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return null;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseContactType(type);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
