const skeletonTemplate = async function() {
    let template = `
        <div class="card">
            <div class="skeleton skeleton-img"></div>
            <div class="card-content">
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text skeleton-date"></div>
                <div class="flex">
                    <div class="skeleton skeleton-btn"></div>
                    <div class="skeleton skeleton-btn"></div>
                </div>
            </div>
        </div>
    `
    for (let i = 0; i < 4; i++) {
        document.querySelector('main').insertAdjacentHTML('afterbegin', template); 
    }
}

const fetchPhotoData = async function() {
    const url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=1dqCkXhcDym7QqNzSb1hpgOjBndEiaOaoD7y2IwJ';
    const res = await fetch(url);
    const data = await res.json();
    const spacePhotos = data.photos;

    displayPhotoData(spacePhotos)
}

const displayPhotoData = async function(data) {
    document.querySelector('main').innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        let template = `
        <div class="card photo-card-${i}">
            <img src="${data[i].img_src}" alt="${data[i].camera.full_name}">
            <div class="card-content">
                <h2>${data[i].rover.name} Rover - ${data[i].camera.full_name}</h2>
                <p class="date">${data[i].earth_date}</p>
                <div class="flex">
                    <button class="like-btn">Like</button>
                    <button class="share-btn share-photo-${i}">Share</button>
                    <p class="copied-url"></p>
                </div>
            </div>
        </div>
        `
        document.querySelector('main').insertAdjacentHTML('afterbegin', template); 
    }
}

const handleClickEvent = function(evt) {
    let target = evt.target;
    if (target.classList.contains('like-btn')) {
        likePhoto(target)
    }

    if (target.classList.contains('share-btn')) {
        sharePhoto(target)
    }
}

const likePhoto = function(target) {
    if (target.innerText == "Like") {
        target.innerText = "Unlike";
    } else {
        target.innerText = "Like";
    }
}

const sharePhoto = function(target) {
    let photoIndex = target.classList[1][12];
    let photoCard = document.querySelector(`.photo-card-${photoIndex}`);
    let imgUrl = photoCard.children[0].src;
    navigator.clipboard.writeText(imgUrl).then(function() {
        let copiedUrl = photoCard.children[1].children[2].children[2];
        copiedUrl.innerText = "Copied URL to Clipboard";
        setTimeout(() => { copiedUrl.innerText = "" }, 4000);
    })
}

skeletonTemplate()
.then(fetchPhotoData())
.then(document.addEventListener('click', handleClickEvent))