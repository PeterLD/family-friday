import _ from 'lodash';

export const immutablePush = (list, item) => [...list, item];

export const toggleIsHere = (list, id) => {
  let tempList = [...list];

  let employee = _.find(tempList, {id: id}); // get employee object

  employee.isHere = !employee.isHere;

  return tempList
}

export const splitGroups = (list, maxSize=5, minSize=3) => {
  let tempList = [...list];
  let groups = [];
  let sliceSize = maxSize;

  while (tempList.length) {

    // Check if current slice size will create a problem
    if ((tempList.length - sliceSize) === 0 || (tempList.length - sliceSize) >= minSize) {
      groups.push(tempList.slice(0, sliceSize));
      tempList = tempList.slice(sliceSize);
    } else {
      sliceSize -= 1;
    }
  }

  return groups;
}
