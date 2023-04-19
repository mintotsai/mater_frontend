// https://chat.openai.com/c/0f9514d2-11b0-4182-b331-6fd3d1bb7553
export function changedFields(initialValues, values) {
  return Object.entries(values).filter(
    ([key, value]) => value !== initialValues[key]
  );
}

export function changedValues(changedFields) {
  return changedFields.reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {}
  );
}