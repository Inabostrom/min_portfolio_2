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
}

function test () {
    console.log('test');
}

const cdnUrl = 'https://cdn.sanity.io/images/altl67pm/production/';

async function getPost (pageValue) {
    const project = document.querySelector('.projectside');
    const post = await fetch(`https://altl67pm.api.sanity.io/v1/data/query/production?query=*
    [slug.current == "${pageValue}"]
    `);
    console.log(post);
    const { result } = await post.json()
    const imgCover = result[0].mainImage.asset._ref.split('-')
    

    const cover = document.createElement('img');
    cover.setAttribute('src',  `${cdnUrl}${imgCover[1]}-${imgCover[2]}.${imgCover[3]}?h=400`)
    project.append(cover)
}


async function getPosts() {
    const posts = await fetch(`https://altl67pm.api.sanity.io/v1/data/query/production?query=*
    [_type == "post"]
    `);
    const { result } = await posts.json();
    // return console.log('async') shift+cmd+7

    const projectList = document.querySelector('.projectlist');

    result.forEach(post => {
const cover = post.mainImage.asset._ref.split('-')
console.log("Hello"+cover)

        const projectBlock = document.createElement('a');
        projectBlock.classList.add('project');
        projectBlock.setAttribute('href', `./project.html?page=${post.slug.current}`);
        const projectTitle = document.createElement('h2');
        projectTitle.classList.add('project-title');
        projectTitle.innerText = post.title
        projectBlock.append(projectTitle);
        const projectMask = document.createElement('div');
        projectMask.classList.add('project-mask')
        projectBlock.append(projectMask);
        const projectCover = document.createElement('img');
        projectCover.setAttribute('src', `${cdnUrl}${cover[1]}-${cover[2]}.${cover[3]}?h=400`)
        projectCover.classList.add('project-cover');
        projectBlock.append(projectCover);

        projectList.append(projectBlock);
        console.log(projectBlock);

    });

    console.log(result);
}
    

init();
