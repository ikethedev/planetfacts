import ContentNav from "./contentNavigation.js";
import HomePage, { home } from "./main.js";
import getData, { createElement, createImg, createLink } from "./utils.js";

class MainContent {
  constructor(data) {
        this.contentNav = new ContentNav(data)
        this.data = null;
        this.container = document.querySelector(".main-content")
        this.renderInfo = this.renderInfo.bind(this);
        this.createPlanetStats = this.createPlanetStats.bind(this);
        this.createPlanetContent = this.createPlanetContent.bind(this);
        this.createPlanetImg = this.createPlanetImg.bind(this);
  }

  setData(data){
    this.data = data 
  }
 
  createPlanetStats(data) {
    const currentPlanet = data; 
    const planetStats = createElement("div", null, "stats", null)
    const rotationDiv = createElement("div", null, "stat__div", null)
    const rotationTitle = createElement("h4", null, "planet__stat-title", "Rotation Time")
    const rotationTime = createElement("h3", null, "planet__stat rotation", currentPlanet.rotation)
    const revolutionDiv = createElement("div", null, "stat__div", null)
    const revolutionTitle = createElement("h4", null, "planet__stat-title", "Revolution Time")
    const revolutionTime = createElement("h3", null, "planet__stat revolution", currentPlanet.revolution)
    const radiusDiv = createElement("div", null, "stat__div", null)
    const radiusTitle = createElement("h4", null, "planet__stat-title", "Radius Size")
    const radiusSize = createElement("h3", null, "planet__stat radius", currentPlanet.radius)
    const temperatureDiv = createElement("div", null, "stat__div", null)
    const averageTemp = createElement("h4", null, "planet__stat-title", "Average Temp")
    const temperature = createElement("h3", null, "planet__stat temperature", currentPlanet.temperature)

    rotationDiv.appendChild(rotationTitle)
    rotationDiv.appendChild(rotationTime)

    revolutionDiv.appendChild(revolutionTitle)
    revolutionDiv.appendChild(revolutionTime)

    radiusDiv.appendChild(radiusTitle)
    radiusDiv.appendChild(radiusSize)

    temperatureDiv.appendChild(averageTemp)
    temperatureDiv.appendChild(temperature)

    planetStats.appendChild(rotationDiv)
    planetStats.appendChild(revolutionDiv)
    planetStats.appendChild(radiusDiv)
    planetStats.appendChild(temperatureDiv)

    return planetStats
  }

  async createStartingImg(img, content) {
        const planetImg = createImg(currentPlanent[0].images.planet, `This is an image of ${currentPlanent.name}`)
        return planetImg
  }


  createPlanetImg(data, img) {
    const currentPlanet = data
    const planetImg = createImg(img, `This is a picture of the ${currentPlanet.name}`)
    planetImg.classList.add("planet__img")
    return planetImg
  }

  createPlanetContent(data, content) {
    const currentPlanet = data;
    const planet = createElement("div", null, "planet", null);
    const planetContentDiv = createElement("div", null, "planet__header", null);
    const planetHeader = createElement("h2", null, "planet__name", currentPlanet.name);
    const planetDescription = createElement("p", null, "planet__description", content);
    const sourceContainer = createElement("div", "", "source__container")
    const sourceLink = createLink(currentPlanet, "Source: Wikipedia", null, null, "planet__link");
    const sourceImg = createImg("../assets/icon-source.svg" )
    sourceContainer.appendChild(sourceLink)
    sourceContainer.appendChild(sourceImg)

    planet.appendChild(planetHeader);
    planet.appendChild(planetDescription);
    planet.appendChild(sourceContainer);
    // planet.appendChild(planetContentDiv)
    return planet;
  }

  renderInfo(data, content, img) {
  
    //     // 1. Create planet content
        const planetContent = this.createPlanetContent(data, content); 
    //     // 2. Create planet stats
        const planetStats = this.createPlanetStats(data); 
    //     // 3. Create planet image
        const planetImg = this.createPlanetImg(data, img);
        const main = createElement("main") 
        const planet = createElement('div', null, "planet__content-container");
        planet.appendChild(planetImg); 
        planet.appendChild(planetContent);
        
        const stats = createElement("div")
        stats.appendChild(planetStats);
        main.appendChild(planet)
        main.appendChild(stats)
        console.log(main)
        return main
  }

}

export default MainContent;
