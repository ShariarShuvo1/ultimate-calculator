// Theme Chnager and preserver
function themeChanger(){
    let currentTheme = document.getElementById("currentTheme");
    let themeTitle = currentTheme.title;
    if(themeTitle ==='Light Mode'){
        currentTheme.title="Dark Mode";
        let currentCSS = document.getElementById("mainCSS");
        currentCSS.href = "./styles/style-light.css";
        lastTheme.theme = "Light Mode";
    }
    else{
        currentTheme.title="Light Mode";
        let currentCSS = document.getElementById("mainCSS");
        currentCSS.href = "./styles/style-dark.css";
        lastTheme.theme = "Dark Mode";
    }
    localStorage.setItem('theme',JSON.stringify(lastTheme));
    let currentThemeData = document.getElementById("currentTheme");
    let backgroundColorForNavBar ='';
    if(currentThemeData.title==="Dark Mode"){
        backgroundColorForNavBar = "rgb(219, 219, 219)";
    }
    else{
        backgroundColorForNavBar = "rgb(28, 28, 28)";
    }
    let currentPage = document.getElementById("pageTitle").innerHTML;
    if(currentPage ==="Ultimate Calculator"){
        document.getElementById('ultimateCalculatorPicture').style.backgroundColor= backgroundColorForNavBar;
        document.getElementById('ultimateCalculatorPicture').style.content = 'url(./images/ultimate-calculator-press.png)';
    }
    else{
        document.getElementById('baseConverterPicture').style.backgroundColor= backgroundColorForNavBar;
        document.getElementById('baseConverterPicture').style.content = 'url(./images/base-converter-press.png)';
    }
}

const lastTheme = JSON.parse(localStorage.getItem('theme')) || {
    theme: "Dark Mode"
}
if(lastTheme.theme === "Light Mode"){
    currentTheme.title="Light Mode";
    let currentCSS = document.getElementById("mainCSS");
    currentCSS.href = "./styles/style-light.css";
    lastTheme.theme = "Light Mode";
    let checkToggle = document.getElementById("changeTheme");
    checkToggle.checked=true;
    document.getElementById("currentTheme").title = "Dark Mode";
}
localStorage.setItem('theme',JSON.stringify(lastTheme));
let currentThemeData = document.getElementById("currentTheme");
let backgroundColorForNavBar ='';
if(currentThemeData.title==="Dark Mode"){
    backgroundColorForNavBar = "rgb(219, 219, 219)";
}
else{
    backgroundColorForNavBar = "rgb(28, 28, 28)";
}
let currentPage = document.getElementById("pageTitle").innerHTML;
if(currentPage ==="Ultimate Calculator"){
    document.getElementById('ultimateCalculatorPicture').style.backgroundColor= backgroundColorForNavBar;
    document.getElementById('ultimateCalculatorPicture').style.content = 'url(./images/ultimate-calculator-press.png)';
}
else{
    document.getElementById('baseConverterPicture').style.backgroundColor= backgroundColorForNavBar;
    document.getElementById('baseConverterPicture').style.content = 'url(./images/base-converter-press.png)';
}



// Theme Chnager and preserver