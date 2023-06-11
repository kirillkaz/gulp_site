const getElementsFromArr = (arr, fieldOX, fieldOY) => {
    let elements = []
    let result_arr = []

    let fieldsOrds = {
        'Период': 4,
        'Группа' : 5,
        'Температура кипения' : 8,
        'Температура плавления' : 9
    }
    for (let i = 1; i < arr.length; i++){
        let element = {}
        element[arr[0].children[0].innerHTML] = arr[i].children[0].innerHTML
        element[arr[0].children[1].innerHTML] = arr[i].children[1].innerHTML
        element[arr[0].children[2].innerHTML] = arr[i].children[2].innerHTML
        element[arr[0].children[3].innerHTML] = arr[i].children[3].innerHTML
        element[arr[0].children[4].innerHTML] = arr[i].children[4].innerHTML
        element[arr[0].children[5].innerHTML] = arr[i].children[5].innerHTML
        element[arr[0].children[6].innerHTML] = arr[i].children[6].innerHTML
        element[arr[0].children[7].innerHTML] = arr[i].children[7].innerHTML
        element[arr[0].children[8].innerHTML] = arr[i].children[8].innerHTML
        element[arr[0].children[9].innerHTML] = arr[i].children[9].innerHTML
        element[arr[0].children[10].innerHTML] = arr[i].children[10].innerHTML
        elements.push(element)
    }
    //группирую и одновременно сортирую ось ох
    let groupOXField = d3.group(elements.sort((a,b) => Number(a[fieldOX]) - Number(b[fieldOX])), elem => elem[fieldOX])

    for (let elem of groupOXField){
        let minMax = d3.extent(elem[1].map(el => {if(el[fieldOY] != ' ') return Number(el[fieldOY])}))
        result_arr.push({
            'labelX': elem[0],
            'valueMin': minMax[0],
            'valueMax': minMax[1]
        })
    }
    console.log(result_arr)
    return result_arr
}

const drawGraph = () => {
    let minMaxMarkers = document.getElementsByClassName('minMaxSettings')[0]
    minMaxMarkers = minMaxMarkers.getElementsByTagName('input')
    minMaxMarkers = [minMaxMarkers[0].checked, minMaxMarkers[1].checked]

    let graphTypeMarker = document.getElementsByName('type')
    graphTypeMarker[0].checked == true ?
        graphTypeMarker = 'Точечная':
        graphTypeMarker = 'Столбчатая'

    let elem_trs = document.getElementsByClassName('main_table')[0]
    elem_trs = elem_trs.getElementsByTagName('tr')

    let raw_fields_ox = document.getElementsByName('ox')
    let raw_fields_oy = document.getElementsByName('oy')

    let fieldOX = ''
    let fieldOY = ''
    console.log(raw_fields_ox[0].checked)
    raw_fields_ox[0].checked == true ?
        fieldOX = 'Период':
        fieldOX = 'Группа'
    raw_fields_oy[0].checked == true ?
        fieldOY = 'Температура кипения':
        fieldOY = 'Температура плавления'
    

    let raw_elements = []
    for (let i = 0; i < elem_trs.length; i++)
        if (elem_trs[i].style.display == '')
        raw_elements.push(elem_trs[i])

    let elements = getElementsFromArr(raw_elements, fieldOX, fieldOY)

    //начальные параметры для svg
    let marginX = 50;
    let marginY = 50;
    let height = 400;
    let width = 800;

    let svg = d3.select("svg")
    .attr("height", height)
    .attr("width", width);
    console.log(svg)
    // очищаем svg перед построением
    svg.selectAll("*").remove();
    // определяем минимальное и максимальное значение по оси OY
    let min = d3.min(elements.map(d => Number(d.valueMin))) * 1.5;
    let max = d3.max(elements.map(d => Number(d.valueMax))) * 1.5;
    let xAxisLen = width - 2 * marginX;
    let yAxisLen = height - 2 * marginY;

    // определяем шкалы для осей
    let scaleX = d3.scaleBand()
    .domain(elements.map(function(d) {
    return d.labelX;})
    )
    .range([0, xAxisLen],1);

    let scaleY = d3.scaleLinear()
    .domain([min, max])
    .range([yAxisLen, 0]);

    // создаем оси
    let axisX = d3.axisBottom(scaleX); // горизонтальная
    let axisY = d3.axisLeft(scaleY);// вертикальная
    // отображаем ось OX, устанавливаем подписи оси ОX и угол их наклона
    svg.append("g")
    .attr("transform", `translate(${marginX}, ${height - marginY})`)
    .call(axisX)
    .attr("class", "x-axis")
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function (d) {
    return "rotate(-45)";
    });
    // отображаем ось OY
    svg.append("g")
    .attr("transform", `translate(${marginX}, ${marginY})`)
    .attr("class", "y-axis")
    .call(axisY);
    // создаем набор вертикальных линий для сетки
    d3.selectAll("g.x-axis g.tick")
    .append("line") // добавляем линию
    .classed("grid-line", true) // добавляем класс
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", - (yAxisLen));
    // создаем горизонтальные линии сетки
    d3.selectAll("g.y-axis g.tick")
    .append("line")
    .classed("grid-line", true)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", xAxisLen)
    .attr("y2", 0);

    if(graphTypeMarker == 'Точечная'){
        //вывод максимальных значений
        if (minMaxMarkers[1] == true){
            svg.selectAll(".dot")
            .data(elements)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", function(d) { return scaleX(d.labelX); })
            .attr("cy", function(d) { return scaleY(d.valueMax); })
            .attr("transform",
            `translate(${marginX + scaleX.bandwidth()/2}, ${marginY})`)
            .style("fill", "red")
        }
        if(minMaxMarkers[0] == true){
            //вывод минимальных значений
            svg.selectAll(".dot")
            .data(elements)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", function(d) { return scaleX(d.labelX); })
            .attr("cy", function(d) { return scaleY(d.valueMin); })
            .attr("transform",
            `translate(${marginX + scaleX.bandwidth()/2}, ${marginY})`)
            .style("fill", "blue")
        }
    }
    else{
        if (minMaxMarkers[1] == true){
            scaleX.padding(0.2)
            svg.selectAll(".rect")
            .data(elements)
            .enter()
            .append("rect")
            .attr("x", function(d) { return scaleX(d.labelX)})
            .attr("width", scaleX.bandwidth())
            .attr("y", function(d) { return scaleY(d.valueMax); })
            .attr("height", function(d) { return yAxisLen - scaleY(d.valueMax) })
            .attr("transform", `translate(${marginX}, ${marginY})`)
            .style("fill", "red")
        }

        if (minMaxMarkers[0] == true){
            scaleX.padding(0.2)
            svg.selectAll(".rect")
            .data(elements)
            .enter()
            .append("rect")
            .attr("x", function(d) { return scaleX(d.labelX)})
            .attr("width", scaleX.bandwidth())
            .attr("y", function(d) { return scaleY(d.valueMin); })
            .attr("height", function(d) { return yAxisLen - scaleY(d.valueMin) })
            .attr("transform", `translate(${marginX}, ${marginY})`)
            .style("fill", "blue")
        }
    }
}

const hideGraph = () => {}