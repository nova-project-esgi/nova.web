export const isOfTypeByKey = <T>(
  varToBeChecked: any,
  propertyToCheckFor: keyof T
): varToBeChecked is T =>
  (varToBeChecked as T)[propertyToCheckFor] !== undefined;

export const isOfTypeByKeys = <T>(
  varToBeChecked: any,
  ...propertiesToCheckFor: string[]
): varToBeChecked is T =>
  propertiesToCheckFor.every(key => (varToBeChecked as T)[key] !== undefined);

// export const isOfTypeByCtr = <T>(
//   varToBeChecked: any,
//   ctr: any
// ): varToBeChecked is T =>
//   isOfTypeByKeys<T>(varToBeChecked, ...ObjectUtils.getPropertiesByType(ctr));

export const isObject = (obj: any): boolean => {
  return !!obj && typeof obj === 'object';
};
