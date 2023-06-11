// const { style } = require("d3")

let images = {
                0: {'src':'https:////upload.wikimedia.org/wikipedia/commons/thumb/2/21/Limetal.JPG/250px-Limetal.JPG', 'href': 'Литий.html'},
                1: {'src': 'https:////upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Boron_mNACTEC.jpg/250px-Boron_mNACTEC.jpg', 'href': 'Бор.html'},
                2: {'src': 'https:////upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Liquidnitrogen.jpg/250px-Liquidnitrogen.jpg', 'href': 'Азот.html'},
                3: {'src': 'https:////upload.wikimedia.org/wikipedia/commons/thumb/9/91/Liquid_fluorine_tighter_crop.jpg/250px-Liquid_fluorine_tighter_crop.jpg', 'href': 'Фтор.html'},
                4: {'src': 'https:////upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Aluminium-4.jpg/250px-Aluminium-4.jpg', 'href': 'Алюминий.html'},
                5: {'src': 'https:////upload.wikimedia.org/wikipedia/commons/thumb/7/78/Chlorine_liquid_in_an_ampoule.jpg/250px-Chlorine_liquid_in_an_ampoule.jpg', 'href': 'Хлор.html'},
                6: {'src': 'https:////upload.wikimedia.org/wikipedia/commons/thumb/6/63/Solid_and_liquid_argon_in_small_graduated_cylinder.jpg/250px-Solid_and_liquid_argon_in_small_graduated_cylinder.jpg', 'href': 'Аргон.html'},
                7: {'src': 'https:////upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Liquid_oxygen_in_a_beaker_4.jpg/250px-Liquid_oxygen_in_a_beaker_4.jpg', 'href': 'Кислород.html'},
                8: {'src': 'https:////upload.wikimedia.org/wikipedia/commons/thumb/e/e9/SiliconCroda.jpg/250px-SiliconCroda.jpg', 'href': 'Кремний.html'},
                9: {'src': 'https:////upload.wikimedia.org/wikipedia/commons/thumb/8/82/Helium_discharge_tube.jpg/250px-Helium_discharge_tube.jpg', 'href': 'Гелий.html'},
                10: {'src': 'https:////upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Be-140g.jpg/250px-Be-140g.jpg', 'href': 'Бериллий.html'},
                11: {'src': 'https:////upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Diamond-and-graphite-with-scale.jpg/250px-Diamond-and-graphite-with-scale.jpg', 'href': 'Углерод.html'},
                12: {'src': 'https:////upload.wikimedia.org/wikipedia/commons/thumb/2/27/Na_%28Sodium%29.jpg/250px-Na_%28Sodium%29.jpg', 'href': 'Натрий.html'},
                13: {'src': 'https:////upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Magnesium_crystals.jpg/250px-Magnesium_crystals.jpg', 'href': 'Магний.html'},
                14: {'src': 'https:////upload.wikimedia.org/wikipedia/commons/thumb/8/88/PhosphComby.jpg/250px-PhosphComby.jpg', 'href': 'Фосфор.html'},
                15: {'src': 'https:////upload.wikimedia.org/wikipedia/commons/thumb/4/44/Sulfur-sample.jpg/250px-Sulfur-sample.jpg', 'href': 'Сера.html'},
                16: {'src': 'https:////upload.wikimedia.org/wikipedia/commons/thumb/7/78/Chlorine_liquid_in_an_ampoule.jpg/250px-Chlorine_liquid_in_an_ampoule.jpg', 'href': 'Хлор.html'},
                17: {'src': 'https:////upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Potassium.JPG/250px-Potassium.JPG', 'href': 'Калий.html'},
                18: {'src': 'https:////upload.wikimedia.org/wikipedia/commons/thumb/9/96/Calcium_unter_Argon_Schutzgasatmosph%C3%A4re.jpg/250px-Calcium_unter_Argon_Schutzgasatmosph%C3%A4re.jpg', 'href': 'Кальций.html'}
            }

let prevElem = 0
let nextElem = 4
let images_length = 19

let left_arrow = document.getElementsByClassName('left_arrow')[0]
let right_arrow = document.getElementsByClassName('right_arrow')[0]
let galary = document.getElementsByClassName('galary')[0]
let galary_childs = galary.children

