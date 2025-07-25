import {createElement, createImg}from "./utils.js";
import getData from "./utils.js";
import NavBar from "./navBar/navBar.js"
import MainContent from "./mainContent/mainContent.js";
import ContentNav from "./contentNavigation/contentNavigation.js";

class HomePage{
    constructor(data) {
        
        this.contentNav = new ContentNav(data);
        this.contentNav.homePage = this;
        this.currentPlanet = null;
        const pendingData = getData();
        this.body = document.querySelector("body");
        this.createNavDOM = this.createNavDOM.bind(this);
        this.selectPlanet = this.selectPlanet.bind(this)
        this.setCurrentPlanet = this.setCurrentPlanet.bind(this)
        this.filterData = this.filterData.bind(this)
        this.mainContent = new MainContent()
        this.contentNav = new ContentNav()
        this.navBar = new NavBar()
        pendingData.then(data => {
            // init the page on load
            this.setData(data)
        });  
    }

    setData(data){
        this.data = data
        if (!this.currentPlanet) {
            this.setCurrentPlanet(data[0]);
        }

        this.navBar.updatePlanet(data)
        this.contentNav.setData(data)
        this.mainContent.setData(data)
        this.render(data)
    }

    setCurrentPlanet(planet){
        this.currentPlanet = planet
    }

    getCurrentPlanet(){
       const data = this.currentPlanet
       const currentPlanent = data;
       return this.currentPlanet
    }

    render(data){
        this.body.replaceChildren(this.createNavDOM(data))
        if(data.length > 1){           
            this.body.appendChild(this.mainContent.renderInfo(data[0]))
            document.querySelector(".planet__content-container").insertBefore(this.contentNav.render(), document.querySelector(".planet_img"))
            document.querySelector(".planet__description").textContent = data[0].overview.content
            document.querySelector(".planet__img").src = data[0].images.planet
            document.querySelector(".planet__link").setAttribute("href", data[0].overview.source)
            document.querySelector(".nav__list-item").classList.add("active__section")
        }
        return this.body
    }

  createNavDOM(data){
    const names = data
    const navMenu = createElement("nav", "main__nav")
    const siteTitle = createElement("h1", null, 'logo', "THE PLANETS")
    const mobileMenu = createImg("../assets/icon-hamburger.svg", "Mobile hamburger menu")
    mobileMenu.addEventListener("click", this.openMenu)
    mobileMenu.classList.add("mobile__menu-icon")
    const ul = createElement('ul', "", "planet__names hide");
    names.forEach(planet => {
        const div = createElement("div", "", "li__div")
        const li = createElement("li", "", "", planet.name)
        const bullet = createElement("div", "", "nav__bullet")
        bullet.style.backgroundColor = `#${planet.color}`
        const img = createImg("../assets/icon-chevron.svg")
        img.classList.add("img__arrow")
        div.appendChild(bullet)
        div.appendChild(li)
        div.appendChild(img)
        li.parentElement.addEventListener("click", this.selectPlanet)
        ul.appendChild(div)
    });        
    navMenu.appendChild(siteTitle)
    navMenu.appendChild(mobileMenu)
    navMenu.appendChild(ul)
    return navMenu
    }

    openMenu(){
        document.querySelector(".planet__names").classList.toggle("hide");
        document.querySelector(".planet__names").style.color = "white";
        document.querySelector(".mobile__menu-icon").classList.toggle("active__menu");
    }

    closeMenu(){
        document.querySelector(".planet__names").classList.toggle("hide");
        document.querySelector(".mobile__menu-icon").classList.toggle("active__menu");
    }
    
    removeActive(){
        document.querySelectorAll(".li__div").forEach(item => item.classList.remove("active__desktop"))
    }

    setActive(e, data){
        console.log(document.querySelector(".planet__content-container")) 
        if(e.target.parentElement === document.querySelector(".planet__names")) return
        this.removeActive()
    }
    
    selectPlanet(e){
        const planetName = e.target.textContent;
        const planet = this.filterData(planetName);
        const currentPlanet = planet[0];
        const activeTab = this.contentNav.getActiveTab();

        console.log(currentPlanet.images)
        console.log(activeTab)
        this.setCurrentPlanet(planet)
        console.log(currentPlanet.images[activeTab])
        //this.contentNav.updateContent()
        this.navBar.updatePlanet(currentPlanet);
        this.contentNav.setData(currentPlanet);
        this.mainContent.setData(currentPlanet);
       
        document.querySelector(".planet__name").textContent = currentPlanet.name;
        document.querySelector(".planet__description").textContent = currentPlanet[activeTab].content;
        document.querySelector(".planet__link").setAttribute("href", currentPlanet[activeTab].source)  
        // only for the first render
        document.querySelector(".planet__img").src = currentPlanet.images["planet"]
        document.querySelector(".rotation").textContent = currentPlanet.rotation
        document.querySelector(".revolution").textContent = currentPlanet.revolution
        document.querySelector(".radius").textContent = currentPlanet.radius
        document.querySelector(".temperature").textContent = currentPlanet.temperature
    }


   filterData(planetName){
        const currentPlanet = this.data.filter(planet => planet.name === planetName);
        this.closeMenu()
        return currentPlanet
    }
}


const home = new HomePage()

export default HomePage
export {home}
