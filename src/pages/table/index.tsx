import React, { useContext, useEffect } from 'react';
import styles from './index.scss';
import useVitualTable from 'hooks/useVitualTable';

import faker from 'faker';

export default () => {
    const getTableData = (num) => {
        const users = [];
        let str = '';
        for (let i = 0; i < num; i++) {
            str += faker.internet.email();
            users.push({
                id: i,
                name: faker.name.findName(),
                email: str,
            });
        }

        return users;
    };
    const [Vtable] = useVitualTable({ tableData: getTableData(100000) });

    return <Vtable />;
};
