export const categoriesToSingleString = (data) => {
  console.log(data);
  let result = "";
  data.forEach((category, index) => {
    if (index > 0) result += ", " + category.name.trim();
    else result += category.name.trim();
  });
  return result;
};
