import {createElement, createImg}from "./utils.js";
import getData from "./utils.js";
import NavBar from "./navBar/navBar.js"
import MainContent from "../scripts/mainContent/mainContent.js";
import ContentNav from "./contentNavigation/contentNavigation.js";

class HomePage{
    constructor(data) {
        this.contentNav = new ContentNav(data);
        this.contentNav.homePage = this;
        const pendingData = getData();
        this.body = document.querySelector("body");
        this.createNavDOM = this.createNavDOM.bind(this);
        this.selectPlanet = this.selectPlanet.bind(this)
        this.filterData = this.filterData.bind(this)
        this.mainContent = new MainContent()
        this.contentNav = new ContentNav()
        this.navBar = new NavBar()
        pendingData.then(data => {
            console.log(data)
            this.setData(data)
        });

        document.querySelector("body").addEventListener("resize", onScreenChange)
    }

    setData(data){
        this.data = data
        this.navBar.updatePlanet(data)
        this.contentNav.setData(data)
        this.mainContent.setData(data)
        this.render(data)
    }

   async renderFirstPlanet(data){
        let firstPlanet
        data = await this.data
        const dataLength = data.length
        if(dataLength > 1){
            firstPlanet = await this.getFirstPlanet()
            return
        }
    }

    render(data){
        this.body.replaceChildren(this.createNavDOM(data))
        if(data.length > 1){
            console.log(document.querySelector("main"))
           
            this.body.appendChild(this.mainContent.renderInfo(data[0]))
            console.log(document.querySelector("body"))
            console.log(document.querySelector("main"))
            console.log(document.querySelector(".planet__img"))
            document.querySelector(".planet__content-container").insertBefore(this.contentNav.render(), document.querySelector(".planet_img"))
            console.log(document.querySelector(".planet__description").textContent = data[0].overview.content)
            console.log(document.querySelector(".planet__img").src = data[0].images.planet)
            console.log(document.querySelector(".planet__link").setAttribute("href", data[0].overview.source))
            return this.body
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
        console.log(planet.color)
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
        console.log(e.target)
        if(e.target.parentElement === document.querySelector(".planet__names")) return
        this.removeActive()
        console.log(data)
        const planet = this.data.filter(planet => planet.name === data)
        let currentPlanet = planet[0]
        console.log(currentPlanet.color)
        e.target.parentElement.classList.add("active__desktop")

        document.querySelector(".active__desktop").style.borderTopColor = `#${currentPlanet.color}`
        console.log("hello")
    }

    checkScreenSize(){
        console.log(screen.width)
    }
    
    //this contentNav color on new planet click
    changeActiveColor(planet){
        const list = document.querySelectorAll(".nav__list-item")
        list.forEach(item => {
            if(item.style.backgroundColor !== 'transparent'){
                item.style.backgroundColor = `#${planet[0].color}`
                console.log(planet[0].color)
            }
        })
        
    }

    selectPlanet(e){
        console.log(document.querySelector(".content__nav"))
        const planetName = e.target.textContent;
        console.log(planetName) 
        const planet = this.filterData(planetName);
        this.changeActiveColor(planet)
        if(screen.width >= 1440){
            this.setActive(e, planetName)
        }
        //this.contentNav.updateContent()
      
        const currentPlanet = planet[0]
        const name = currentPlanet.name
        document.querySelector(".planet__name").textContent = name;
        document.querySelector(".planet__description").textContent = currentPlanet.overview.content;
        console.log(currentPlanet.overview.source)
        document.querySelector(".planet__link").setAttribute("href", currentPlanet.overview.source)  
        document.querySelector(".planet__img").src = currentPlanet.images.planet
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
window.addEventListener("resize", () => {
    const width  = screen.width
    if(width < 768){
        console.log("ddd") 
    } else {
        console.log("aaa")
    }
})
export default HomePage
export {home}
