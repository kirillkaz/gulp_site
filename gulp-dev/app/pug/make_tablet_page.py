from bs4 import BeautifulSoup


def getData(filename:str):
    with open(filename, 'r') as file:
        string = file.read()
        soup = BeautifulSoup(string, 'lxml')
        soup = soup.findAll('table')[2]
        soup = str(soup).replace('<table>','').replace('</table>', '') \
        .replace('\n', '').replace('<tr>', '').split('</tr>')

        soup.pop(0)

        soup = [i.replace('</td>', '').replace('<td>', '', 1).split('<td>') for i in soup]
        soup = [soup[i] for i in range(0, 118)]

        return soup


def makeTabletPage(data):
    string = 'include templates.pug\n\
<!DOCTYPE html>\n\
html\n\
  head\n\
    meta(charset="UTF-8")\n\
    meta(name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no")\n\
    title\n\
    link(rel="stylesheet", href="css/bootstrap-reboot.min.css")\n\
    link(rel="stylesheet", href="css/table_style.css")\n\
    script(src="http://d3js.org/d3.v7.js")\n\
  body\n\
    +CreateMenu("table")\n\
    form\n\
      div(class="filter_block")\n\
        span(class="bold_element") Фильтрация таблицы:\n\
        div(class="minMaxMass_block")\n\
          label\n\
            span Минимальная атомная масса:\n\
            input(value=0 type="number")\n\
          br\n\
          label\n\
            span Максимальная атомная масса:\n\
            input(value=300 type="number")\n\
        div(class="viewClassOfElements")\n\
          span Отображаемый класс элементов:\n\
          label\n\
            span(class="viewClassOfElements_item") Обычные элементы\n\
            input(type="checkbox" name="common" checked)\n\
          label\n\
            span(class="viewClassOfElements_item") Лантаноиды\n\
            input(type="checkbox" name="lantan" checked)\n\
          label\n\
            span(class="viewClassOfElements_item") Актиноиды\n\
            input(type="checkbox" name="actin" checked)\n\
        div(class="viewElements_block")\n\
          span Отображаемые элементы:\n\
          select\n\
            option Все элементы\n\
            option Элементы с полными данными\n\
        input(type="button" value="Фильтровать" onclick="Filter()" class="blueButton")\n\
        input(type="button" value="Сбросить фильтрацию" onclick="resetFilter()" class="redButton")\n\
      div(class="selectSort_block")\n\
        span(class="bold_element") Сортировка таблицы:\n\
        label\n\
          span(class="sortText") Поле для сортировки в первую очередь:\n\
          select\n\
            option -------\n\
            option №\n\
            option Название\n\
            option Период\n\
            option Группа\n\
            option Атомная масса\n\
            option Плотность\n\
            option Температура плавления\n\
            option Температура кипения\n\
          span(class="sortText") Порядок сортировки:\n\
          select\n\
            option По возрастанию\n\
            option По убыванию\n\
        label\n\
          span(class="sortText") Поле для сортировки во вторую очередь:\n\
          select\n\
            option -------\n\
            option №\n\
            option Название\n\
            option Период\n\
            option Группа\n\
            option Атомная масса\n\
            option Плотность\n\
            option Температура плавления\n\
            option Температура кипения\n\
          span(class="sortText") Порядок сортировки:\n\
          select\n\
            option По возрастанию\n\
            option По убыванию\n\
        input(type="button" value="Сортировать таблицу" class="blueButton" onclick="SortTable()")\n\
        input(type="button" value="Сбросить сортировку" class="redButton" onclick="resetSort()")\n\
      details(class="graph")\n\
        summary Построить график:\n\
        table(class="graph_table")\n\
          tr\n\
            td по оси ОХ\n\
            td по оси OY\n\
          tr\n\
            td\n\
              label Период\n\
              input(name="ox" type="radio" value="period" checked)\n\
            td\n\
              input(name="oy" type="radio" value="temp_kip" checked)\n\
              label Температура кипения\n\
          tr\n\
            td\n\
              label Группа\n\
              input(name="ox" type="radio" value="group")\n\
            td\n\
              input(name="oy" type="radio" value="temp_plav")\n\
              label Температура плавления\n'
    
    string+='\
    table(class="main_table")\n\
      tr\n\
        th №\n\
        th Название\n\
        th Символ\n\
        th Латинское название\n\
        th Период\n\
        th Группа\n\
        th Атомная масса\n\
        th Плотность\n\
        th Температура плавления\n\
        th Температура кипения\n\
        th Класс элемента\n'
    for i in data:
      string+=f'\
      tr\n\
        td {i[0]}\n\
        td {i[1]}\n\
        td {i[2]}\n\
        td {i[3]}\n\
        td {i[4]}\n\
        td {i[5]}\n\
        td {i[6]}\n\
        td {i[7]}\n\
        td {i[8]}\n\
        td {i[9]}\n'
      if int(i[0]) > 57 and int(i[0]) < 72:
        string+='\
        td Лантаноид\n'
      elif int(i[0]) > 89 and int(i[0]) < 104:
        string+='\
        td Актиноид\n'
      else:
        string+='\
        td Обычный\n'
    string+='\
    script(src="js/sort.js")'

    with open('gulp main site/gulp-dev/app/pug/table.pug', 'w+') as file:
        file.write(string)


if __name__ == '__main__':
    data = getData('gulp main site/gulp-dev/app/pug/tablet.txt')
    makeTabletPage(data)