import React from 'react';
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { debounce } from 'lodash-es';
/* 
@params
renderItem: list每一行布局，函数，返回react element；
listData: 列表数据；
height: 决定真实dom渲染条数；
overscanRowCount：可视区上下各自渲染多少条，以便滑动平滑
*/
const useVitualList = ({ renderItem, listData, height, overscanRowCount }) => {
    const itemRow = useCallback(({ index, key, style, parent }) => {
        return (
            <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={index}>
                <div style={style}>
                    {/* <div className={styles.listItem}>
                        <div>{users[index].name}</div>
                        <div style={{ display: 'inline-block', wordBreak: 'break-all', wordWrap: 'break-word' }}>
                            {users[index].email}
                        </div>
                    </div> */}
                    {renderItem({ index, key, style, parent })}
                </div>
            </CellMeasurer>
        );
    }, []);
    const cache = new CellMeasurerCache({
        fixedWidth: true, // 表示 cell 元素是固定宽度的，但高度是动态的
        defaultHeight: 180, // 未被渲染的 cell 元素的默认高度(或预估高度)
    });
    const VitualList = useCallback(() => {
        return (
            <AutoSizer disableHeight>
                {({ width }) => (
                    <List
                        width={width}
                        height={height} // 决定真实dom渲染多少行
                        rowHeight={cache.rowHeight}
                        deferredMeasurementCache={cache}
                        rowRenderer={itemRow}
                        rowCount={listData.length}
                        overscanRowCount={overscanRowCount} // 可视区上下多少条预渲染
                    />
                )}
            </AutoSizer>
        );
    }, []);
    return [VitualList];
};
export default useVitualList;
