import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';

import * as strings from 'RssWebPartStrings';
import Rss from './components/Rss';
import { IRssProps } from './components/IRssProps';

export interface IRssWebPartProps {
  description: string;
  newsItems: string;
}

export default class RssWebPart extends BaseClientSideWebPart<IRssWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRssProps > = React.createElement(
      Rss,
      {
        description: this.properties.description,
        newsItems: this.properties.newsItems
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown('newsItems',{
                  label: 'Number of news to show',
                  options: [
                    {key: 'Item1', text: '3'},
                    {key: 'Item2', text: '5'},
                    {key: 'Item3', text: '10'},
                    {key: 'Item4', text: '15'},
                    {key: 'Item5', text: 'All'},
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
