import React, { useContext, useEffect } from 'react';
import styles from './index.scss';

import Vlist from 'components/virtual_list';
import useVitualList from 'hooks/useVitualList';
import faker from 'faker';
export interface HelloWorldProps {
    userName?: string;
    lang?: string;
}
export default (props) => {
    function getUsers(num) {
        const users = [];
        let str = '';
        for (let i = 0; i < num; i++) {
            str += faker.internet.email();
            users.push({
                name: faker.name.findName(),
                email: faker.internet.email(),
            });
        }

        return users;
    }

    const users = getUsers(5000);
    const [VitualList] = useVitualList({
        renderItem: ({ index }) => {
            return (
                <div className={styles.listItem}>
                    <div>{users[index].name}</div>
                    <div style={{ display: 'inline-block', wordBreak: 'break-all', wordWrap: 'break-word' }}>
                        {users[index].email}
                    </div>
                </div>
            );
        },
        listData: users,
        height: 400,
        overscanRowCount: 3,
        // vertical: false,
    });
    return (
        <div className={styles.con}>
            {/* {VitualList()} */}

            <VitualList />
            {/* <Vlist /> */}
        </div>
    );
};
