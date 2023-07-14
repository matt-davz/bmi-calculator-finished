//input functionality//
const inputText = document.getElementsByClassName('input');

Array.from(inputText).forEach(element => { 
    element.onfocus = function (){
        emptyInput(this);
    }
    element.oninput = function (){
        textColorChange(this);
        displayMetricInImperial();
        metricBmi();
    }
    element.onblur = function (){
        onBlurEvent(this);
        element.parentElement.style.border = "solid var(--borders)";
    }
    element.onchange = function(){
    }
});

function emptyInput (element) {
    if(parseFloat(element.value) === 0){
        element.value = '';
    } 
}
function onBlurEvent (element){
    if(element.value === ''){
        element.value = 0;
        element.style.color = 'var(--borders)';
    }
}

function textColorChange (element) {
    if(parseFloat(element.value) > 0){
        element.style.color = 'black';
    }
}

//allow input to be clicked from div//

const inputContainer = document.getElementsByClassName('input-container');

Array.from(inputContainer).forEach(element => {
    element.onclick = function(){
        focusInput(this);
        element.style.border = "solid var(--blue)";
    }
})


function focusInput(element) { //allows to click on div to input into input elm
    let inputElement = element.querySelector('input');
    inputElement.focus();
}

//Switching between metric and imperial//

function switchUnits () {
    let metric = document.getElementsByClassName('height-weight-container-m')[0];
    let imperial = document.getElementsByClassName('height-weight-container-i')[0];
    let radioMetric = document.getElementById('metric');
    let radioImperial = document.getElementById('imperial');

    if(radioMetric.checked){
        metric.style.display = 'flex';
        imperial.style.display = 'none';
    } else if (radioImperial.checked) {
        metric.style.display = 'none';
        imperial.style.display = 'flex';
    }
    
}

  const cmInput = document.getElementById('cm-input');
  const kgInput = document.getElementById('kg-input'); 

  const metricBmi = () => {
    const cmInput = document.getElementById('cm-input');
    const kgInput = document.getElementById('kg-input'); 
    const cm = parseFloat(cmInput.value);
    const kg = parseFloat(kgInput.value);
    const result = document.getElementById('results');
    const welcome = document.getElementById('welcome');

    if(cm > 0 && kg > 0){
        result.style.display = 'flex';
        welcome.style.display = 'none';

        let bmiText = document.getElementById('bmi-value')
        bmiText.innerHTML = bmiCalc(cm,kg);
        bmiClass();
    } else if (cm < 0 && kg < 0){
        result.style.display = 'flex';
        welcome.style.display = 'block';
    }
  }

  const bmiCalc = (cm,kg) => {
    let height = cm;
    let meters = height/100;
    let weight = kg;
    let heightsquared = meters*meters;
    let bmi = weight/heightsquared;
    return bmi.toFixed(2);
}



  // Conversions //



const converter = {
    getStLbsFromKg: function(kg) {
      const totalStone = parseFloat(kg) / 6.35;
      const stoneRemainder = totalStone - Math.floor(totalStone);
      const lbs = Math.round(stoneRemainder * 14);
      const stone = Math.floor(Math.floor(totalStone) + parseFloat(stoneRemainder.toFixed(2)));
      return { stone, lbs };
    },
    totalFeet: function(cm) {
        const feet = Math.floor(cm / 30.48);
        const inches = ((cm % 30.48) / 2.54).toFixed(0);
        return { feet, inches };
      },
     getKgFromStLbs: function (stone, lbs) {
        const totalStone = stone + lbs / 14;
        const kg = totalStone * 6.35;
        return kg.toFixed(2);
      },
      getCmFromFtIn: function (feet, inches) {
        const totalInches = feet * 12 + inches;
        const cm = totalInches * 2.54;
        return cm.toFixed(0);
      }
    
  };

// function displayMetricInImperial () {
//     let cmInput = document.getElementById('cm-input').value;
//     let kgInput = document.getElementById('kg-input').value; 
//     let stoneInput = document.getElementById('st-input');
//     let lbsInput = document.getElementById('lbs-input');
//     let feetInput = document.getElementById('ft-input');
//     let inchInput = document.getElementById('in-input');
    
//     if(parseFloat(cmInput) > 0 && parseFloat(kgInput) >0){
//         let feet = document.getElementById('ft-input');
//         let inch = document.getElementById('in-input');
//         feet.value = converter.totalFeet(cmInput).feet;
//         inch.value = converter.totalFeet(cmInput).inches;

//         let stone = document.getElementById('st-input');
//         let lbs = document.getElementById('lbs-input');
//         stone.value = converter.getStLbsFromKg(kgInput).stone;
//         lbs.value = converter.getStLbsFromKg(kgInput).lbs;


//         function changeColor(){
//             inch.style.color = 'black';
//             feet.style.color = 'black';
//             stone.style.color = 'black';
//             lbs.style.color = 'black';
//         }
        
//         changeColor();
//     } else if(parseFloat(cmInput) === 0 && parseFloat(kgInput) === 0){
//         cmInput.value = converter.getCmFromFtIn(parseFloat(feetInput.value), parseFloat(inchInput.value));
//         kgInput.value = converter.getStLbsFromKg(parseFloat(stoneInput.value), parseFloat(lbsInput.value));
//     }

    

    
// }

function displayMetricInImperial () {
    let cmInput = document.getElementById('cm-input');
    let kgInput = document.getElementById('kg-input'); 
    let stoneInput = document.getElementById('st-input');
    let lbsInput = document.getElementById('lbs-input');
    let feetInput = document.getElementById('ft-input');
    let inchInput = document.getElementById('in-input');
    
    if (parseFloat(cmInput.value) > 0 && parseFloat(kgInput.value) > 0) {
      let feet = document.getElementById('ft-input');
      let inch = document.getElementById('in-input');
      feet.value = converter.totalFeet(parseFloat(cmInput.value)).feet;
      inch.value = converter.totalFeet(parseFloat(cmInput.value)).inches;
  
      let stone = document.getElementById('st-input');
      let lbs = document.getElementById('lbs-input');
      stone.value = converter.getStLbsFromKg(parseFloat(kgInput.value)).stone;
      lbs.value = converter.getStLbsFromKg(parseFloat(kgInput.value)).lbs;
  
      function changeColor() {
        inch.style.color = 'black';
        feet.style.color = 'black';
        stone.style.color = 'black';
        lbs.style.color = 'black';
      }
  
      changeColor();
    } else if (parseFloat(feetInput.value) > 0 && parseFloat(stoneInput.value) > 0 && parseFloat(lbsInput.value) > 0 && parseFloat(inchInput.value) > 0) {
      cmInput.value = converter.getCmFromFtIn(parseFloat(feetInput.value), parseFloat(inchInput.value));
      kgInput.value = converter.getKgFromStLbs(parseFloat(stoneInput.value), parseFloat(lbsInput.value));
        
      cmInput.style.color = 'black';
      kgInput.style.color = 'black';
    }
  }



function bmiClass() {
    let bmi = parseFloat(document.getElementById('bmi-value').textContent);
    let healthClass = document.getElementById('health-class');
  
    if (bmi < 18.5) {
      healthClass.textContent = 'underweight.';
    } else if (bmi >= 18.5 && bmi <= 25) {
      healthClass.textContent = 'at a healthy weight.';
    } else if (bmi > 25 && bmi <= 35) {
      healthClass.textContent = 'overweight.';
    } else if (bmi > 35) {
      healthClass.textContent = 'obesed.';
    }
  }
  
  // Call the bmiClass function initially to set the initial health class
  

  
  
  
  
  
  
  
  