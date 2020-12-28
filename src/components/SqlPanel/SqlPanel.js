import React from 'react';

import styles from './SqlPanel.module.scss';

const SqlPanel = (props) =>{

    return (
        <div className={styles.sqlMain}>
            <code>{`
                var test = 'asdf'
            `}</code>
        </div>
    )
}

export default SqlPanel;