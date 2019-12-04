/** @jsx jsx */

import {css, jsx} from "@emotion/core";
import SingleActionTrigger from "./SingleActionTrigger.js";


const styles = css`

    background: none;
    width: 100%;
    max-width:550px;
    margin: 0 auto;
    padding: 0;
    text-align: center;
`;


const ActionTriggersContainer= ({actionTriggers, dispatch}) => {

    const actionTriggersList = actionTriggers.map((trigger, index) => {
        return <SingleActionTrigger key={index} {...trigger} dispatch={dispatch} />
    });

    return (<div css={styles}>{actionTriggersList}</div>);
}


export default ActionTriggersContainer;
