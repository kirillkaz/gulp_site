from bs4 import BeautifulSoup

def getImages(filename):
    with open('gulp main site/gulp-dev/app/pug/html_images.txt', 'r') as file:
        string = file.read()

        soup = BeautifulSoup(string, 'lxml')
        soup = soup.findAll('li')
        images = BeautifulSoup(str(soup), 'lxml').findAll('img')
        
        images = [i['src'] for i in images]
        for i in images:
            print(i)

if __name__ == '__main__':
    getImages('sasdf')