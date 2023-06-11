const getElementsFromTable = () => {
    let table = document.getElementsByClassName('main_table')
    let trs = table[0].getElementsByTagName('tr')
    let elements = []

    for (let i = 1; i<trs.length; i++){
        let element = {}
        element[trs[0].children[0].innerHTML] = trs[i].children[0].innerHTML
        element[trs[0].children[1].innerHTML] = trs[i].children[1].innerHTML
        element[trs[0].children[2].innerHTML] = trs[i].children[2].innerHTML
        element[trs[0].children[3].innerHTML] = trs[i].children[3].innerHTML
        element[trs[0].children[4].innerHTML] = trs[i].children[4].innerHTML
        element[trs[0].children[5].innerHTML] = trs[i].children[5].innerHTML
        element[trs[0].children[6].innerHTML] = trs[i].children[6].innerHTML
        element[trs[0].children[7].innerHTML] = trs[i].children[7].innerHTML
        element[trs[0].children[8].innerHTML] = trs[i].children[8].innerHTML
        element[trs[0].children[9].innerHTML] = trs[i].children[9].innerHTML
        element[trs[0].children[10].innerHTML] = trs[i].children[10].innerHTML
        element['display'] = trs[i].style.display
        elements.push(element)
    }
    return elements
}

const getClassElems = (elemClass) => {
    let result = []

    let table = document.getElementsByClassName('main_table')
    let trsElements = table[0].getElementsByTagName('tr')

    for (let i = 1; i<trsElements.length; i++){
        curElemClass = trsElements[i].children[10].innerHTML
        if (curElemClass == elemClass) result.push(trsElements[i])
    }
    return result
}

const Filter = () =>{
    let minMaxFields = document.getElementsByClassName('minMaxMass_block')
    minMaxFields = minMaxFields[0].getElementsByTagName('input')
    minMaxFields = [Number(minMaxFields[0].value), Number(minMaxFields[1].value)]
    
    if (minMaxFields[0] > minMaxFields[1]){
        alert('Ошибка! Минимальная атомная масса не может быть больше максимальной!')
        return
    }

    let table = document.getElementsByClassName('main_table')
    let trsElements = table[0].getElementsByTagName('tr')

    //фильтрация по максимальной и минимальной атомной массе
    for (let i = 1; i<trsElements.length; i++){
        let mass = Number(trsElements[i].children[6].innerHTML)

        if (mass < minMaxFields[0] || mass > minMaxFields[1])
            trsElements[i].style.display = 'none'
        else
            trsElements[i].style.display = ''
    }

    let chechedClassElements = document.getElementsByClassName('viewClassOfElements')[0]
    chechedClassElements = chechedClassElements.getElementsByTagName('input')
    chechedClassElements = [chechedClassElements[0].checked, chechedClassElements[1].checked, chechedClassElements[2].checked]
    
    //фильтрация по классу элемента
    let commonElems = getClassElems('Обычный')
    let lantans = getClassElems('Лантаноид')
    let actins = getClassElems('Актиноид')

    if (chechedClassElements[0] == false){
        for (i of commonElems) i.style.display = 'none'
    }

    if (chechedClassElements[1] == false){
        for (i of lantans) i.style.display = 'none'
    }

    if (chechedClassElements[2] == false){
        for (i of actins) i.style.display = 'none'
    }

    //фильтрация элементов по наличию в нем всех данных
    let voidDataSection = document.getElementsByClassName('viewElements_block')[0]
    voidDataSection = voidDataSection.getElementsByTagName('select')[0]
    
    if (voidDataSection.value == 'Элементы с полными данными'){
        for (let i = 1; i<trsElements.length; i++){
            childs = trsElements[i].children
            for (let j of childs){
                if (j.innerHTML == ' '){
                    trsElements[i].style.display = 'none'
                    break
                }
            }
        }
    }

}

const resetFilter = () => {
    let table = document.getElementsByClassName('main_table')

    let minMaxFields = document.getElementsByClassName('minMaxMass_block')
    minMaxFields = minMaxFields[0].getElementsByTagName('input')
    minMaxFields[0].value = 0
    minMaxFields[1].value = 300

    let chechedClassElements = document.getElementsByClassName('viewClassOfElements')[0]
    chechedClassElements = chechedClassElements.getElementsByTagName('input')
    chechedClassElements[0].checked = true
    chechedClassElements[1].checked = true
    chechedClassElements[2].checked = true

    let voidDataSection = document.getElementsByClassName('viewElements_block')[0]
    voidDataSection = voidDataSection.getElementsByTagName('select')[0]
    voidDataSection.value = 'Все элементы'
    
    Filter()
}

const sortNumbers = (numbers, field) => {
    return numbers.sort((a, b) => Number(a[field]) - Number(b[field]));
}

const sortStrings = (objects, field) =>{
    return objects.sort((a, b) => a[field].localeCompare(b[field]));
}

const sortNumbersDesc = (numbers, field) => {
    return numbers.sort((a, b) => Number(b[field]) - Number(a[field]));
}

