"use strict";

// tabs for services section
const servicesTitle = document.querySelectorAll('.services-title');
const servicesContentTitle = document.querySelectorAll('.services-tabs__content-title');

document.querySelector(".services-tabs__wrapper").addEventListener('click', (e) => {
    if (e.target.closest(".services-title")) {
        let currentTitle = e.target;
        let titleData = currentTitle.getAttribute("data-tab");
        let currentContent = document.querySelector(titleData);
        if (!currentTitle.classList.contains('active')){
            servicesTitle.forEach(el => {
                el.classList.remove('active');
            });
            servicesContentTitle.forEach(element => {
                element.classList.remove('active');
            });
        }
        currentTitle.classList.add('active');
        currentContent.classList.add('active');
    }
});

// tabs for work section
const workTitle = document.querySelectorAll(".work-title");
const allImg = document.querySelectorAll(".all-works");

document.querySelector(".work-section").addEventListener('click', (event) => {
    if  (event.target.closest(".work-title")) {
        document.querySelector(".work-section__btn").style.display = '';
        let currentTitle = event.target;
        let titleData = currentTitle.getAttribute("data-tab");
        let imgView = document.querySelectorAll(titleData);
        if (!currentTitle.classList.contains('active')) {
            workTitle.forEach(el => {
                el.classList.remove('active');
            });
            allImg.forEach(element => {
                element.classList.remove('active');
            });
        }
        currentTitle.classList.add('active');
        for (const imgViewKey in imgView) {
            if (imgViewKey < 12) {
                imgView[imgViewKey].classList.add('active');
            }
        }
        if (imgView.length <= 12){
            document.querySelector(".work-section__btn").style.display = 'none';
        }
    }

    if (event.target.closest(".work-section__btn")) {
        let activeTitle = document.querySelector('.work-title.active');
        let activeImg = document.querySelectorAll('.all-works.active');
        let imgToView = document.querySelectorAll(activeTitle.getAttribute("data-tab"));
        const btnLoadImg = document.querySelector(".work-section__btn img");
        const btnLoadText = document.querySelector(".work-section__btn p");
        const loadingText = document.querySelector(".work-section__btn h2");
        btnLoadImg.style.display = "none";
        btnLoadText.style.display = "none";
        loadingText.style.display = "flex";

        setTimeout(function () {
        if (activeImg.length >= 24 && imgToView.length > 24){
            for (const imgToViewKey in imgToView) {
                if (imgToViewKey <= 36) {
                    imgToView[imgToViewKey].classList.add('active');
                }
                document.querySelector(".work-section__btn").style.display = 'none';
            }
        } else {
            if (activeImg.length <= 12 && imgToView.length > 12) {
                imgToView.forEach(e => {
                    e.classList.remove('active');
                });
                for (const imgToViewKey in imgToView) {
                    if (imgToViewKey < 24) {
                        imgToView[imgToViewKey].classList.add('active');
                    }
                }
            }
            btnLoadImg.style.display = "";
            btnLoadText.style.display = "";
            loadingText.style.display = "none";
        }
        }, 2000);
    }
});

//slider feedback section
let imgArr = document.querySelectorAll('.feedback-slider__photo');

let srcArr = [];
let className = [];
let dataSet = [];

for (let i = 0; i < imgArr.length; i++){
    srcArr[i] = imgArr[i].src;
    className[i] = imgArr[i].getAttribute('class');
    dataSet[i] = imgArr[i].getAttribute('data-id');
    imgArr[i].remove();
}

let step = 0;
// let offset = 0;

function addImg () {
    let img = document.createElement('img');
    img.src = srcArr[step];
    img.setAttribute("class", className[step]);
    img.setAttribute("data-id", dataSet[step]);
    document.querySelector('.feedback-slider__photo-wrap').appendChild(img);

    if (step === srcArr.length-1) {
        step = 0;
    } else {
        step++;
    }
}

addImg(); addImg(); addImg(); addImg(); addImg();

function next () {
    let imgArray = document.querySelectorAll('.feedback-slider__photo');
    let offset2 = 0;
    for (let i = 0; i < imgArray.length; i++){
        imgArray[i].style.left = offset2 * 80 - 80 + 'px';
        offset2++;
    }
    setTimeout(function(){
        className[step] = imgArray[0].getAttribute('class');
        imgArray[0].remove();
        addImg();

    }, 1000);
}

function addImgPrep () {

    let img = document.createElement('img');
    img.src = srcArr[step-1];
    img.setAttribute("class", className[step-1]);
    img.setAttribute("data-id", dataSet[step-1]);
    let childFirst = document.querySelector('.feedback-slider__photo-wrap').firstChild;
    document.querySelector('.feedback-slider__photo-wrap').insertBefore(img, childFirst);
    step--;
}

function prev () {
    let imgArray = document.querySelectorAll('.feedback-slider__photo');
    let offset2 = 0;
    for (let i = 0; i < imgArray.length; i++){
        imgArray[i].style.left = offset2 * 80 - 80 + 'px';
        offset2++;
    }
    setTimeout(function(){
        if (step === 0){
            step = srcArr.length;
        }
        className[step-1] = imgArray[srcArr.length-1].getAttribute('class');
        imgArray[srcArr.length-1].remove();
        addImgPrep();
    }, 1000);
}

