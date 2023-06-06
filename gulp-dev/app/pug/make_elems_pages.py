import requests
from bs4 import BeautifulSoup
import re


def make_elem_page(elem_arr):
    for elem in elem_arr:
        print(elem)
        print(elem_arr[elem])
    for  elem in elem_arr:
        string = f'include templates.pug\n\
<!DOCTYPE html>\n\
html\n\
  head\n\
    meta(charset="UTF-8")\n\
    meta(name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no")\n\
    title\n\
    link(rel="stylesheet", href="css/bootstrap-reboot.min.css")\n\
    link(rel="stylesheet", href="css/elemp_style.css")\n\
  body\n\
    +CreateMenu("elem")\n\
    h1 {elem}\n\
    table \n\
        thead \n\
        tbody\n'
        for data in elem_arr[elem]:
            string += f'\
          tr \n\
            td {data}\n\
            td {elem_arr[elem][data]}\n'
            with open(f'gulp main site/gulp-dev/app/pug/{elem}.pug', 'w+') as file:
                file.write(string)
    print('изменение файлов завершено!')


url = 'https://table-mendeleev.ru/'

req = requests.get(url)

soup = BeautifulSoup(req.text, 'lxml')
soup = soup.find_all(class_='elemItem')
soup = str(soup)
soup = BeautifulSoup(soup, 'lxml')
soup = soup.find_all('a')
soup = set(soup)

link_arr = []

soup= sorted(soup, key=lambda x: x['href'][-7:-4])
for i in soup:
    link_arr.append('https://table-mendeleev.ru/' + i['href'])

pattern = '\D'
repl = ''

link_arr = list(set(link_arr))
link_arr = sorted(link_arr, key=lambda x: int(re.sub(pattern,repl,x)))

obj_arr = {}
#выкачиваю данные о каждом элементе
for i in link_arr:
    req = requests.get(i)
    soup = BeautifulSoup(req.text, 'lxml')

    #выкачиваю имя элемента
    elem_name = soup.find('h1')
    elem_name = elem_name.text.split(' ')[3]

    soup = soup.find('table')

    rg = r'<td>.*?</td>'
    soup = str(soup).replace('\n', '').replace('\t', '').replace('\r','')

    #массив характеристик элемента
    arr_elem = re.findall(rg, soup)
    #print(arr_elem)
    #элемент
    obj = {}
    for i in range(0,len(arr_elem)-2, 2):
        obj[arr_elem[i].replace('<td></td>',' ').replace('<td>', '').replace('</td>', '')] = arr_elem[i+1].replace('<td>', '').replace('</td>', '')
    
    obj_arr[elem_name] = obj

make_elem_page(obj_arr)

# with open('/home/kirill/Рабочий стол/gulp/gulp main site/gulp-dev/app/pug/elem_pages/textelem.pug','w+') as file:
