let num = 10;
// error of typecaset
// num= 'd';

let num1: any | number| string ;
num1 ='HZ';

interface ICar{
    color: string,
    model:string,
    topSpeed ?:number
}


const car1 :ICar ={
    color: "Black",
    model: "2024",
    topSpeed: 100000
}

const Car2 :ICar={
    color: "Blue",
    model: "2014"
}

//return numb
const Multiply=(x:number,y: number) :number =>{

    return x*y;

}
//return numb
const NONefun=(x:number,y: number) :void =>{

    let s= x*y;

}