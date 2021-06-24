import React, { useCallback } from 'react';
import { Table, Column, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
const useVitualTable = ({ tableData }) => {
    console.log(tableData);
    const Vtable = useCallback(
        () => (
            <AutoSizer>
                {({ width, style }) => {
                    console.log(width, style, 'width');
                    return (
                        <Table
                            style={style}
                            rowClassName="table-row"
                            headerHeight={40}
                            width={width}
                            height={300}
                            rowHeight={40}
                            rowCount={tableData.length}
                            rowGetter={({ index }) => {
                                console.log(tableData[index]);
                                return tableData[index];
                            }}
                        >
                            <Column label="Id" dataKey="id" width={width * 0.2} />
                            <Column label="Name" dataKey="name" width={width * 0.4} />
                            <Column label="E.mail" dataKey="email" width={width * 0.4} />
                        </Table>
                    );
                }}
            </AutoSizer>
        ),
        [],
    );

    return [Vtable];
};
export default useVitualTable;
