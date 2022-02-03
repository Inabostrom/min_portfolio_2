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
    // her legger vi inn project variabel ferdig <img> element returnert fra støtte funksjon som håndtere bilder
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


    // legger til kontakt på index.html
    let contactElement = document.getElementById("contact");
    if(contactElement !== null){
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
        contactElement.append(handleImage(result[0].image.asset._ref, 400, "om-meg-img"));
      
    
        contactElement.append(contactDivElement); 

        // legger til tekst om meg på index.html
        let aboutMeElement = document.getElementById("about-me");


        const shortIntroElement = document.createElement('div');
        shortIntroElement.classList.add("bio-text");
        result[0].shortIntro.forEach(bioValue => {
            let pElement = document.createElement("p");
            pElement.innerText = bioValue.children[0].text;
            shortIntroElement.append(pElement);
        });
    
        aboutMeElement.append(shortIntroElement);
    }  

//FERDIG MED CONTACT

 // legger til tekst på aboutme.html
    const myBioElement = document.getElementById("my-bio");
    if(myBioElement !== null){
    myBioElement.classList.add("bio-text2");
    result[0].bio.forEach(bioValue => {
        let p2Element = document.createElement("p");
        p2Element.innerText = bioValue.children[0].text;
          myBioElement.append(p2Element);
      });
    }

    
    
}







async function getPosts() {
    const posts = await fetch(`https://${projectID}.api.sanity.io/v1/data/query/production?query=*
    [_type == "post"]
    `);
    const { result } = await posts.json();
   

    // legger til prosjektene
    const projectList = document.querySelector('.projectlist');

    if(projectList !== null) {
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
    }
 

    

init();
