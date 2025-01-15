import NavBar from "../navBar/navBar.js";

const contentNavTemplate = document.createElement("template");
contentNavTemplate.innerHTML = `
    <nav class="content__nav">
        <ul class="nav">
            <li class="nav__list-item"><span class="content__number">01</span>Overview</li>
            <li class="nav__list-item"><span class="content__number">02</span>Structure </li>
            <li class="nav__list-item"><span class="content__number">03</span>Geology </li>
        </ul>
    </nav>
`
class ContentNav{
    constructor(data, homePage) {
        this.data = data;
        this.rootElement = contentNavTemplate.content.cloneNode(true);
        this.render = this.render.bind(this);
        this.navBar = new NavBar()
        this.rootElement.querySelectorAll(".nav__list-item").forEach(element => {
            element.addEventListener("click", (e) => {
                // grabs the textContent of the contentNav
  
                const listItem = e.target.textContent
                
                // grabs the name of the current planet data
                const planetName = document.querySelector(".planet__name").textContent
                // using the planet name to return the data for the specific planet
                const planetData = this.data.filter(data => data.name === planetName)  

                this.setActive(e, planetData)
                this.navBar.updatePlanet(planetData)
                document.querySelectorAll(".nav__list-item").forEach(item => {
                   if(item.style.backgroundColor !== "transparent"){
                    item.style.backgroundColor = `#${planetData[0].color}`
                   }
                })
                // updates the DOM based on click
                document.querySelector(".planet__description").textContent =  this.updateContent(listItem, planetData)
                document.querySelector(".planet__link").setAttribute("href", this.updateSrc(listItem, planetData))  
                document.querySelector(".planet__img").src = this.updateImg(listItem, planetData)
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
        let width = screen.width
        console.log(width)
        if(width < 768){
            e.target.classList.add("active__section")
            document.querySelector(".active__section").style.borderBottomColor = `#${planet[0].color}`; 
        } else {
            e.target.classList.add("active__tablet")
            document.querySelector('.active__tablet').style.backgroundColor = `#${planet[0].color}`
        }
    }
    
    setData(data){
        this.data = data
        return this.data
    }

    updateSrc(listItem, planet){
        console.log(planet[0])
        const infoTitle = listItem.toLowerCase().trim()
        let src
        switch(infoTitle) {
            case '01overview':
                src = planet[0].overview.source;
                break;
            case '02internal':
                src = planet[0].internal.source;
                break;
            case '03surface':
                src = planet[0].surface.source;
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
            case '01overview':
                content = planet[0].overview.content;
                break;
            case '02structure':
                content = planet[0].internal.content;
                break;
            case '03geology':
                content = planet[0].surface.content;
                break;
            default:
                console.log('Property not found.');
        }
        console.log(content)
        return content
    }

    updateImg(listItem, planet){
        const infoTitle = listItem.toLowerCase().trim()
         let img
        switch(infoTitle) {
            case '01overview':
                img = planet[0].images.planet;
                break;
            case '02structure':
                img = planet[0].images.internal;
                break;
            case '03geology':
                img = planet[0].images["surface geology"];
                break;
            default:
                console.log('Property not found.');
        }
        return img
    }

    render(){
        return this.rootElement
    }
}

export default ContentNav;


