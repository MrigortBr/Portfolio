// Variaveis necessarias para execução do codigo
const elements = [
    {name: "hello", type: "html", text: 'hello-text', window: "hello-window", file: "./pages/hello-window.html", code:''},
    {name: "about", type: "html", text: 'about-text', window: "about-me",file: "./pages/about-me.html" , code:''},
    {name: "Projects", type: "html", text: 'projects-text', window: "projects",file: "./pages/projects.html" , code:''},
    {name: "Skills", type: "html", text: 'competency-text', window: "competency",file: "./pages/skills.html" , code:''},
    {name: "Certificate", type: "html", text: "certificate-text", window: "certificate", file:"./pages/certificate.html", code: ''},
    {name: "Contact", type: "html", text: 'contact-text', window: "contact",file: "./pages/contact.html" , code:''}
]
const projects = [
    {lang: ["Java EE", "Mysql", "jsp", "JavaScript", "Servlet"], img: "./projects/SeuLivro/minhasleituras.png", images: ["./projects/SeuLivro/edicaodelivros.png", "./projects/SeuLivro/login.png", "./projects/SeuLivro/paginadelivro.png", "./projects/SeuLivro/perfil.png", "./projects/SeuLivro/registro.png", "./projects/SeuLivro/minhasleituras.png"]},
    {lang: ["Vue.js","Node.js","Bulma.css","MySql","knex","Socket.io","animation.js", "socket.io", "bcrypt", "jsonwebtoken", "Express", "Axios"], img: "./projects/sday/sday.png", images: ["./projects/sday/users.jpeg", "./projects/sday/calendar.jpeg", "./projects/sday/sday.png"]},
    {lang: ["Java EE", "Mysql", "jsp", "JavaScript", "Servlet", "Maven"], img: "./projects/upDelivery/index.png", images: ["./projects/upDelivery/historico.png","./projects/upDelivery/liked.png","./projects/upDelivery/login.png","./projects/upDelivery/index.png"] }]
const saudacoes = [
        "Hello World",
        "Hola Mundo",
        "Bonjour le Monde",
        "Hallo Welt",
        "Ciao Mondo",
        "Olá, Mundo",
        "こんにちは、世界",
        "你好，世界",
        "Привет, мир",
        "مرحبا بالعالم"];
    
    const hello = document.getElementById("hello")

let page = 0;
let type = 1
let indexCenter = 1
let indexImage = 0
let helloCont = 0

// Funções
//Responsavel por trocar o arquivo
function swipeLocation(element){
    const textId = element.querySelectorAll("h4")[0].id
    const newValue = element.querySelectorAll("h4")[0].textContent

    const oldSelected = document.getElementsByClassName("selected")
    
    for (const selected of oldSelected) {
        selected.classList.remove("selected")
    }

    element.classList.add("selected");

    tradeTitle(newValue)
    let cont = 0;
    for (const element2 of elements) {
        if (element2.text == textId){
            page = cont
            swipeWindow(element2)
        }
        cont++
    }
}

//Scrollar a tela para janela escolhida
function swipeWindow(page){
    const element = document.getElementById(page.window);
    if (type == 1){
        showWindow()
    }
    else if (type == 3){
        showCode()
    }
    document.getElementById("app").scrollTo({
        top: element.offsetTop-35-30,
        behavior: "smooth",
    });
}

window.addEventListener("resize", () =>{
    swipeWindow(elements[page])
})  

function scrollAbout(){
    const simulatedWheelEvent = new WheelEvent("wheel", {
        deltaY: 100, // Simule o movimento para baixo, valor positivo, ou -100 para movimento para cima
        view: window
    });
    document.body.dispatchEvent(simulatedWheelEvent);

}

