function outerFunction() {
    let counter = 0;

    function innerFunction() {
        counter++;
        console.log(counter);
    }

    return innerFunction;
}
const myClosure = outerFunction();
myClosure(); // Logs: 1
myClosure(); // Logs: 2
myClosure(); // Logs: 3
myClosure(); // Logs: 4
myClosure(); // Logs: 5