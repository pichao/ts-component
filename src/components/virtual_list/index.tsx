import React from 'react';
import faker from 'faker';
// import { FixedSizeList as List } from 'react-window';
// import AutoSizer from 'react-virtualized-auto-sizer';
import styles from './index.scss';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
// creates a list of fake users
console.log(faker, 'faker');
function getUsers(num) {
    const users = [];
    let str = '';
    for (let i = 0; i < num; i++) {
        str += faker.internet.email();
        users.push({
            name: faker.name.findName(),
            email: str,
        });
    }

    return users;
}

const users = getUsers(100000);
console.log(users);
export default () => {
    const renderItem = ({ index, key, style, parent }) => {
        return (
            <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={index}>
                <div style={style}>
                    <div className={styles.listItem}>
                        <div>{users[index].name}</div>
                        <div style={{ display: 'inline-block', wordBreak: 'break-all', wordWrap: 'break-word' }}>
                            {users[index].email}
                        </div>
                    </div>
                </div>
            </CellMeasurer>
        );
    };
    const cache = new CellMeasurerCache({
        fixedWidth: true, // 表示 cell 元素是固定宽度的，但高度是动态的
        defaultHeight: 180, // 未被渲染的 cell 元素的默认高度(或预估高度)
    });

    return (
        <AutoSizer disableHeight>
            {({ width, height }) => (
                <List
                    width={width}
                    height={400} // 决定真实dom渲染多少行
                    rowHeight={cache.rowHeight}
                    deferredMeasurementCache={cache}
                    rowRenderer={renderItem}
                    rowCount={users.length}
                    overscanRowCount={3} // 可视区上下多少条预渲染
                />
            )}
        </AutoSizer>
    );
};
