import * as React from 'react';
import styles from './Rss.module.scss';
import { INewsList, IRssProps } from './IRssProps';
import axios from 'axios';
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
        this.setState({ items: items });
        break;
      default:
        this.setState({ items: items });
        break;
    }
  }

  componentDidMount() {
    let service = new RSSDataService();
    service.fetchDataFromRssFeed().then(items => {
      let itemlenght = items.length;
      this.setState({ items: items });
      this._udateState(items, itemlenght);
    });
    this.interval = setInterval(() => this.loadNewData(), 1800000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  public async loadNewData() {
    try {
      let service = new RSSDataService();
      service.fetchDataFromRssFeed().then(items => {
        let itemlenght = items.length;
        this.setState({ items: items });
        this._udateState(items, itemlenght);
      });
    } catch (error) {
    }
  }

  private ShowNews = (url) => {
    window.location.href = url;
  }

  public render(): React.ReactElement<IRssProps> {
    let news = this.state.items.map((item, index) => {
      return (
        <div onClick={this.ShowNews.bind(this, item.url)} className={styles.NewsItems}>
          <li className={styles.Card} key={index} >
            <div className={styles.CardItem1}>
              <img
                onClick={this.ShowNews.bind(this, item.url)}
                className={styles.CardImage} src={item.imageUrl}
                alt={item.title.substr(0, 10) + '. . .'} />
            </div>
            <div className={styles.CardItem2}>
              <h5>{item.pubDate}</h5>
              <h3
                className={styles.NewsTitle}>{item.title}</h3>
              <h4>{item.description}</h4>
            </div>
          </li>
        </div>
      )
    });

    return (
      <section>
        <h3>RSS News</h3>
        <ul className={styles.Cards}>
          {news}
        </ul>
      </section>
    );
  }
}
