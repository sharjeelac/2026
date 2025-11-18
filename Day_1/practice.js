var a = 10;
let b = 20;
const c = 30;

if(true){
    a = 50;
    b = 60;
    const c = 80;

    console.log("Inside Block" , a, b ,c)
}

console.log('outside Block', a, b, c)