function Clear() {
  document.getElementById('result').value = '';
}

function Solve(val) {
  document.getElementById('result').value += val;
}

function Res() {
  try {
    let expression = document.getElementById('result').value;
    if (expression.trim() === '') return;

    expression = expression
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/log/g, 'Math.log10')
      .replace(/sqrt/g, 'Math.sqrt')
      .replace(/pi/g, 'Math.PI')
      .replace(/e/g, 'Math.E');

    let result = eval(expression);

    if (typeof result === 'number') {
      result = Math.round(result * 1e8) / 1e8;
    }

    document.getElementById('result').value = result;
  } catch (e) {
    document.getElementById('result').value = 'Error';
  }
}

function Back() {
  let ev = document.getElementById('result');
  ev.value = ev.value.slice(0, -1);
}

function per() {
  let expression = document.getElementById('result').value;
  const operators = ['+', '-', '*', '/'];
  let lastOpIndex = -1;

  for (let i = expression.length - 1; i >= 0; i--) {
    if (operators.includes(expression[i])) {
      lastOpIndex = i;
      break;
    }
  }

  if (lastOpIndex === -1) {
    let num = parseFloat(expression);
    if (!isNaN(num)) {
      document.getElementById('result').value = (num / 100).toString();
    }
  } else {
    let left = expression.substring(0, lastOpIndex);
    let operator = expression[lastOpIndex];
    let right = expression.substring(lastOpIndex + 1);

    let leftVal = parseFloat(left);
    let rightVal = parseFloat(right);

    if (!isNaN(leftVal) && !isNaN(rightVal)) {
      let percentage = (leftVal * rightVal) / 100;
      document.getElementById('result').value = left + operator + percentage;
    }
  }
}

function scientific(fn) {
  const display = document.getElementById('result');
  if (['sin', 'cos', 'tan', 'log', 'sqrt'].includes(fn)) {
    display.value += fn + '(';
  } else if (fn === 'pi') {
    display.value += 'pi';
  } else if (fn === 'e') {
    display.value += 'e';
  }
}
