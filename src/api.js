let ip = 
    // 'http://sparklv.cn'//线上
    // ''//本地


let path = {

}

let url = {}

for (item in path) {
    url[item] = ip + path[item];
}

export default url