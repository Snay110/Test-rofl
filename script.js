document.addEventListener ('DOMContentLoaded', function(){
    console.log("DOM загружен, рендерим слайды");
    renderSlides();
})


const images = [
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg'
];
let currenSlay=0

const listitem =
document.getElementById('listitem');

function renderSlides(){
    
    listitem.innerHTML = images.map((photo, index) =>`
<li class="list__item"
id="listitem-${index}"
style="display: ${index === currenSlay ?  'block' : 'none'}">


<img src="${photo}" alt="slide
${index + 1}">
</li>
` ).join('');
}
function showSlay(description) {
    currenSlay += description;
    if(currenSlay >= images.length){
        currenSlay =0
    }
    if(currenSlay<0) {
        currenSlay=images.length - 1;
    }
    renderSlides();
}
renderSlides();

document.getElementById('Prev').addEventListener ('click', () =>
showSlay(-1));
document.getElementById('Next').addEventListener ('click', () =>
showSlay(1));


