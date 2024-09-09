const os=require('os')

const user = os.userInfo();
console.log(user);

console.log(`System uptime:${os.uptime()}`)

const currentOs={
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    platform: os.platform(),
    machine: os.machine(),
}
console.log(currentOs)
