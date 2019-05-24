import { INewsList, IRssProps } from './IRssProps';
import axios from 'axios';

export class RSSDataService {
    public fetchDataFromRssFeed(): Promise<INewsList[]> {
        let xml = 'https://www.idg.se/rss/mobil+it';
        
        return axios.get('https://cors-anywhere.herokuapp.com/' + xml)
          .then(response => {
            let xmls = new DOMParser().parseFromString(response.data, "text/xml");
            let itemlenght = xmls.getElementsByTagName("item").length;
            let item = xmls.getElementsByTagName("item");
            let newItems = [];
            let pubDate;
            for (var i = 0; i < itemlenght; i++) {
              let description = item[i].getElementsByTagName('description')[0].childNodes[0].nodeValue;
              let imageUrl = description.substring(description.indexOf('"') + 1, description.lastIndexOf('"') - 11);
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
    
           return newItems
          });
          
      }
}