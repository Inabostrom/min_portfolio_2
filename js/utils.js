import { cdnUrl } from "./env.js";


export function handleImage(keyImage,imageHight, customClass = 'basic-image' ) {
  

    const imageArray = keyImage.split('-');
    const image = document.createElement('img');
    image.classList.add(customClass);
    if(imageHight === 0){
        image.setAttribute('src', `${cdnUrl}${imageArray[1]}-${imageArray[2]}.${imageArray[3]}`);
    }else{
        image.setAttribute('src', `${cdnUrl}${imageArray[1]}-${imageArray[2]}.${imageArray[3]}?h=${imageHight}`);
    }
    return image;
}


export function handleParagraphs(body) {
    const text = document.createElement('article');
    if (body) {
        body.map(p => {
            if(p._type === 'block') {
                console.log("type block");

              const newp = document.createElement('p');
              newp.innerText = p.children[0].text;
              text.append(newp); 
            }
            // if (body) {
            //     body.map(h2 => {
            //         if(h2._type === 'block') {
            //           const newp = document.createElement('h2');
            //           newp.innerText = p.children[0].text;
            //           text.append(newp); 
            //         }
            
            if(p._type === 'image') {
                console.log("type image");
                text.append(handleImage(p.asset._ref,0, 'project-image'))
            }
        })
    };
    console.log(text)
    return text;
}