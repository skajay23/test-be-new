const getYearMonthDay = (year, month, day) => {
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}${month}${day}`;
};

const getCategoryCode = (id: number) => {
  let idStr = id.toString();

  while (idStr.length !== 5) {
    idStr = `0${idStr}`;
  }

  return idStr;
};

const getRiskItemOrderString = (id: number) => {
  let idStr = id.toString();

  while (idStr.length !== 6) {
    idStr = `0${idStr}`;
  }

  return idStr;
};

export const generateRiskUniqueKey = (riskItem: any) => {
  const { updatedAt } = riskItem;

  const date = new Date(updatedAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const productCharacter = riskItem.productId;
  const categoryCharacter = riskItem.categoryId;

  const dateString = getYearMonthDay(year, month, day);
  const orderString = getRiskItemOrderString(riskItem.id);

  return `${productCharacter}${categoryCharacter}${dateString}${orderString}`;
};
