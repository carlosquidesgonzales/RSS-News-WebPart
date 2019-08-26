import * as React from 'react';
import styles from './Rss.module.scss';
import { INewsList, IRssProps } from './IRssProps';
import { RSSDataService } from './RssService';


export interface IRssState {
  items: INewsList[];
  time: any;
}

export default class Rss extends React.Component<IRssProps, IRssState> {
  interval: number;
  constructor(props: IRssProps) {
    super(props);
    this.state = {
      items: [],
      time: null
    };

  }

  private _udateState = (items, itemlenght) => {
    const { newsItems } = this.props;
    const listItems = [...this.state.items];

    switch (newsItems) {
      case "Item1":
        listItems.splice(3, itemlenght);
        this.setState({ items: listItems });
        break;
      case "Item2":
        listItems.splice(5, itemlenght);
        this.setState({ items: listItems });
        break;
      case "Item3":
        listItems.splice(10, itemlenght);
        this.setState({ items: listItems });
        break;
      case "Item4":
        listItems.splice(15, itemlenght);
        this.setState({ items: listItems });
        break;
      case "Item5":
      default:
        this.setState({ items: items });
        break;
    }
    console.log(items);
  }

  componentDidMount() {
    const service = new RSSDataService();
    const aftonBladet = "https://www.aftonbladet.se/rss.xml";
    const svt = "https://www.svt.se/nyheter/rss.xml";
    const idg = "https://www.idg.se/rss/mobil+it";
    const svtStockholm = "https://www.retriever-info.com/feed/2009163/rss-feed-hemsida/index.xml";

    let { newsSource } = this.props;
    console.log(newsSource);
    switch (newsSource) {
      case "Source1":
        service.fetchDataFromRssFeed(aftonBladet, "Aftonbladet").then(items => {
          let itemlenght = items.length;
          this.setState({ items: items });
          this._udateState(items, itemlenght);
        });
        this._timeInterval();
        // this.interval = setInterval(() => this.loadNewData(), 900000);
        break;
      case "Source2":
        service.fetchDataFromRssFeed(svt, "SVT").then(items => {
          let itemlenght = items.length;
          this.setState({ items: items });
          this._udateState(items, itemlenght);
        });
        this._timeInterval();
        // this.interval = setInterval(() => this.loadNewData(), 900000);
        break;
      case "Source3":
        service.fetchDataFromRssFeed(svtStockholm, "SVT STOCKHOLM").then(items => {
          let itemlenght = items.length;
          this.setState({ items: items });
          this._udateState(items, itemlenght);
        });
        this._timeInterval();
        // this.interval = setInterval(() => this.loadNewData(), 900000);
        break;
      case "Source4":
      default:
        service.fetchDataFromRssFeed(idg, "IDG").then(items => {
          let itemlenght = items.length;
          this.setState({ items: items });
          this._udateState(items, itemlenght);
        });
        // this.interval = setInterval(() => this.loadNewData(), 900000);
        this._timeInterval();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  private _timeInterval = () =>{
    this.interval = setInterval(() => this.loadNewData(), 900000);
  }
  public async loadNewData() {
    try {
      let service = new RSSDataService();
      const aftonBladet = "https://www.aftonbladet.se/rss.xml";
      const svt = "https://www.svt.se/nyheter/rss.xml";
      const idg = "https://www.idg.se/rss/mobil+it";
      const svtStockholm = "https://www.retriever-info.com/feed/2009163/rss-feed-hemsida/index.xml";
      let { newsSource } = this.props;

      switch (newsSource) {
        case "Source1":
          service.fetchDataFromRssFeed(aftonBladet, "Aftonbladet").then(items => {
            let itemlenght = items.length;
            this.setState({ items: items });
            this._udateState(items, itemlenght);
          });
          break;
        case "Source2":
          service.fetchDataFromRssFeed(svt, "SVT").then(items => {
            let itemlenght = items.length;
            this.setState({ items: items });
            this._udateState(items, itemlenght);
          });
          break;
        case "Source3":
          service.fetchDataFromRssFeed(svt, "SVT STOCKHOLM").then(items => {
            let itemlenght = items.length;
            this.setState({ items: items });
            this._udateState(items, itemlenght);
          });
          break;
        case "Source4":
        default:
          service.fetchDataFromRssFeed(idg, "IDG").then(items => {
            let itemlenght = items.length;
            this.setState({ items: items });
            this._udateState(items, itemlenght);
          });
          break;
      }
    } catch (error) {
    }
  }

  private ShowNews = (url) => {
    window.open(url, "_blank");
  }

  public render(): React.ReactElement<IRssProps> {
    let newsSource;
    switch (this.props.newsSource) {
      case "Source1":
        newsSource = "Aftonbladet"
        break;
      case "Source2":
        newsSource = "SVT Nyheter"
        break;
      case "Source3":
        newsSource = "SVT Nyheter Stockholm"
        break;
      case "Source4":
      default:
        newsSource = "IDG"
    }

    let news = this.state.items.map((item, index) => {
      return (
        <div onClick={this.ShowNews.bind(this, item.url)} className={styles.NewsItems}>
          <li className={styles.Card} key={index} >
            <div className={styles.CardItemsContainer}>
              <div className={styles.CardItem1}>
                {item.imageUrl != '' ? <div className={styles.ImageContainer}><img
                  onClick={this.ShowNews.bind(this, item.url)}
                  className={styles.CardImage} src={item.imageUrl}
                  alt={item.title.substr(0, 10) + '. . .'} /> </div> : null}
              </div>
              <div className={styles.CardItem2}>
                <div className={styles.PubDate}>{item.pubDate}</div>
                <div className={styles.NewsTitle}>{item.title}</div>
                <div className={styles.Description}>{item.description.length > 150 ? item.description.slice(0, 100) + ". . ." : item.description}</div>
              </div>
            </div>
          </li>
        </div>
      )
    });

    return (
      <section>
        <h3>RSS News From {newsSource}</h3>
        <ul className={styles.Cards}>
          {news}
        </ul>
      </section>
    );
  }
}
