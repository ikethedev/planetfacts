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
        console.log(this.data)
        this.activeTab = "overview"; 
        this.currentPlanet = "mercury"
        this.rootElement = contentNavTemplate.content.cloneNode(true);
        this.render = this.render.bind(this);
        this.navBar = new NavBar()
        this.rootElement.querySelectorAll(".nav__list-item").forEach(element => {
            element.addEventListener("click", (e) => {
                const planetData = home.getCurrentPlanet()
                this.setActive(e, planetData)
                console.log(this.getActiveTab())
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
        console.log(e.target.dataset.tab)
        console.log(document.querySelector(".planet__content-container"))
        this.removeActive()
        let width = screen.width
        console.log(width)
        if(width < 768){
            e.target.classList.add("active__section")
            document.querySelector(".active__section").style.borderBottomColor = `#${planet.color}`; 
        } else {
            e.target.classList.add("active__tablet")
            document.querySelector('.active__tablet').style.backgroundColor = `#${planet.color}`
        }

        // Update activeTab property
        this.activeTab = e.target.dataset.tab;
        console.log(this.activeTab)
    }
    
    setData(currentPlanet) {
        this.currentPlanet = currentPlanet;
        // Update the content navigation with the current planet
        console.log("ContentNav updated with:", currentPlanet);
    }

    getData(){
        return this.currentPlanet
      }

    updateSrc(listItem, planet){
        console.log(this.data)
        const currentPlanet = this.getData(); 
        const infoTitle = this.activeTab
        console.log(this.activeTab)
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
        const infoTitle = listItem.toLowerCase().trim()
        console.log(infoTitle)

         let content
        switch(infoTitle) {
            case 'overview':
                content = currentPlanet.overview.content;
                break;
            case 'internal':
                content = currentPlanet.internal.content;
                break;
            case 'sur':
                content = currentPlanet.surface.content;
                break;
            default:
                console.log('Property not found.');
        }
        console.log(content)
        return content
    }

    updateImg(listItem, planet){
        const infoTitle = listItem.toLowerCase().trim()
        const currentPlanet = this.getData(); 

         let img
        switch(infoTitle) {
            case 'overview':
                img = currentPlanet.images.planet;
                break;
            case 'internal':
                img = currentPlanet.images.internal;
                break;
            case 'surface':
                img = currentPlanet.images["surface geology"];
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


