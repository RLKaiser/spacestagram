const fetchPhotoData = async function() {
    const url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=1dqCkXhcDym7QqNzSb1hpgOjBndEiaOaoD7y2IwJ';
    const res = await fetch(url);
    const data = await res.json();
    const spacePhotos = data.photos;

    displayPhotoData(spacePhotos)
}

const displayPhotoData = async function(data) {
    for (let i = 0; i < data.length; i++) {
        let template = `
        <div class="photo-card">
            <img src="${data[i].img_src}" alt="${data[i].camera.full_name}">
            <h2>${data[i].rover.name} Rover - ${data[i].camera.full_name}</h2>
            <p>${data[i].earth_date}</p>
            <button class="like-btn">Like</button>
            <button class="share-photo-${i}">Share</button>
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
    // console.log(target)
}

const likePhoto = function(target) {
    if (target.innerText == "Like") {
        target.innerText = "Unlike";
    } else {
        target.innerText = "Like";
    }
}

fetchPhotoData()
.then(document.addEventListener('click', handleClickEvent))