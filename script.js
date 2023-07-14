// get values in metric //
const getValueCm = () =>{
    let cmInput = document.getElementById('cm-input')
    let cm = cmInput.value;
    return cm;
    
}

const getValueKg = () =>{
    let kgInput = document.getElementById('kg-input')
    let kg = kgInput.value;
    return kg;
    
}
// get values imperial //
const getHeight = () => {
    let feetInput = document.getElementById('ft-input');
    let inchInput = document.getElementById('in-input');
    let feet = parseFloat(feetInput.value.trim());
    let inch = parseFloat(inchInput.value.trim());
    let height = (feet*12)+inch;
    return height
}

const getWeight = () => {
    let stInput = document.getElementById('st-input');
    let lbsInput = document.getElementById('lbs-input');
    let st = parseFloat(stInput.value.trim());
    let lbs = parseFloat(lbsInput.value.trim());
    let weight = st*14+lbs;
    return weight;
}

// convert imperial to metric //
const convertToMetricHeight = () => {
    let inches = getHeight();
    let cm = inches*2.54;
    return cm
}

const convertToMetricWeight = () => {
    let lbs = getWeight();
    let kg = lbs/2.205;
    return kg
}


// bmi calculator //
const bmiCalc = (cm,kg) => {
    let height = cm;
    let meters = height/100;
    let weight = kg;
    let heightsquared = meters*meters;
    let bmi = weight/heightsquared;
    return bmi.toFixed(2);
}

// Switching between metric and imperial //


let radioMetric = document.getElementById('metric');
let radioImperial = document.getElementById('imperial');

const radioChecked = () => {
    let metricContainer = document.getElementsByClassName('height-weight-container-m')[0];
    let imperialContainer = document.getElementsByClassName('height-weight-container-i')[0];
    if(radioMetric.checked){
        metricContainer.style.display = 'flex';
        imperialContainer.style.display = 'none';
    } else if (radioImperial.checked){
        metricContainer.style.display = 'none';
        imperialContainer.style.display = 'flex';
    }
}

radioMetric.addEventListener('click',radioChecked);
radioImperial.addEventListener('click',radioChecked);

//changing colors of input text when clicked//

const inputText = document.getElementsByClassName('input');


Array.from(inputText).forEach(element => { 
    element.addEventListener('click', () => {
        element.value = '';
    })

    if(element > 0){
        element.style.color = 'black';
    } else {
        element.style.color = 'var(--borders)';
    }
});



document.body.addEventListener('click', (event) => {
    const target = event.target;
    const isInput = Array.from(inputText).some(element => element.contains(target));
    
    if (!isInput) {
      Array.from(inputText).forEach(element => {
        if(element.value === ''){ //changes value to 0 if empty
            element.value = 0;
           }

        if (element.value === '0') { //changes color of value if zero 
          element.style.color = 'var(--borders)';
        } else {
          element.style.color = 'black';
        }
      });
    }
  });



  const cmInput = document.getElementById('cm-input');
  const kgInput = document.getElementById('kg-input'); 

  const metricBmi = () => {
    const cm = parseFloat(cmInput.value);
    const kg = parseFloat(kgInput.value);
    const result = document.getElementById('results');
    const welcome = document.getElementById('welcome');

    if(cm > 0 && kg > 0){
        result.style.display = 'block';
        welcome.style.display = 'none';

        let bmiText = document.getElementById('bmi-value')
        bmiText.innerHTML = bmiCalc(cm,kg);
    } else {
        result.style.display = 'none';
        welcome.style.display = 'block';
    }
  }

  cmInput.addEventListener('input', metricBmi)
  kgInput.addEventListener('input', metricBmi)


  