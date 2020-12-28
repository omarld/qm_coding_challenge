import React from 'react';

import styles from './SqlPanel.module.scss';

const SqlPanel = (props) =>{

    const {results} = props;

    return (
        <div className={styles.sqlMain}>
            <pre>{`
                var test = 'asdf'
                ${results}
            `}</pre>
        </div>
    )
}

export default SqlPanel;