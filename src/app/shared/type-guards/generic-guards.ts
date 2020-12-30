export const isOfTypeByKey = <T>(
  varToBeChecked: any,
  propertyToCheckFor: keyof T
): varToBeChecked is T =>
  (varToBeChecked as T)[propertyToCheckFor] !== undefined;

export const isOfTypeByKeys = <T>(
  varToBeChecked: any,
  ...propertiesToCheckFor: (keyof T)[]
): varToBeChecked is T =>
  propertiesToCheckFor.every(key => (varToBeChecked as T)[key] !== undefined);


export const isObject = (obj: any): boolean => {
  return !!obj && typeof obj === 'object';
};
