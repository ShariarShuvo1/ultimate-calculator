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
let textColorDuringHover ='';
if(currentThemeData.title==="Dark Mode"){
    backgroundColorForNavBar = "rgb(219, 219, 219)";
    textColorDuringHover = 'black'
}
else{
    backgroundColorForNavBar = "rgb(36, 36, 36)";
    textColorDuringHover = 'white'
}
let currentPage = document.getElementById("pageTitle").innerHTML;
if(currentPage ==="Ultimate Calculator"){
    document.getElementById('ultimateCalculatorPage').style.backgroundColor= backgroundColorForNavBar;
    document.getElementById('ultimateCalculatorPage').style.color=textColorDuringHover;
    document.getElementById('ultimateCalculatorPage').style.marginTop ='20px';
}
else{
    document.getElementById('baseConverterPage').style.backgroundColor= backgroundColorForNavBar;
    document.getElementById('baseConverterPage').style.color=textColorDuringHover;
    document.getElementById('baseConverterPage').style.marginTop ='20px';
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
let textColorDuringHover ='';
if(currentThemeData.title==="Dark Mode"){
    backgroundColorForNavBar = "rgb(219, 219, 219)";
    textColorDuringHover = 'black'
}
else{
    backgroundColorForNavBar = "rgb(36, 36, 36)";
    textColorDuringHover = 'white'
}
let currentPage = document.getElementById("pageTitle").innerHTML;
if(currentPage ==="Ultimate Calculator"){
    document.getElementById('ultimateCalculatorPage').style.backgroundColor= backgroundColorForNavBar;
    document.getElementById('ultimateCalculatorPage').style.color=textColorDuringHover;
    document.getElementById('ultimateCalculatorPage').style.marginTop ='20px';
}
else{
    document.getElementById('baseConverterPage').style.backgroundColor= backgroundColorForNavBar;
    document.getElementById('baseConverterPage').style.color=textColorDuringHover;
    document.getElementById('baseConverterPage').style.marginTop ='20px';
}



// Theme Chnager and preserver