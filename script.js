const dark_light_mode_btn = document.querySelector("#dark-light-mode");
const css = document.querySelector("link[href='style.css']");
// set language:
const storedLanguage = localStorage.getItem('language');
// const storedLanguage = localStorage.getItem('language');

// if (window.location.pathname === "/index.html" && storedLanguage === "de") {
//   window.location.href = "index-de.html";
// }  if (window.location.pathname === "/index-de.html" && storedLanguage === "eng") {
//   alert("sdfsdfdsfjds");
//   window.location.href = "index.html";
// }
// if(storedLanguage === ""){
//   localStorage.getItem('language','eng');
// }
// if (storedLanguage === "eng") {
//   window.location.href = 'index.html';
// }

// Set the initial mode based on the stored preference
const storedMode = localStorage.getItem("mode");
if (storedMode === "Dark") {
  setDarkMode();
} else {
  setLightMode();
}


function setDarkMode() {
  // Change the CSS file to the dark mode stylesheet
  css.setAttribute("href", "style.css");
  if(storedLanguage==="de")
  {
    dark_light_mode_btn.innerHTML = "Hellmodus";
  }
  else
  {
    dark_light_mode_btn.innerHTML = "Light mode";
  }
  

  
  dark_light_mode_btn.setAttribute("onclick", "setLightMode()");

  // Store the user's preference in localStorage
  localStorage.setItem("mode", "Dark");
}

function setLightMode() {
  // Change the CSS file to the light mode stylesheet
  css.setAttribute("href", "style-light.css");

  if(storedLanguage==="de")
  {
    // if(window.location.pathname==="/index.html")
    // {
    //   window.location.href = 'index-de.html';
    // }
    dark_light_mode_btn.innerHTML = "Dunkelmodus";
  }
  else
  {
    // if(window.location.pathname==="/index-de.html")
    // {
    //   window.location.href = 'index.html';
    // }
    dark_light_mode_btn.innerHTML = "Dark mode";
  }
  // dark_light_mode_btn.innerHTML = "Dark mode";
  dark_light_mode_btn.setAttribute("onclick", "setDarkMode()");

  // Store the user's preference in localStorage
  localStorage.setItem("mode", "Light");
}
// ================================================================
// languages:

const languageSelect = document.getElementById('language-select');
const englishOption = languageSelect.querySelector('option[value="en"]');
const germanOption = languageSelect.querySelector('option[value="de"]');

languageSelect.addEventListener('change', function() {
  const selectedValue = this.value;

  if (selectedValue === 'de') {
    // englishOption.removeAttribute('disabled');
    // germanOption.setAttribute('disabled', 'disabled');
    // store selected language in localStorage
    localStorage.setItem('language', selectedValue);
    window.location.href = 'index-de.html';
  } else {
    // englishOption.setAttribute('disabled', 'disabled');
    // germanOption.removeAttribute('disabled');
    // store selected language in localStorage
    localStorage.setItem('language', selectedValue);
    window.location.href = 'index.html';
  }
});
// ================================================================
const ageInput = document.getElementById("age");
const tallInput = document.getElementById("tall");
const weightInput = document.getElementById("weight");
const calculate_btn=document.getElementById("calculate_btn");
const gender=document.getElementById("gender");
const activities_input=document.getElementById("activity");
const results=document.getElementById("text_result");
// Add event listeners to the input fields
ageInput.addEventListener("input", validateAge);
tallInput.addEventListener("input", validateTall);
weightInput.addEventListener("input", validateWeight);


// Validation functions
function validateAge() 
{
    const age = ageInput.value;
    if (isNaN(age) || age < 1 || age > 150) {
    //   calculate_btn.disabled=true;   
      ageInput.style.borderColor="var(--danger-color)";
    } else {
      ageInput.style.border="";
      calculate_btn.disabled=false;  
    }
}


