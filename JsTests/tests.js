var inputRange = document.getElementById('range');
var span = document.getElementById('rangeOutput');
span.innerText = inputRange.value;
inputRange.addEventListener('change', display);

function display() {
    var value = inputRange.value;
    span.innerText = value;
}