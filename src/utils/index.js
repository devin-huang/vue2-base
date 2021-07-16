const getDataType = (name) => {
  return (type) => Object.prototype.toString.call(type) === `[object ${name}]`;
};

export const isError = (value) => getDataType("Error")(value);

export const isObject = (value) => getDataType("Object")(value);

export const isString = (value) => getDataType("String")(value);

export const isNumber = (value) => getDataType("Number")(value);
