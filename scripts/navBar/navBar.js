import getData from "../utils.js";
import ContentNav from "../contentNavigation/contentNavigation.js";
import MainContent from "../mainContent/mainContent.js";

const createElement = (tagName, id, className, content) => {
    const element = document.createElement(tagName);
    if(id) element.id = id;
    if(className) element.classList.add = className;
    if(content) element.textContent = content;
    return element;
}

export default class NavBar{
    constructor(homePage) {
        this.homePage = homePage; // Store the HomePage instance
        this.createNav = this.createNav.bind(this);
        //this.selectPlanet = this.selectPlanet.bind(this);
       // this.filterData = this.filterData.bind(this);
       
    }

    render(){
        return this.createNav()
    }


    updatePlanet(data){
        console.log(data)
    }
   
    async createNav(){
        const names = await getData()
        const navMenu = document.createElement("nav")
        const siteTitle = createElement("h1", null, 'logo', "THE PLANETS")
        const ul = document.createElement('ul');
        console.log(ul)
        names.forEach(planet => {
          const li = createElement("li", "", "", planet.name)
          li.addEventListener("click", this.selectPlanet)
          ul.appendChild(li)
        });        
        navMenu.appendChild(siteTitle)
        navMenu.appendChild(ul)
        return navMenu
    }
  
}

