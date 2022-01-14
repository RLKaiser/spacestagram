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
            <button class="like-photo-${i}">Like</button>
            <button class="share-photo-${i}">Share</button>
        </div>
        `
        document.querySelector('main').insertAdjacentHTML('afterbegin', template); 
    }
}

fetchPhotoData()