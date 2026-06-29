/*==================================================
EVERY BEAT HAS A DIRECTION

main.js

Bradley Hobbs

==================================================*/

"use strict";

/*==================================================
SELECTORS
==================================================*/

const header = document.querySelector(".site-header");

const menuButton = document.querySelector(".menu-toggle");

const navigation = document.querySelector(".nav-menu");

const backTop = document.querySelector(".back-top");

const progressBar = document.querySelector(".progress-bar");

const revealItems = document.querySelectorAll(".fade-up");



/*==================================================
STICKY HEADER
==================================================*/

function stickyHeader(){

    if(window.scrollY > 80){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", stickyHeader);



/*==================================================
MOBILE MENU
==================================================*/

if(menuButton){

    menuButton.addEventListener("click", ()=>{

        menuButton.classList.toggle("active");

        navigation.classList.toggle("active");

    });

}



/*==================================================
CLOSE MENU WHEN LINK IS CLICKED
==================================================*/

document.querySelectorAll(".nav-menu a").forEach(link=>{

    link.addEventListener("click",()=>{

        navigation.classList.remove("active");

        menuButton.classList.remove("active");

    });

});



/*==================================================
BACK TO TOP
==================================================*/

function backButton(){

    if(!backTop) return;

    if(window.scrollY > 600){

        backTop.style.opacity="1";

        backTop.style.pointerEvents="auto";

    }else{

        backTop.style.opacity="0";

        backTop.style.pointerEvents="none";

    }

}

window.addEventListener("scroll",backButton);



if(backTop){

backTop.addEventListener("click",function(e){

    e.preventDefault();

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

}



/*==================================================
READING PROGRESS BAR
==================================================*/

function readingProgress(){

    if(!progressBar) return;

    const totalHeight =

        document.documentElement.scrollHeight -

        document.documentElement.clientHeight;

    const progress =

        (window.scrollY / totalHeight) * 100;

    progressBar.style.width = progress + "%";

}

window.addEventListener("scroll",readingProgress);



/*==================================================
SCROLL REVEAL
==================================================*/

const observer =

new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:.15

}

);

revealItems.forEach(item=>{

observer.observe(item);

});



/*==================================================
SMOOTH INTERNAL LINKS
==================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

const target=document.querySelector(this.getAttribute("href"));

if(!target) return;

e.preventDefault();

target.scrollIntoView({

behavior:"smooth"

});

});

});



/*==================================================
ACTIVE NAVIGATION
==================================================*/

const sections=document.querySelectorAll("section[id]");

function activeMenu(){

let scroll=window.scrollY+120;

sections.forEach(section=>{

const top=section.offsetTop;

const height=section.offsetHeight;

const id=section.getAttribute("id");

const link=document.querySelector(

'.nav-menu a[href="#'+id+'"]'

);

if(!link) return;

if(scroll>=top && scroll<top+height){

document

.querySelectorAll(".nav-menu a")

.forEach(item=>{

item.classList.remove("active");

});

link.classList.add("active");

}

});

}

window.addEventListener("scroll",activeMenu);



/*==================================================
CURRENT YEAR
==================================================*/

const year=document.querySelector(".year");

if(year){

year.textContent=new Date().getFullYear();

}



/*==================================================
IMAGE FADE
==================================================*/

document.querySelectorAll("img").forEach(image=>{

image.setAttribute("loading","lazy");

});



/*==================================================
KEYBOARD SHORTCUT

Press T

Go To Top

==================================================*/

document.addEventListener("keydown",(event)=>{

if(event.key==="t"){

window.scrollTo({

top:0,

behavior:"smooth"

});

}

});



/*==================================================
END

==================================================*/

/*==================================================

READING EXPERIENCE

==================================================*/


/*==================================================
ESTIMATED READING TIME
==================================================*/

const article=document.querySelector(".book-reading");

const readTime=document.querySelector(".reading-time");

if(article && readTime){

const words=article.innerText.trim().split(/\s+/).length;

const minutes=Math.max(1,Math.ceil(words/220));

readTime.textContent=minutes+" Minute Read";

}


/*==================================================
SAVE READING POSITION
==================================================*/

const pageKey="reading-"+window.location.pathname;

window.addEventListener("beforeunload",()=>{

localStorage.setItem(pageKey,window.scrollY);

});

window.addEventListener("load",()=>{

const saved=localStorage.getItem(pageKey);

if(saved){

window.scrollTo({

top:parseInt(saved),

behavior:"instant"

});

}

});


/*==================================================
CHAPTER COMPLETION
==================================================*/

const percent=document.querySelector(".chapter-percent");

function updateCompletion(){

if(!percent) return;

const total=document.documentElement.scrollHeight-window.innerHeight;

const current=window.scrollY;

const progress=Math.round((current/total)*100);

percent.textContent=progress+"% Complete";

}

window.addEventListener("scroll",updateCompletion);


/*==================================================
CONTINUE READING BUTTON
==================================================*/

const continueButton=document.querySelector(".continue-reading");

if(continueButton){

const lastPage=localStorage.getItem("last-page");

if(lastPage){

continueButton.href=lastPage;

}else{

continueButton.style.display="none";

}

}

window.addEventListener("beforeunload",()=>{

localStorage.setItem(

"last-page",

window.location.href

);

});


/*==================================================
REMEMBER LAST CHAPTER
==================================================*/

const chapterTitle=document.querySelector(".chapter-title h1");

if(chapterTitle){

localStorage.setItem(

"last-chapter",

chapterTitle.textContent

);

}


/*==================================================
AUTO HIGHLIGHT CURRENT CHAPTER
==================================================*/

const chapterCards=document.querySelectorAll(".chapter-card");

chapterCards.forEach(card=>{

if(card.dataset.page===window.location.pathname){

card.classList.add("chapter-current");

}

});


/*==================================================
KEYBOARD NAVIGATION

LEFT PREVIOUS

RIGHT NEXT

==================================================*/

document.addEventListener("keydown",(event)=>{

if(event.target.matches("input,textarea")) return;

if(event.key==="ArrowRight"){

const next=document.querySelector(".next-chapter");

if(next){

window.location=next.href;

}

}

if(event.key==="ArrowLeft"){

const previous=document.querySelector(".previous-chapter");

if(previous){

window.location=previous.href;

}

}

});


/*==================================================
READING MODE

Press R

==================================================*/

document.addEventListener("keydown",(event)=>{

if(event.key.toLowerCase()==="r"){

document.body.classList.toggle("reading-mode");

}

});


/*==================================================
FONT SIZE

+ and -

==================================================*/

let fontSize=1.25;

document.addEventListener("keydown",(event)=>{

if(event.key==="="){

fontSize+=.1;

article.style.fontSize=fontSize+"rem";

}

if(event.key==="-"){

fontSize-=.1;

article.style.fontSize=fontSize+"rem";

}

});


/*==================================================
COPY SCRIPTURE

==================================================*/

document.querySelectorAll(".scripture").forEach(scripture=>{

scripture.addEventListener("dblclick",()=>{

navigator.clipboard.writeText(scripture.innerText);

});

});


/*==================================================
SCROLL INDICATOR

==================================================*/

const scrollIndicator=document.querySelector(".scroll-indicator");

function updateIndicator(){

if(!scrollIndicator) return;

const total=document.documentElement.scrollHeight-window.innerHeight;

const value=(window.scrollY/total)*100;

scrollIndicator.style.width=value+"%";

}

window.addEventListener("scroll",updateIndicator);


/*==================================================
END
==================================================*/