import io from "socket.io-client";

export const createActionsTrigger = (configuration, store) => {

    if (process.env.NODE_ENV === 'production') return null;

    var socket = io(`http://localhost:${configuration.port}`);

    //Get reference to store
    store = store ? store : configuration.store;

    //Create object to store references to actions creators    
    var actionCreatorsMap = {};

    configuration.triggers.forEach( (trigger) => {
        const actionCreatorName = trigger.actionCreator.name;
        actionCreatorsMap[actionCreatorName]=trigger.actionCreator;
        trigger.actionCreatorName=actionCreatorName;
    });

    //Event listeners    

    socket.on('connect', function(){
        socket.emit("updateConfiguration", configuration);
    });

    socket.on('requestConfiguration', function(){
        socket.emit("updateConfiguration", configuration);
    });


    socket.on('dispatch', function(data){
        
        const actionCreator = actionCreatorsMap[data.actionCreatorName];
        const parameters = data.parameters;
        
        if(actionCreator){
            store.dispatch(actionCreator(parameters));
        }else{
            socket.emit("error", {
                msg:"Action creator not defined",
                code:1
            });
        }
        
    });

    return {socket, configuration, store};
    
}
