(function() {
    fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=1dqCkXhcDym7QqNzSb1hpgOjBndEiaOaoD7y2IwJ')
    .then(res => res.json())
    .then(data => {
        let spacePhotos = data.photos;
        console.log(spacePhotos);
        for (let i = 0; i < spacePhotos.length; i++) {
            let template = `
            <div>
                <h2>${spacePhotos[i].rover.name} Rover - ${spacePhotos[i].camera.full_name}</h2>
                <img src="${spacePhotos[i].img_src}" alt="${spacePhotos[i].camera.full_name}">
                <p>${spacePhotos[i].earth_date}</p>
            </div>
            `
            document.querySelector('main').insertAdjacentHTML('afterbegin', template);
        }
    })
})
()