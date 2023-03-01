// https://bobbyhadz.com/blog/react-capitalize-first-letter
export function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function capitalizeFirstLowercaseRest(str) {
  return (
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  );
};