// Eventos
// Mostrar informação do elemento passado (onmouseenter)
function showInfo(element){
    const text = element.getAttribute("title")

    // Criação do elemento .alert
    const alertElement = document.createElement("div");
    alertElement.id = "alert";
    alertElement.style.left = element.clientWidth+"px"
    alertElement.style.top = element.getBoundingClientRect().top+(element.clientHeight/4)+"px"

    // Criação do elemento .triangle
    const triangleElement = document.createElement("div");
    triangleElement.id = "triangle";
    alertElement.appendChild(triangleElement);

    // Criação do elemento .content
    const contentElement = document.createElement("div");
    contentElement.id = "content";

    // Criação do elemento <span> dentro do .content
    const spanElement = document.createElement("span");
    spanElement.textContent = text;
    contentElement.appendChild(spanElement);

    alertElement.appendChild(contentElement);

    // Adiciona o elemento .alert ao corpo do documento
    document.body.appendChild(alertElement);
}
// Remover informação do elemento passaod (onmouseleave)
function removeInfo(){
    const alertElement = document.getElementById("alert")
    document.body.removeChild(alertElement)
}
//Trocar tipo do explorador e vizualizador da tela (onclick)
function swipeType(element){
    const text = element.getAttribute("type")
    type = Number(text)
    if (type == 1){
        showWindow()
    }
    else if (type == 3){
        showCode()
    }

    if (type == 1 || type == 3){
        const attributes = document.getElementsByClassName("selected-left")

        for (const attribute of attributes) {
            attribute.classList.remove("selected-left")
        }
    
        element.classList.add("selected-left")
    }

}

//Troca o arquivo a ser mostrado (onclick)

// Funções de inicialização
// Função responsavel por escrever os svgs no codigo
function initSvg(){
    const svgsCreate = document.getElementsByTagName("createsvg")
    for (const svgCreate of svgsCreate) {
        const picture = svgCreate.parentNode
        let svg = svgCreate.getAttribute("path")
        fetch(svg).then((r) => r.text().then(r2 =>{
            picture.innerHTML = r2
        } ))
    }
}
initSvg()

// Coloca todas a paginas na propria pagina
function initPages(){
    const appElement = document.getElementById("app");
    const accumulatedHTML = [];
    
    for (const files of elements) {
        fetch(files.file)
            .then(response => response.text())
            .then(html => {
                accumulatedHTML.push(html);
                
                if (accumulatedHTML.length === elements.length) {
                    // Todos os arquivos foram carregados, agora podemos adicionar o conteúdo ao elemento
                    appElement.innerHTML = accumulatedHTML.join('');
                    initCarousel()
                }
            });
    }
}
initPages();

function initCarousel(){
    document.getElementById('left').src = projects[indexCenter-1].img;
    document.getElementById('center').src = projects[indexCenter].img;
    document.getElementById('rigth').src = projects[indexCenter+1].img;
}

//Mostra o codigo da pagina em questão
function showCode(){
    const app = document.getElementById("app");
    const pre = document.createElement("pre");
    const element = document.getElementById(elements[page].window)
    if (!elements[page].code){
        elements[page].code = element.innerHTML
    }
    
    pre.innerText = elements[page].code;
  
    element.innerHTML = ''; // Limpar o conteúdo do elemento app
    element.appendChild(pre); // Adicionar o elemento pre como filho de app
    element.classList.add("source")
}

function showWindow(){
    if (elements[page].code){
        document.getElementById(elements[page].window).innerHTML = elements[page].code
    }
}

document.body.addEventListener("wheel", scrolling)  
function scrolling(event){
    console.log(page)
    if (type !== 3 && page != 4 ){
        if (event.deltaY > 0){
            if (page+1 <= elements.length-1){
                page++
                const element = document.getElementById(elements[page].text).parentElement
                swipeLocation(element)
            }
        }else{
            if (page-1 >= 0){
                page--
                const element = document.getElementById(elements[page].text).parentElement
                swipeLocation(element)
            }
    
        }
    }

}

function tradeTitle(title){
    const elementsTitle = document.getElementsByClassName("name-file")
    for (const element of elementsTitle) {
        element.textContent = title+"   "
    }
}



