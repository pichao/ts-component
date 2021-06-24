import React from 'react';
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, Grid, ColumnSizer } from 'react-virtualized';
import { debounce } from 'lodash-es';
/*
@params
renderItem: list每一行布局，函数，返回react element；
listData: 列表数据；
height: 决定真实dom渲染条数；
overscanRowCount：可视区上下各自渲染多少条，以便滑动平滑
*/

const useVitualList = ({ renderItem, listData, height, overscanRowCount, vertical = true }) => {
    let cache = new CellMeasurerCache({
        fixedWidth: true, // 表示 cell 元素是固定宽度的，但高度是动态的
        defaultHeight: 180, // 未被渲染的 cell 元素的默认高度(或预估高度)
    });
    if (!vertical) {
        cache = new CellMeasurerCache({
            defaultWidth: 100,
            fixedHeight: true,
        });
    }

    const itemRender = useCallback(({ index, columnIndex, rowIndex, key, style, parent }) => {
        if (!vertical) {
            return (
                <CellMeasurer cache={cache} columnIndex={columnIndex} key={key} parent={parent} rowIndex={rowIndex}>
                    <div style={style}>{renderItem({ index: columnIndex, key, style, parent })}</div>
                </CellMeasurer>
            );
        }
        return (
            <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={index}>
                <div style={style}>{renderItem({ index, key, style, parent })}</div>
            </CellMeasurer>
        );
    }, []);

    const VitualList = useCallback(() => {
        if (!vertical) {
            return (
                <AutoSizer disableHeight>
                    {({ width }) => {
                        console.log(width, 'width');
                        return (
                            <Grid
                                // className={styles.BodyGrid}
                                columnCount={listData.length}
                                columnWidth={cache.columnWidth}
                                deferredMeasurementCache={cache}
                                height={400}
                                overscanColumnCount={overscanRowCount}
                                cellRenderer={itemRender}
                                rowCount={1}
                                rowHeight={cache.rowHeight}
                                width={width}
                            />
                        );
                    }}
                </AutoSizer>
            );
        }
        return (
            <AutoSizer disableHeight>
                {({ width }) => {
                    console.log(width, height);
                    return (
                        <List
                            width={width}
                            height={height} // 决定真实dom渲染多少行
                            rowHeight={cache.rowHeight}
                            deferredMeasurementCache={cache}
                            rowRenderer={itemRender}
                            rowCount={listData.length}
                            noRowsRenderer={() => <div>1111111111</div>}
                            overscanRowCount={overscanRowCount} // 可视区上下多少条预渲染
                        />
                    );
                }}
            </AutoSizer>
        );
    }, []);
    return [VitualList];
};
export default useVitualList;
// import React, { useCallback, useEffect, useMemo, useRef } from 'react';
// import { VariableSizeList as List,areEqual  } from 'react-window';

// import AutoSizer from 'react-virtualized-auto-sizer';
// const Row = ({ data, index, setSize, renderItem }) => {
//     const rowRef = useRef() as any;

//     useEffect(() => {
//         setSize(index, rowRef.current.getBoundingClientRect().height);
//     }, [setSize, index]);

//     return <div ref={rowRef}>{renderItem({ index })}</div>;
// };
// const useVitualList = ({ renderItem, listData, height, overscanRowCount }) => {
//     const listRef = useRef() as any;
//     const sizeMap = useRef({});
//     const setSize = useCallback((index, size) => {
//         sizeMap.current = { ...sizeMap.current, [index]: size };
//         listRef.current.resetAfterIndex(index);
//     }, []);
//     const getSize = (index) => sizeMap.current[index] || 50;

//     const VitualList = useCallback(
//         () => (
//             <List
//                 ref={listRef}
//                 height={300}
//                 width="100%"
//                 itemCount={listData.length}
//                 itemSize={getSize}
//                 itemData={listData}
//             >
//                 {({ data, index, style }) => (
//                     <div style={style}>
//                         <Row data={data} renderItem={renderItem} index={index} setSize={setSize} />
//                     </div>
//                 )}
//             </List>
//         ),
//         [],
//     );
//     return [VitualList];
// };

// export default useVitualList;