const sortStringsDesc = (objects, field) =>{
    return objects.sort((a, b) => b[field].localeCompare(a[field]));
}

const SortTable = () =>{
    let voidDataSections = document.getElementsByTagName('select')
    let field1 = voidDataSections[1].value
    let field2 = voidDataSections[3].value

    let elements = getElementsFromTable()
    let result = []

    if (field1 == '-------' && field2 == '-------'){
        alert('Ошибка! Вы не выбрали поля для сортировки!')
        return
    }
    
    //сделать нормально(потом)
    //сортирую элементы таблицы
    if(field2 != '-------'){    
        let sortDir = voidDataSection[4].value
        if (sortDir == 'По возрастанию'){
            if (isNaN(Number(elements[0][field2]))) result = sortStrings(elements, field2)
            else result = sortNumbers(elements, field2)
        }
        else{
            if (isNaN(Number(elements[0][field2]))) result = sortStringsDesc(elements, field2)
            else result = sortNumbersDesc(elements, field2)
        }
    }

    if(field1 != '-------'){
        if (result.length == 0) result = elements
        let sortDir = voidDataSection[2].value
        if (sortDir == 'По возрастанию'){
            if (isNaN(Number(elements[0][field1]))) result = sortStrings(result, field1)
            else result = sortNumbers(result, field1)
        }
        else{
            if (isNaN(Number(elements[0][field1]))) result = sortStringsDesc(result, field1)
            else result = sortNumbersDesc(result, field1) 
        }
    }

    let table = document.getElementsByClassName('main_table')
    let elemsOfTable = table[0].getElementsByTagName('tr')

    for (let i = 1; i < elemsOfTable.length; i++){
        elemsOfTable[i].children[0].innerHTML = result[i-1]['№']
        elemsOfTable[i].children[1].innerHTML = result[i-1]['Название']
        elemsOfTable[i].children[2].innerHTML = result[i-1]['Символ']
        elemsOfTable[i].children[3].innerHTML = result[i-1]['Латинское название']
        elemsOfTable[i].children[4].innerHTML = result[i-1]['Период']
        elemsOfTable[i].children[5].innerHTML = result[i-1]['Группа']
        elemsOfTable[i].children[6].innerHTML = result[i-1]['Атомная масса']
        elemsOfTable[i].children[7].innerHTML = result[i-1]['Плотность']
        elemsOfTable[i].children[8].innerHTML = result[i-1]['Температура плавления']
        elemsOfTable[i].children[9].innerHTML = result[i-1]['Температура кипения']
        elemsOfTable[i].children[10].innerHTML = result[i-1]['Класс элемента']
        elemsOfTable[i].style.display = result[i-1]['display']
    }
    return
}

//сброс сортировки
const resetSort = () =>{
    let elements = getElementsFromTable()

    elements = sortNumbers(elements, '№')
    let table = document.getElementsByClassName('main_table')
    let elemsOfTable = table[0].getElementsByTagName('tr')

    for (let i = 1; i < elemsOfTable.length; i++){
        elemsOfTable[i].children[0].innerHTML = elements[i-1]['№']
        elemsOfTable[i].children[1].innerHTML = elements[i-1]['Название']
        elemsOfTable[i].children[2].innerHTML = elements[i-1]['Символ']
        elemsOfTable[i].children[3].innerHTML = elements[i-1]['Латинское название']
        elemsOfTable[i].children[4].innerHTML = elements[i-1]['Период']
        elemsOfTable[i].children[5].innerHTML = elements[i-1]['Группа']
        elemsOfTable[i].children[6].innerHTML = elements[i-1]['Атомная масса']
        elemsOfTable[i].children[7].innerHTML = elements[i-1]['Плотность']
        elemsOfTable[i].children[8].innerHTML = elements[i-1]['Температура плавления']
        elemsOfTable[i].children[9].innerHTML = elements[i-1]['Температура кипения']
        elemsOfTable[i].children[10].innerHTML = elements[i-1]['Класс элемента']
        elemsOfTable[i].style.display = elements[i-1]['display']
    }
    return
}


//делаю так, что бы у меня исчезали одинаковые варианты в select
let voidDataSection = document.getElementsByTagName('select')
voidDataSection[3].onfocus = () =>{
    let voidDataSections = document.getElementsByTagName('select')
    let field1 = voidDataSections[1].value

    let hideOption = voidDataSections[3].getElementsByTagName('option')
    for (let i of hideOption){
        if (i.innerHTML == field1 && i.innerHTML!='-------') i.style.display = 'none'
        else i.style.display = ''
    }
}

voidDataSection[1].onfocus = () =>{
    let voidDataSections = document.getElementsByTagName('select')
    let field1 = voidDataSections[3].value

    let hideOption = voidDataSections[1].getElementsByTagName('option')
    for (let i of hideOption){
        if (i.innerHTML == field1 && i.innerHTML!='-------') i.style.display = 'none'
        else i.style.display = ''
    }
}  