function showFeedback (event) {
    const sliderPhotos = document.querySelectorAll('.feedback-slider__photo');
    const feedbackText = document.querySelectorAll('.feedback-text__item');
    let currentPhoto = event.target;
    let titleData = currentPhoto.getAttribute("data-id");
    let currentFeedbackText = document.querySelector(titleData);
    if (!currentPhoto.classList.contains('active')){
        sliderPhotos.forEach(el => {
            el.classList.remove('active');
        });
        feedbackText.forEach(element => {
            element.classList.remove('active');
        });
    }
    currentPhoto.classList.add('active');
    currentFeedbackText.querySelector('.feedback-text__people-photo').setAttribute("src", currentPhoto.getAttribute("src"));
    currentFeedbackText.classList.add('active');
}

function getIndex () {
    let sliderPhotosArray = document.querySelectorAll('.feedback-slider__photo');
    let ind;
    for (let i = 0; i<sliderPhotosArray.length; i++) {
        if (sliderPhotosArray[i].classList.contains('active')){
            if (i === 0){
                ind = sliderPhotosArray.length;
            }
            ind = i;
        }
    }
    return ind;
}

function showFeedback2 (elem) {
    const sliderPhotos = document.querySelectorAll('.feedback-slider__photo');
    const feedbackText = document.querySelectorAll('.feedback-text__item');
    let currentPhoto = elem;
    let titleData = currentPhoto.getAttribute("data-id");
    let currentFeedbackText = document.querySelector(titleData);
    if (!currentPhoto.classList.contains('active')){
        sliderPhotos.forEach(el => {
            el.classList.remove('active');
        });
        feedbackText.forEach(element => {
            element.classList.remove('active');
        });
    }
    currentPhoto.classList.add('active');
    currentFeedbackText.querySelector('.feedback-text__people-photo').setAttribute("src", currentPhoto.getAttribute("src"));
    currentFeedbackText.classList.add('active');
}

document.querySelector('.feedback-slider').addEventListener('click', (e) => {
    if (e.target.closest(".btn-slider__next")){
        let currentIndex = getIndex();
        showFeedback2(document.querySelectorAll('.feedback-slider__photo')[currentIndex + 1]);
        next();
    }
    if (e.target.closest(".btn-slider__prev")){
        let currentIndex = getIndex();
        if (currentIndex === 0) {
            currentIndex = document.querySelectorAll('.feedback-slider__photo').length;

            showFeedback2(document.querySelectorAll('.feedback-slider__photo')[currentIndex - 1]);
            prev();
        } else {
            showFeedback2(document.querySelectorAll('.feedback-slider__photo')[currentIndex - 1]);
            prev();
        }
    }
    if (e.target.closest(".feedback-slider__photo")){
        showFeedback(e);
    }
});

// gallery masonry
window.onload = function () {
    const elem = document.querySelector('.grid');
    const msnry = new Masonry( elem, {
        // options
        itemSelector: '.grid-item',
        columnWidth: 386,
    });
}


const gridItem = document.querySelectorAll('.grid-item');

function getImg () {
    gridItem.forEach(el => {
        if (!el.classList.contains('active')){
            el.classList.add('active');
        }
    });
    const elem = document.querySelector('.grid');
    const msnry = new Masonry( elem, {
        // options
        itemSelector: '.grid-item',
        columnWidth: 386,
    });
    document.querySelector('.gallery-section__btn').remove();
}

function zoomImg (e) {
    let element = e.target;
    let img = element.parentElement.querySelector('img');
    img.style.transform = "scale(1.2)";
    element.parentElement.style.zIndex = "1";
    img.style.background = "rgba(0, 0, 0, 0)";
    element.style.display = "none";
    img.style.opacity = "100%";
    setTimeout(function () {
        img.style.transform = "";
        element.parentElement.style.zIndex = "";
        img.style.background = "";
        img.style.opacity = "";
        element.style.display = "";
    }, 3000);
}

const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal-img");

document.querySelector('.gallery-section').addEventListener('click', (event) => {
    if (event.target.closest('.gallery-section__btn')) {
        document.querySelector(".gallery-section__btn img").style.display = "none";
        document.querySelector(".gallery-section__btn p").style.display = "none";
        document.querySelector(".gallery-section__btn h2").style.display = "flex";
        setTimeout(getImg, 2000);
    }
    if (event.target.classList.contains('gallery-zoom-btn')) {
        zoomImg(event);
    }
    if (event.target.classList.contains('gallery-full-screen-btn')) {
        const imgSrc = event.target.parentElement.querySelector('img').getAttribute("src");
        const imgAlt = event.target.parentElement.querySelector('img').getAttribute('alt');
        modalImg.setAttribute("src", imgSrc);
        modalImg.setAttribute("alt", imgAlt);
        modal.style.display = "block";
        modal.addEventListener('click', () => {
            modal.style.display = "none";
        });
    }
});

