import React, { Component } from 'react';
import Row from 'components/Row/Row';
import styles from './SessionSearch.module.scss';

import { getAllConditions } from 'Services/SqlService';

export class SessionSearch extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const conditions = getAllConditions()
        return (
            <section className={styles.mainContent} aria-label="search fields">
                <Row conditions={conditions}/>
            </section>
        )
    }
}

export default SessionSearch;