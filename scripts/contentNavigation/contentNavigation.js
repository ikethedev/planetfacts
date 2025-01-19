import HomePage, { home } from "../main.js";
import NavBar from "../navBar/navBar.js";

const contentNavTemplate = document.createElement("template");
contentNavTemplate.innerHTML = `
    <nav class="content__nav">
        <ul class="nav">
            <li class="nav__list-item" data-tab="overview"><span class="content__number">01</span>Overview</li>
            <li class="nav__list-item" data-tab="internal"><span class="content__number">02</span>Structure </li>
            <li class="nav__list-item" data-tab="surface"><span class="content__number">03</span>Geology </li>
        </ul>
    </nav>
`
class ContentNav{
    constructor(data, homePage) {
        this.data = data;
        this.activeTab = "overview"; 
        this.currentPlanet = "mercury"
        this.rootElement = contentNavTemplate.content.cloneNode(true);
        this.render = this.render.bind(this);
        this.navBar = new NavBar()
        this.rootElement.querySelectorAll(".nav__list-item").forEach(element => {
            element.addEventListener("click", (e) => {
                const planetData = home.getCurrentPlanet()
                this.setActive(e, planetData)
                // grabs the textContent of the contentNav
                const listItem = this.getActiveTab()
                this.updateTabContent(listItem, planetData); // Update content based on the tab

                
                // grabs the name of the current planet data
                // using the planet name to return the data for the specific planet

                // this.setActive(e, planetData)
                // this.navBar.updatePlanet(planetData)
                // document.querySelectorAll(".nav__list-item").forEach(item => {
                //    if(item.style.backgroundColor !== "transparent"){
                //     item.style.backgroundColor = `#${planetData[0].color}`
                //    }
                // })
                // updates the DOM based on click
                this.updateTabContent(listItem, planetData);
            });
        });    
    }

    removeActive(){
        const nav = [...document.querySelector(".nav").children]
        let width = screen.width
        nav.forEach(item => {
            if(width < 768){
                item.classList.remove("active__section")
                item.style.backgroundColor = "transparent"
            } else {
                item.classList.remove("active__tablet")
                item.style.backgroundColor = 'transparent'
                item.style.borderBottomColor = "transparent"
            }
        })
    }

    setActive(e, planet){        
        this.removeActive()
        this.activeTab = e.target.dataset.tab;
    }
    
    setData(currentPlanet) {
        this.currentPlanet = currentPlanet;
    }

    getData(){
        return this.currentPlanet
      }

    updateSrc(listItem, planet){
        const data =  home.getCurrentPlanet()
        let currentPlanet = data[0];
        const infoTitle = this.activeTab
        if(currentPlanet === undefined){
            currentPlanet = home.getCurrentPlanet()
        }
        let src
        switch(infoTitle) {
            case 'overview':
                src = currentPlanet.overview.source;
                break;
            case 'internal':
                src = currentPlanet.internal.source;
                break;
            case 'surface':
                src = currentPlanet.surface.source;
                break;
            default:
                console.log('Property not found.');
        }
       return src
      
    }

    updateContent(listItem, planet){
        const infoTitle = this.activeTab
        console.log(infoTitle)
        let data =  home.getCurrentPlanet()
        let currentPlanet = data[0];
        if(currentPlanet === undefined){
            currentPlanet = home.getCurrentPlanet()
        }
        console.log(currentPlanet)
         let content
        switch(infoTitle) {
            case 'overview':
                content = currentPlanet.overview.content;
                break;
            case 'internal':
                content = currentPlanet.internal.content;
                break;
            case 'surface':
                content = currentPlanet.surface.content;
                break;
            default:
                console.log('Property not found.');
        }
        return content
    }

    updateImg(listItem, planet){
        const infoTitle = this.activeTab
        const data =  home.getCurrentPlanet()
        let currentPlanet = data[0];
        if(currentPlanet === undefined){
            currentPlanet = home.getCurrentPlanet()
        }
         let img
         
        switch(infoTitle) {
            case 'overview':
                console.log(currentPlanet.images.planet)
                img = currentPlanet.images.planet;
                break;
            case 'internal':
                img = currentPlanet.images.internal;
                break;
            case 'surface':
                img = currentPlanet.images.surface;
                break;
            default:
                console.log('Property not found.');
        }
        return img
    }

    updateTabContent(listItem, planetData){
        document.querySelector(".planet__description").textContent =  this.updateContent(listItem, planetData)
        //document.querySelector(".planet__link").setAttribute("href", this.updateSrc(listItem, planetData))  
        document.querySelector(".planet__img").src = this.updateImg(listItem, planetData)
    }

    getActiveTab() {
        return this.activeTab;
    }

    setActiveTab(tab) {
        this.activeTab = tab;
    }


    render(){
        return this.rootElement
    }
}

export default ContentNav;