function validateTall() {
    const tall = tallInput.value;
    if (isNaN(tall) || tall < 0 || tall > 300) {
      tallInput.style.borderColor="var(--danger-color)";
    } else {
      tallInput.style.borderColor="";
    }
  }


  function validateWeight() {
    const weight = weightInput.value;
    if (isNaN(weight) || weight < 0 || weight > 500) {
      weightInput.style.borderColor="var(--danger-color)";
    } else {
      weightInput.style.borderColor="";
    }
  }



//   calculator code
  calculate_btn.addEventListener("click",function(){
    // checking inputs 
    const age = ageInput.value;
    const tall = tallInput.value;
    const weight = weightInput.value;
    const activity=activities_input.value;
    let bmr;
    if(gender.value==="gender" || activity==="Activity" || tall==="" || age==="" || weight==="")
    {
      //checking languages :
      if(storedLanguage==="de"){
        typingEffect(`Alle Felder sind erforderlich!`);
      }else{
        typingEffect(`All fields are required !`);
      }
        
        results.style.color="var(--danger-color)";
        // calculate_btn.disabled=true;
    }
    else{
        if(isNaN(age) || age < 1 || age > 150){  
          if(storedLanguage==="de"){
            typingEffect(`Bitte geben Sie ein gültiges Alter ein (1-150 Jahre alt).`);
          }else{
            typingEffect(`Please enter a valid Age (1-150 Years old).`);
          }         
            
            results.style.color="var(--danger-color)";
        }
        else{
            if (isNaN(tall) || tall < 0 || tall > 300 )
            {
              if(storedLanguage==="de"){
                typingEffect(`Bitte geben Sie eine gültige Größe in Zentimetern ein (1-500).`);
              }else{
                typingEffect(`Please enter a valid Tall in Cm (1-500).`);
              }
                
                results.style.color="var(--danger-color)";
            }
            else{
                if (isNaN(weight) || weight < 0 || weight > 500){
                  if(storedLanguage==="de"){
                    typingEffect(`Bitte geben Sie ein gültiges Gewicht in kg ein (1-500).`);
                  }else{
                    typingEffect(`Please enter a valid Weight in Kg (1-500).`);
                  }
                    
                    results.style.color="var(--danger-color)";
                }
                else
                {
                    // bmr calculating for men 
                    if(gender.value==="men"){
                        bmr=88.36 + (13.4 * weight) + (4.8 * tall ) - (5.7 * age);
                        
                    }
                    // bmr calculating for women 
                    else{
                        bmr=447.6 + (9.2 * weight) + (3.1 * tall ) - (4.3 * age);
                        
                    }


                    // calories calculating:
                    let finalResult;
                    if(activity==="sedentary"){
                      finalResult=bmr*1.2;
                      // results.innerHTML="You need "+finalResult.toFixed(2)+" Calories per day ";
                      if(storedLanguage==="de"){
                        typingEffect(`Sie benötigen ${finalResult.toFixed(2)} Kalorien pro Tag.`);
                      }else{
                        typingEffect(`You need ${finalResult.toFixed(2)} Calories per day .`);
                        // , and your BMR is : ${bmr.toFixed(2)} 
                        
                        
                      }
                      
                      results.style.color="var(--light-blue)";
                    }
                    else if(activity==="lightly-active"){
                      finalResult=bmr*1.375;
                      if(storedLanguage==="de"){
                        typingEffect(`Sie benötigen ${finalResult.toFixed(2)} Kalorien pro Tag.`);
                      }else{
                        typingEffect(`You need ${finalResult.toFixed(2)} Calories per day.`);
                      }
                      
                      results.style.color="var(--light-blue)";
                    }

                    else if(activity==="moderately"){
                      finalResult=bmr*1.55;
                      if(storedLanguage==="de"){
                        typingEffect(`Sie benötigen ${finalResult.toFixed(2)} Kalorien pro Tag.`);
                      }else{
                        typingEffect(`You need ${finalResult.toFixed(2)} Calories per day.`);
                      }
                      
                      results.style.color="var(--light-blue)";
                    }

                    else if(activity==="very-active"){
                      finalResult=bmr*1.725;
                      if(storedLanguage==="de"){
                        typingEffect(`Sie benötigen ${finalResult.toFixed(2)} Kalorien pro Tag.`);
                      }else{
                        typingEffect(`You need ${finalResult.toFixed(2)} Calories per day.`);
                      }
                      
                      results.style.color="var(--light-blue)";  
                    }

                    else{

                      finalResult=bmr*1.9;
                      if(storedLanguage==="de"){
                        typingEffect(`Sie benötigen ${finalResult.toFixed(2)} Kalorien pro Tag.`);
                      }else{
                        typingEffect(`You need ${finalResult.toFixed(2)} Calories per day.`);
                      }
                      
                      results.style.color="var(--light-blue)";
                      
                    }
                    
                }
            }
        }
        
    }
});
function typingEffect(text) {
  var i = 0;
  results.innerHTML = "";
  function typing() {
    if (i < text.length) {
      results.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 20);
    }
  }
  typing();
}





