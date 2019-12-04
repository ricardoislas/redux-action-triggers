/** @jsx jsx */

import {css, jsx} from "@emotion/core";

const styles= css`

    /* Container */
    background: #444242;
    border: 1px solid #ababab;
    width: 90%;
    margin: 15px 5%;
    padding: 15px 0;
    border-radius: 10px;
    font-family: arial;
    font-size: 14px;
    font-weight: normal;

    input{
        width: 200px;
        height: 15px;
        margin: 6px;
        border-radius: 6px;
        padding: 2px 7px;
        font-size: 14px;
    }
    
    label{
        margin:10px;
        color:white;
    }

    button{
        font-size: 16px;
        font-family: arial;
        font-weight: bold;
        padding: 6px 12px;
        border-radius: 4px;
        border: 1px solid #2f2f2f;
        color: #444242;
        margin: 10px;
        background: #FFC107;

        &:hover{
            background: #E91E63;
            color: white;
        }
    }

`;

const SingleActionTrigger = ({actionCreatorName, parameters:params=[], dispatch}) => {

    const refs = [];

    const inputs = params.map((param, index) => {

        const valueType = typeof param.value;
        const value = valueType==="object" ? JSON.stringify(param.value) : param.value; 

        return <div key={index}><label>{param.name}</label><input ref={(node) => (refs[index]={node, valueType})} defaultValue={value}></input></div>
    });

    
    const triggerAction = () => {

        try{

            const params = refs.map((ref) => {
                return ref.valueType==="object" ? JSON.parse(ref.node.value) : ref.node.value; 
            });
    
            dispatch(actionCreatorName, params);

        }catch(error){
            alert(`Error while parsing parameters of ${actionCreatorName}\nObjects must be written in JSON format`);
        }
    }
    

    return (<div css={styles} >
        <button onClick={triggerAction}>{actionCreatorName}</button>
        {inputs}
    </div>);
}

export default SingleActionTrigger;