(function () {
  var items = [];
  var itemsMap = {};

  function addItem(item) {
    if (itemsMap[item.uid] && (itemsMap[item.uid].summary && itemsMap[item.uid].summary !== '' || item.summary === '')) {
      return;
    }
    item.langs = ['js'];
    // javascript dosen't allow method / class with the same name
    if (itemsMap[item.uid] !== undefined && items[items.length - 1].uid == item.uid) {
      items[items.length - 1] = item;
    } else {
      if (item.type === 'Class') {
        // put class in front of item array to ensure serialize won't skip anything useful.
        items.unshift(item);
      } else {
        items.push(item);
      }
    }
    itemsMap[item.uid] = item;
  }

  module.exports = {
    addItem: addItem,
    items: items,
    itemsMap: itemsMap
  };
})();