// 0000000000000000000000000000000000000000000000000000000
// const ageInput = document.getElementById("age");
// const tallInput = document.getElementById("tall");
// const weightInput = document.getElementById("weight");
// const calculate_btn = document.getElementById("calculate_btn");
// const gender = document.getElementById("gender");
// const activities_input = document.getElementById("activity");
// const results = document.getElementById("text_result");

// // Add event listeners to the input fields
// ageInput.addEventListener("input", validateAge);
// tallInput.addEventListener("input", validateTall);
// weightInput.addEventListener("input", validateWeight);

// // Validation functions
// function validateAge() {
//   const age = ageInput.value;
//   if (isNaN(age) || age < 1 || age > 150) {
//     ageInput.style.borderColor = "var(--danger-color)";
//   } else {
//     ageInput.style.border = "";
//   }
// }

// function validateTall() {
//   const tall = tallInput.value;
//   if (isNaN(tall) || tall < 0 || tall > 300) {
//     tallInput.style.borderColor = "var(--danger-color)";
//   } else {
//     tallInput.style.borderColor = "";
//   }
// }

// function validateWeight() {
//   const weight = weightInput.value;
//   if (isNaN(weight) || weight < 0 || weight > 500) {
//     weightInput.style.borderColor = "var(--danger-color)";
//   } else {
//     weightInput.style.borderColor = "";
//   }
// }

// // calculator code
// calculate_btn.addEventListener("click", function () {
//   // checking inputs
//   const age = ageInput.value;
//   const tall = tallInput.value;
//   const weight = weightInput.value;
//   const activity = activities_input.value;
//   let bmr;
//   if (
//     gender.value === "gender" ||
//     activity === "Activity" ||
//     tall === "" ||
//     age === "" ||
//     weight === ""
//   ) {
//     results.innerHTML = "All fields are required ";
//     results.style.color = "var(--danger-color)";
//   } else {
//     if (isNaN(age) || age < 1 || age > 150) {
//       showTypingResult("Please enter a valid Age (1-150 Years old)", "var(--danger-color)");
//     } else {
//       if (isNaN(tall) || tall < 0 || tall > 300) {
//         showTypingResult("Please enter a valid Tall in Cm (1-300)", "var(--danger-color)");
//       } else {
//         if (isNaN(weight) || weight < 0 || weight > 500) {
//           showTypingResult("Please enter a valid Weight in Kg (1-500)", "var(--danger-color)");
//         } else {
//           // bmr calculating for men
//           if (gender.value === "men") {
//             bmr = 88.36 + 13.4 * weight + 4.8 * tall - 5.7 * age;
//           }
//           // bmr calculating for women
//           else {
//             bmr = 447.6 + 9.2 * weight + 3.1 * tall - 4.3 * age;
//           }

//           // calories calculating:
//           let finalResult;
//           if (activity === "sedentary") {
//             finalResult = bmr * 1.2;
//             showTypingResult(`You need ${finalResult.toFixed(2)} Calories per day `, "var(--light-blue)");
//           } else if (activity === "lightly-active") {
//             finalResult = bmr * 1.375;
//             showTypingResult(`You need ${finalResult.toFixed(2)} Calories per day `, "var(--light-blue)");
//           } else if (activity === "moderately") {
//             final