let canClick = true

left_arrow.onclick = () =>{
    if (canClick){
        canClick = false
        //меняю значения следующего и предыдущего элементов
        nextElem += 1
        prevElem += 1
        if(nextElem > images_length-1) nextElem = 0
        if (prevElem > images_length-1) prevElem = 0

        let src = images[nextElem]['src']
        let href = images[nextElem]['href']
        //двигаю детей
        setTimeout(() => {
            for(i=0; i< galary_childs.length; i++){
                //сдвигаю детей
                if (window.innerWidth > 1100)
                    galary_childs[i].style.transform = 'translate(-150px, 0px)'
                else if (window.innerWidth > 700)
                    galary_childs[i].style.transform = 'translate(-65px, 0px)'
                else
                    galary_childs[i].style.transform = 'translate(-35px, 0px)'

                if(i == 0){
                    galary_childs[i].classList.remove('in_galary')
                    console.log(galary_childs[i].classList)
                }
            }
        }, 10)
        //удаляю первого ребенка
        setTimeout(() => {
            // galary_childs[0].style.transform = 'scale(0.01)'
            galary_childs[0].style.width = '0px'
        }, 100)
        setTimeout(() => {
            galary_childs[0].remove()
        }, 400)

        //двигаю детей обратно
        setTimeout(() => {
            for(i=0; i< galary_childs.length; i++){
                galary_childs[i].style.transform = 'translate(0px, 0px)'
            }
        }, 400)

        //создание нового элемента
        setTimeout(() => {
            let div = document.createElement('div')
            div.className = 'galary_item'

            let a = document.createElement('a')
            a.href = href

            let img = document.createElement('img')
            img.src = src
            
            a.appendChild(img)
            div.appendChild(a)

            galary.appendChild(div)
            galary_childs[5].style.width = '0px'
        },0)

        //делаю так, что бы элемент постепенно появлялся
        setTimeout(() => {
            galary_childs[5].style.width = ''
            galary_childs[5].className = 'galary_item in_galary'
        }, 10)
        
        setTimeout(() => {
            canClick = true
        }, 500)
    }
}

right_arrow.onclick = () =>{
    if (canClick){
        nextElem -= 1
        prevElem -= 1
        if(nextElem < 0) nextElem = 18
        if (prevElem < 0) prevElem = 18
        let src = images[prevElem]['src']
        let href = images[prevElem]['href']
        console.log(href)
        console.log([prevElem, nextElem])
        //двигаю детей
        setTimeout(() => {
            for(i=0; i< galary_childs.length; i++){
                //сдвигаю детей
                if (window.innerWidth > 1100)
                    galary_childs[i].style.transform = 'translate(150px, 0px)'
                else if (window.innerWidth > 700)
                    galary_childs[i].style.transform = 'translate(65px, 0px)'
                else
                    galary_childs[i].style.transform = 'translate(35px, 0px)'

                if(i == galary_childs.length-1){
                    galary_childs[i].classList.remove('in_galary')
                    console.log(galary_childs[i].classList)
                }
            }
        }, 10)
        //удаляю последнего ребенка
        setTimeout(() => {
            galary_childs[galary_childs.length-1].style.width = '0px'
        }, 100)
        setTimeout(() => {
            galary_childs[galary_childs.length-1].remove()
        }, 400)

        //двигаю детей обратно
        setTimeout(() => {
            for(i=0; i< galary_childs.length; i++){
                galary_childs[i].style.transform = 'translate(0px, 0px)'
            }
        }, 400)

        //создание нового элемента
        setTimeout(() => {
            let div = document.createElement('div')
            div.className = 'galary_item'

            let a = document.createElement('a')
            a.href = href

            let img = document.createElement('img')
            img.src = src
            
            a.appendChild(img)
            div.appendChild(a)

            first_child = galary.children[0]

            galary.insertBefore(div, first_child)
            galary_childs[0].style.width = '0px'
        },0)

        //делаю так, что бы элемент постепенно появлялся
        setTimeout(() => {
            galary_childs[0].style.width = ''
            galary_childs[0].className = 'galary_item in_galary'
        }, 10)

        setTimeout(() => {
            canClick = true
        }, 500)
    }
}
