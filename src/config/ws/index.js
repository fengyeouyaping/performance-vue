import WebsocketHeartbeatJs from 'websocket-heartbeat-js';
const wsUrl = process.env.VUE_APP_WS_ADDRESS
// var pako = require('pako');

let websocketHeartbeatJs=''
const socket = () => {
    
    websocketHeartbeatJs = new WebsocketHeartbeatJs({url: wsUrl});
    websocketHeartbeatJs.onopen = function () {
        console.log('connect success');
        websocketHeartbeatJs.send('hello server');
    }
    websocketHeartbeatJs.onmessage = function (e) {
        getMessage(e.data)
    }
    websocketHeartbeatJs.onreconnect = function () {
        console.log('reconnecting...');
    }
    websocketHeartbeatJs.onclose = () => {
        console.log('connect close');
    }
    websocketHeartbeatJs.onerror = () => {
        console.log('connect onerror');
    }
}

//接受数据函数
let getMessage = (data) => {
    async function getSet(){
        const n = await new Promise((resolve,reject)=>{
            if(data instanceof Blob){
                // let result = '';
                // let reader = new FileReader();
                // //FileReader：从Blob对象中读取数据
                // reader.onload = function() {
                //     // console.log("----",pako.inflate)
                //     result = JSON.parse(pako.inflate(reader.result,{to:'string'}));
    
                //     //pako.inflate()对数据进行解压，得到正常的json对象
                //     resolve(result)
                    
                // }
                // reader.readAsBinaryString(data);
                
                //将返回的数据解析为字符串格式
            }else{
    
                if(!!data && JSON.parse(data) && JSON.parse(data)['ping']){
                    let time = JSON.parse(data)['ping']
                    heartbeat(time)
                }
            }

        })
        return n
    }
    getSet().then((val) =>{
        store.dispatch("market/newDataUpdata",val)
        if(callback) callback(val) 
    })
}

//心跳函数
let heartbeat = (time) => {
    websocketHeartbeatJs.send(JSON.stringify({pong:time}));
}

export default socket