function tradeProject(element){
    const carouselContainer = document.querySelector('#carousel-container');
    const imgLeft = document.getElementById('left');
    const imgCenter = document.getElementById('center');
    const imgRigth = document.getElementById('rigth');

    imgCenter.style.height = carouselContainer.clientHeight+"px"
    imgCenter.style.width = imgCenter.clientHeight * 16 / 9+"px"

    imgLeft.style.height = carouselContainer.clientHeight*0.9+"px"
    imgLeft.style.width = imgLeft.clientHeight * 16 / 9+"px"

    imgLeft.style.marginRight = -imgLeft.clientWidth*0.8+"px"


    imgRigth.style.height = carouselContainer.clientHeight*0.9+"px"
    imgRigth.style.width = imgRigth.clientHeight * 16 / 9+"px"

    imgRigth.style.marginLeft = -imgRigth.clientWidth*0.8+"px"
    if (element.id == "left"){
        imgLeft.style.transform = "Scale(1.1)"
        imgLeft.style.marginRight = -imgLeft.clientWidth*1.059+"px"
        imgLeft.style.filter = "Blur(0)"
        imgLeft.style.zIndex = 2
        indexCenter--
        if (indexCenter == -1){
            indexCenter = projects.length-1
        }

        setTimeout(() => {
            if (projects[indexCenter+1]){
                imgRigth.src = projects[indexCenter+1].img
            }else{
                imgRigth.src = projects[0].img
            }
            if (projects[indexCenter-1]){
                imgLeft.src = projects[indexCenter-1].img
            }else{
                imgLeft.src = projects[projects.length-1].img
            }

            imgCenter.src = projects[indexCenter].img
               
            imgLeft.style.marginRight = -imgLeft.clientWidth*0.8+"px"
            imgLeft.style.transform = null
            imgLeft.style.zIndex = null
            imgLeft.style.filter =  null
        }, 100);
    }else if(element.id == "rigth"){
        imgRigth.style.transform = "Scale(1.1)"
        imgRigth.style.marginLeft = -imgRigth.clientWidth*1.059+"px"
        imgRigth.style.filter = "Blur(0)"
        imgRigth.style.zIndex = 2
        indexCenter++

        if (indexCenter == projects.length){
            indexCenter = 0
        }

        setTimeout(() => {
            if (projects[indexCenter+1]){
                imgRigth.src = projects[indexCenter+1].img
            }else{
                imgRigth.src = projects[0].img
            }
            if (projects[indexCenter-1]){
                imgLeft.src = projects[indexCenter-1].img
            }else{
                imgLeft.src = projects[projects.length-1].img
            }

            imgCenter.src = projects[indexCenter].img

            imgRigth.style.marginLeft = -imgRigth.clientWidth*0.8+"px"
            imgRigth.style.transform = null
            imgRigth.style.zIndex = null
            imgRigth.style.filter =  null
        }, 100);
    }

    indexImage = 0
    changeLanguages()
}

 function changeLanguages(){
        const languages = document.getElementById("languages")
        languages.innerHTML = ""

        setTimeout(() => {
            for (const language of projects[indexCenter].lang) {
                const span = document.createElement("span")
                span.innerText = language
                languages.appendChild(span)
            }
        }, 50);

}

setInterval(() => {
    const imgCenter = document.getElementById('center');

        indexImage++
        if (indexImage > projects[indexCenter].images.length-1){
            indexImage = 0
        }
        imgCenter.style.opacity = ".1";
        setTimeout(() => {
            imgCenter.style.opacity = "1";
            imgCenter.src = projects[indexCenter].images[indexImage]
        }, 300);
}, 4000);

setInterval(() => {
    const hello = document.getElementById("hello")
    hello.innerText = saudacoes[helloCont]
        helloCont++

        if (helloCont > saudacoes.length-1){
            helloCont = 0
        }
}, 500);
