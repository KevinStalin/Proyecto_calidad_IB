function funfuncion_codificacion() {
    let word = 'holamundo';
    a = 2;
    vector = [];
    fc = [];
    clave = 0;
    suma = 0;

    if (a > 1) {
        console.log('Funcion');
        k = word.length;
        for (let x = 0; x < word.length; x++) {
            k -= 1;
            if (k < 0) {
                break;
            }
            if (word[x] != ' ') {
                vector.push(word[x].charCodeAt(0));
                clave = (word[x].charCodeAt(0)) * (Math.pow(a, k));
                fc.push(clave);
                suma += clave;
            } else {
                vector.push(0);
                fc.push(0);
            }
        }
        console.log(word);
        console.log('ACCI', vector);
        console.log('fc', fc);
        console.log('Polinomial', suma);


    } else {
        console.log('a mayor a 2');
    }

}

// let codigo1 = "@".charCodeAt(0);
// console.log(codigo1);
// funfuncion_codificacion();

let codigo = 123456;

function numero(año) {
    var firstTwoDigits = año.toString().substring(2, 4);
    return Number(firstTwoDigits);
}
console.log(numero(198));