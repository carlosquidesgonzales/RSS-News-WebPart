import { INewsList, IRssProps } from './IRssProps';
import axios from 'axios';

export class RSSDataService {
  public fetchDataFromRssFeed(sourceURL, sourceName): Promise<INewsList[]> {
    let xml = 'https://www.idg.se/rss/mobil+it';
    console.log(sourceURL);
    return axios.get('https://cors-anywhere.herokuapp.com/' + sourceURL)
      .then(response => {
        let xmls = new DOMParser().parseFromString(response.data, "text/xml");
        let itemlenght = xmls.getElementsByTagName("item").length;
        let item = xmls.getElementsByTagName("item");
        let newItems = [];
        let pubDate;

        switch (sourceName) {
          case "Aftonbladet":
          for (var i = 0; i < itemlenght; i++) {
            let description = item[i].getElementsByTagName('description')[0].childNodes[0].nodeValue;
            let imageUrl = description.substring(description.indexOf('"') + 1, description.lastIndexOf('"') - 1);
            pubDate = item[i].getElementsByTagName('pubDate')[0].childNodes[0].nodeValue;
            newItems.push({
              'title': item[i].getElementsByTagName('title')[0].childNodes[0].nodeValue,
              'description': '',
              'url': item[i].getElementsByTagName('link')[0].childNodes[0].nodeValue,
              'pubDate': pubDate.substr(0, 16),
              'imageUrl': imageUrl
            });
          }
            break;
          case "SVT":
          case "SVT STOCKHOLM":
          for (var i = 0; i < itemlenght; i++) {
            pubDate = item[i].getElementsByTagName('pubDate')[0].childNodes[0].nodeValue;
            newItems.push({
              'title': item[i].getElementsByTagName('title')[0].childNodes[0].nodeValue,
              'description': item[i].getElementsByTagName('description')[0].textContent,
              'url': item[i].getElementsByTagName('link')[0].childNodes[0].nodeValue,
              'pubDate': pubDate.substr(0, 16),
              'imageUrl': 'data:image/png;base64,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'
            });
          }
            break;
          case "IDG":
          for (var i = 0; i < itemlenght; i++) {
            let description = item[i].getElementsByTagName('description')[0].childNodes[0].nodeValue;
            let imageUrl = description.substring(description.indexOf('"') + 1, description.lastIndexOf('.jpg')+4);
            let newDesc = description.substring(description.lastIndexOf(">") + 1, description.lastIndexOf(".") + 1);
            pubDate = item[i].getElementsByTagName('pubDate')[0].childNodes[0].nodeValue;
            newItems.push({
              'title': item[i].getElementsByTagName('title')[0].childNodes[0].nodeValue,
              // 'author': item[i].getElementsByTagName('author')[0].childNodes[0].nodeValue,
              'description': newDesc,
              'url': item[i].getElementsByTagName('link')[0].childNodes[0].nodeValue,
              'pubDate': pubDate.substr(0, 16),
              'imageUrl': imageUrl
            });
          }
        }
   
        return newItems
      });

  }
}