import React from 'react';
import DropdownItem from './dropdown-item';
import styles from './index.module.css';

const Dropdown = ({ items }) => {
  const CountChildren = (items) => {
    let count = items.length;
    items.forEach((level1) => {
      if (level1.children) {
        count += level1.children.length;
      }
    });
    return count;
  };

  const createDropDown = (items) => {
    let blocks = [];
    blocks.push([]);
    let countChildren = CountChildren(items);
    let currentIndex = 0;
    let currentColumn = 0;

    items.forEach((level1Item) => {
      if (level1Item.breakListBefore) {
        currentColumn++;
        currentIndex = 0;
        blocks.push([]);
      }
      blocks[currentColumn].push({ level: 1, data: level1Item });

      if (level1Item.children) {
        level1Item.children.forEach((level2Item) => {
          if (level2Item.breakListBefore) {
            currentIndex++;
            if (
              level2Item.breakListBefore ||
              currentIndex > countChildren / currentColumn
            ) {
              currentColumn++;
              currentIndex = 0;
              blocks.push([]);
            }
          }
          blocks[currentColumn].push({ level: 2, data: level2Item });
        });
      }
    });

    return blocks.map((column, index) => {
      return (
        <ul key={index} className={styles.colMd3}>
          {column.map((item, index) => {
            return <DropdownItem key={index} item={item}></DropdownItem>;
          })}
        </ul>
      );
    });
  };

  return <div className={styles.MenuWrapper}>{createDropDown(items)}</div>;
};

export default Dropdown;
