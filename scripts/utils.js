const getData = async () => {
    const res = await fetch("../data.json");
    const data = await res.json();
    return data
}

const createElement = (element, idName, className, content) => {
    const el = document.createElement(element)
    if(idName) el.id = idName
    if(className) el.className = className
    if(content) el.textContent = content
    return el
}

const createImg = (src, alt) => {
    const img = document.createElement("img")
    if(src) img.src = src
    if(alt) img.alt = alt
    return img
}

const createLink = (href, text, target, idName, className) => {
    const link = document.createElement('a');
    if (href) link.href = href;             
    if (text) link.textContent = text;         
    if (target) link.target = target;
    if (className) link.className = className;
    if (idName) link.id = idName;
    return link;
};

const onScreenChange = () => {
    console.log("hello")
}
export {createImg, createElement, createLink, onScreenChange}
export default getData

