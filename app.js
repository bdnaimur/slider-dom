let slideIndex = 0;
        var timer;
        const sliderImages = [];
        const sreachInput = document.querySelector('#search');
        const displayImages = document.querySelector('.image');
        const imagesSection = document.querySelector('.images-sliderInput');
        const slideContainer = document.querySelector('.slides');
        const handleSearchFormSubmit = (e) =>{
            e.preventDefault();
            displayImages.innerHTML = '';
            slideContainer.innerHTML = '';
            sliderImages.length = 0;
            clearInterval(timer);
            const query = sreachInput.value;
            getImages(query);
        }
        const getImages = function(query) {
            const KEY = '15674931-a9d714b6e9d654524df198e00&q';
            const url = `https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`;
            fetch(url)
            .then(res => res.json())
            .then(data => showImages(data.hits))
            .catch(err => alert(err))
        }
        const showImages = (images) =>{
            sreachInput.value = "";
            imagesSection.style.display = 'block';
            images.map(image=>{
                const div = document.createElement('div');
                div.className = "image-item"
                div.innerHTML = `<img src="${image.webformatURL}" onclick="selectItem(event,'${image.webformatURL}')" alt="${image.tag}">`;
                displayImages.appendChild(div);
            })
        }

        const selectItem = function (e, item) {
            const parentNode = e.target.parentNode;
            parentNode.classList.add('added');
            const itemIndex = sliderImages.indexOf(item);
            if(itemIndex === -1){
                sliderImages.push(item)
            }
        }

        const sliderSubmit = (event) =>{
            event.preventDefault();
            imagesSection.style.display = 'none';
            
            const prevNext = document.createElement('div');
            prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
            prevNext.innerHTML = ` 
            <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
            <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
            `;

            slideContainer.appendChild(prevNext)
            sliderImages.forEach(slide=>{
                let item = document.createElement('div')
                    item.className = "slider-item";
                    item.innerHTML = `<img class="w-100" src="${slide}" alt="">`;
                    slideContainer.appendChild(item);
            })
            changeSlide(0);
            console.log("print or not");
            timer = setInterval(() => {
            console.log("inside print or not");
                slideIndex++;
                changeSlide(slideIndex);
            }, 2000);
        }
        function changeSlide(index) {
            console.log("above Index",index);
            if(index >sliderImages.length-1){
                slideIndex = 0;
                index = 0;
                console.log("inside if", index);
            }
            const sliderItem = document.querySelectorAll('.slider-item');
            // sliderItem.classList.add(`item-count${index}`);
            sliderItem.forEach(eachSlide =>{
                eachSlide.style.display = "none";
            })
            sliderItem[index].style.display="block";
            console.log(index);
        }