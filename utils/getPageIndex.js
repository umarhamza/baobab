const getPageIndex = (item, originalList) => {
  if (originalList) {
    const englishList = originalList.map((origin) => origin.english);
    return englishList.indexOf(item.english);
  } else {
    return null;
  }
};

export default getPageIndex;
