
import React, {useState, Fragment} from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";
import ActionTriggersContainer from "./components/ActionsTriggerContainer";
import {Global, jsx, css} from "@emotion/core";

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const conectionPortParam = getUrlParameter("conectionPort");
const conectionPort = conectionPortParam ? conectionPortParam : location.port;
console.log(`conectionPort: ${conectionPort}`);
const socket = io(`http://localhost:${conectionPort}`);


const GLOBAL_STYLES = css`
    body{
        background:#1b1b1b;
        margin-top:50px;
    }

    *{
        margin:0;
        padding:0
    }
`;


const App = ({socket}) => {

    const [actionTriggers, setActionTriggers] = useState([]);

    //Event listeners 
    socket.on('connect', function(){
        socket.emit("requestConfiguration");
    });
    
    socket.on('updateConfiguration', function(configuration){
        setActionTriggers(configuration.triggers);
    });
    

    const dispatch = (actionCreatorName, parameters) => {
        socket.emit("dispatch", {actionCreatorName, parameters} )
    }

    return <Fragment>
        <Global styles={GLOBAL_STYLES}/>
        <ActionTriggersContainer actionTriggers={actionTriggers} dispatch={dispatch} />
    </Fragment>

}




ReactDOM.render(     
    <App socket={socket} />,
    document.getElementById("root")
);
