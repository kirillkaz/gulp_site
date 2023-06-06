def main():
    arr = []
    elems_arr = []
    csv_arr = []

    with open ('/home/kirill/Рабочий стол/gulp/gulp main site/gulp-dev/app/pug/index.pug') as file:
        page = file.read()
        arr = page.split('\n')


    for i in arr:
        if 'CreateElementBlock' in i:
            elems_arr.append(i.strip().replace('"','').replace(' ','')[20:-1].split(','))
    
    for i in elems_arr:
        if int(i[1]) >= 58 and int(i[1]) <= 71:
            csv_arr.append(['latinoid',i[0],i[1],i[2],i[3]])
        elif int(i[1]) >= 90 and int(i[1]) <= 103:
            csv_arr.append(['actinoid',i[0],i[1],i[2],i[3]])
        else:
            csv_arr.append(['common',i[0],i[1],i[2],i[3]])
    
    with open('/home/kirill/Рабочий стол/gulp/gulp main site/gulp-dev/app/pug/elem_info.csv','w') as file:
        for i in csv_arr:
            string = ','.join(i)
            file.write(string+'\n')
            print(string)


if __name__ == '__main__':
    main()