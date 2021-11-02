//Calculation of Area of Cirlce 


//Named Function or Simple Function 
function Calculator(radious) {
    return   Math.PI*(radious*radious)
    
}
console.log(Calculator(2))
let cal = function (radious) {
    return   Math.PI*(radious*radious)
    
}
console.log(cal(4))


let cal1 = function (radious) {
    return   Math.PI*(radious*radious)
    
}(6)
console.log(cal1)