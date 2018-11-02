pragma solidity ^0.4.22;

contract SimpleStore {
    struct Item {
        uint price;
        uint units; 
    }
  
    Item[] public items;

    function newItem(uint _price, uint _units) public
    {
        Item memory item = Item(_price, _units);
        items.push(item);
    }

    function getUsingStorage(uint _itemIdx) public
    // set to non-view to estimate gas
    // view
    returns (uint)
    {
        Item storage item = items[_itemIdx];
        return item.units;
    }

    function getUsingMemory(uint _itemIdx) public
    // set to non-view to estimate gas
    // view
    returns (uint)
    {
        Item memory item = items[_itemIdx];
        return item.units;
    }

    function addItemUsingStorage(uint _itemIdx, uint _units) public
    {
        Item storage item = items[_itemIdx];
        item.units += _units;
    }

    function addItemUsingMemory(uint _itemIdx, uint _units) public
      // set to non-view to estimate gas
      // view
      {
        Item memory item = items[_itemIdx];
        item.units += _units;
    }

}