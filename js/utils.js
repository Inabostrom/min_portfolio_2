import { cdnUrl } from "./env.js";


export function handleImage(keyImage, customClass = 'basic-image') {
  

    const imageArray = keyImage.split('-');
    const image = document.createElement('img');
    image.classList.add(customClass);
    image.setAttribute('src', `${cdnUrl}${imageArray[1]}-${imageArray[2]}.${imageArray[3]}`);
    return image;
}


export function handleParagraphs(body) {
    const text = document.createElement('article');
    if (body) {
        body.map(p => {
            if(p._type === 'block') {
              const newp = document.createElement('p');
              newp.innerText = p.children[0].text;
              text.append(newp); 
            }
            if(p._type === 'image') {
                text.append(handleImage(p.asset._ref, 'project-image'))
            }
        })
    };
    console.log(text)
    return text;
}