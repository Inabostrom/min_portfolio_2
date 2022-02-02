import { cdnUrl, projectID } from './env.js';
import { handleImage, handleParagraphs } from './utils.js';



function init() {
    const URL = window.location.href;
    const urlString =window.location.search;
    const paramsUrl = new URLSearchParams(urlString);
    const pageValue = paramsUrl.get('page')
    console.log(pageValue)


    const burgerIcon = document.querySelector('.burger-icon');
    const mobileNav = document.querySelector('.mobile-nav');
    burgerIcon.addEventListener('click', () =>  { 
        mobileNav. classList.toggle('mobile-nav-hide');
        burgerIcon.classList.toggle('burger');
        burgerIcon.classList.toggle('closemobilemenu');
    });

    if(pageValue === null) {
        getPosts();
    }else{
        getPost(pageValue);
    }

    getAuthors();
}

async function getPost (pageValue) {
    const project = document.querySelector('.projectside');
    const post = await fetch(`https://${projectID}.api.sanity.io/v1/data/query/production?query=*
    [slug.current == "${pageValue}"]
    `);
    console.log(post);

    const { result } = await post.json();
    // her legger vi inn project variabel ferdig <img> element returnert fra stætte funksjon som håndtere bilder
    project.append(handleImage(result[0].mainImage.asset._ref, 400));
    const title = document.createElement('h1');
    title.innerText = result[0].title;
    project.append(title)
    project.append(handleParagraphs(result[0].body));
}

async function getAuthors() {
    const authors = await fetch(`https://${projectID}.api.sanity.io/v1/data/query/production?query=*
    [_type == "author"]
    `);
    const { result } = await authors.json();

    let contactElement = document.getElementById("contact");
      
    const contactDivElement = document.createElement('div');

    const nameElement = document.createElement('p');
    nameElement.innerText = result[0].name;

    const phoneElement = document.createElement('p');
    phoneElement.innerText = result[0].phone;

    const emailElement = document.createElement('p');
    emailElement.innerText = result[0].email;

    contactDivElement.append(nameElement);
    contactDivElement.append(phoneElement);
    contactDivElement.append(emailElement); 
   
    // const bioElement = document.createElement('div');
    // bioElement.classList.add("bio-text");
    // result[0].shortIntro.forEach(bioValue => {
    //     let pElement = document.createElement("p");
    //     pElement.innerText = bioValue.children[0].text;
    //     bioElement.append(pElement);
    // });

    
    // let aElement = document.createElement("a");
    
    // aElement.setAttribute('href', `./aboutme.html?page=${result[0].slug.current}`);
    // aElement.setAttribute('href', `./om-meg.html?page=${result[0].slug.current}`);
    // aElement.innerText = "Les mer om meg her";
    //bioElement.append(aElement);
    
    contactElement.append(handleImage(result[0].image.asset._ref, 400, "om-meg-img"));
  

    contactElement.append(contactDivElement); 

    // aboutMeElement.append(bioElement);
//FERDIG MED CONTACT
// let linkElement = document.getElementById("link");
//     const linkElement = document.createElement('link');

// const linkElement = document.createElement('link');
    
    let aboutMeElement = document.getElementById("about-me");


    const shortIntroElement = document.createElement('div');
    shortIntroElement.classList.add("bio-text");
    result[0].shortIntro.forEach(bioValue => {
        let pElement = document.createElement("p");
        pElement.innerText = bioValue.children[0].text;
        shortIntroElement.append(pElement);
    });

    aboutMeElement.append(shortIntroElement);

    //const { result } = await authors.json();
    // return console.log('async') shift+cmd+7

    //const projectList = document.querySelector('.projectlist');
}


 let myBioElement = document.getElementById("my-bio");

//  const myBioElement = document.createElement('tekst');
//  myBioElement.classList.add("bio-text2");
// result[0].bio.forEach(bioValue => {
//   let p2Element = document.createElement("p2");
//   p2Element.innerText = bioValue.children[0].text;
//  shortIntroElement.append(p2Element);
// });

// aboutMeElement.append(shortIntroElement);

// contactElement.append(handleImage(result[0].image.asset._ref, 400, "om-meg-img"));


async function getPosts() {
    const posts = await fetch(`https://${projectID}.api.sanity.io/v1/data/query/production?query=*
    [_type == "post"]
    `);
    const { result } = await posts.json();
    // return console.log('async') shift+cmd+7

    const projectList = document.querySelector('.projectlist');

 
result.forEach(post => {
        const projectBlock = document.createElement('a');
        projectBlock.classList.add('project');
        projectBlock.setAttribute('href', `./project.html?page=${post.slug.current}`);


        const projectTitle = document.createElement('h2');
        projectTitle.classList.add('project-title');
        projectTitle.innerText = post.title


        let subtitle =  post.subtitle;
        if(subtitle !== undefined){
            console.log("this is the subtitle : " + subtitle);
        }


        projectBlock.append(projectTitle);
        const projectMask = document.createElement('div');
        projectMask.classList.add('project-mask')
        projectBlock.append(projectMask);

        const projectCover = document.createElement('img');
        
        const cover = post.mainImage.asset._ref.split('-')
        projectCover.setAttribute('src', `${cdnUrl}${cover[1]}-${cover[2]}.${cover[3]}?h=400`);
        projectCover.classList.add('project-cover');
        projectBlock.append(projectCover);
        projectList.append(projectBlock);
        console.log(projectBlock);

    });

    console.log(result);
}
    

init();
