import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneChoiceGroup,
  PropertyPaneCheckbox
} from '@microsoft/sp-webpart-base';

import * as strings from 'RssWebPartStrings';
import Rss from './components/Rss';
import { IRssProps } from './components/IRssProps';

export interface IRssWebPartProps {
  description: string;
  newsItems: string;
  newsSource: string;
  layoutOption: string;
}

export default class RssWebPart extends BaseClientSideWebPart<IRssWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRssProps> = React.createElement(
      Rss,
      {
        description: this.properties.description,
        newsItems: this.properties.newsItems,
        newsSource: this.properties.newsSource,
        layoutOption: this.properties.layoutOption
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
                PropertyPaneDropdown('newsSource', {
                  label: 'Choose a source',
                  options: [
                    { key: 'Source1', text: 'Aftonbladet' },
                    { key: 'Source2', text: 'SVT Nyheter' },
                    { key: 'Source3', text: 'SVT Nyheter Stockholm' },
                    { key: 'Source4', text: 'IDG' },
                  ]
                }),
                PropertyPaneDropdown('newsItems', {
                  label: 'Number of news to show',
                  options: [
                    { key: 'Item1', text: '3' },
                    { key: 'Item2', text: '5' },
                    { key: 'Item3', text: '10' },
                    { key: 'Item4', text: '15' },
                    { key: 'Item5', text: 'All' },
                  ]
                }),
                PropertyPaneChoiceGroup('layoutOption', {
                  label: 'Choose Desired Layout',
                  options: [
                    {
                      key: 'col1', text: '1 Column',
                      imageSrc: 'http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-8/256/Text-columns-icon.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-8/256/Text-columns-icon.png'
                    },
                    {
                      key: 'col2', text: '2 Column',
                      imageSrc: 'https://www.icone-png.com/png/43/43099.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://www.icone-png.com/png/43/43099.png',
                      checked: true
                    }
                  ]
                })
                // PropertyPaneCheckbox('checkboxProperty', {
                //   text: 'This is the text',
                //   checked: false,
                //   disabled: false,
                // })
              ]
            }
          ]
        }
      ]
    };
  }
}
