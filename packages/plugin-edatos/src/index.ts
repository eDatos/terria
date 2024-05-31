import ReactDOM from "react-dom";
import {
  TerriaPlugin,
  TerriaPluginContext
} from "terriajs-plugin-api";
// import { default  } from "./Views/DropdownLanguage";
// const DropdownLanguage = require("./Views/DropdownLanguage").default;

const plugin: TerriaPlugin = {
  name: "Edatos plugin",
  description:
    "Include eDatos header.",
  version: "0.0.1",
  register({ viewState }: TerriaPluginContext) {

    fetch('application.json')
      .then(res => res.json())
      .then(application => {
          var applicationConfig = application;
          
          function getMetadataValue(metadataValueKey) {
              var metadataEndpoint = applicationConfig.metadata.endpoint;
              return fetch(`${metadataEndpoint}/properties/${metadataValueKey}?_type=json`)
                  .then(res => res.json())
                  .then(jsonResponse => jsonResponse.value);
          }

          function renderMetadataHtml(metadataValueKey, querySelectorId) {
              return getMetadataValue(metadataValueKey)
                  .then(value => fetch(value))
                  .then(res => res.text())
                  .then(html => {
                      document.querySelector(querySelectorId).innerHTML = html;
                  })
          }

          return Promise.all([
              getMetadataValue(applicationConfig.metadata.navbarPathKey)
                  .then(value => fetch(`${value}?appName=${viewState.terria.appName}`))
                  .then(res => res.text())
                  .then(html => {
                    const header = generateElements(html, 'istac-navbar-container');

                    // See lib\Views\render.jsx
                    document.getElementById("ui").prepend(header); 

                    // document.querySelector('#istac-app-header-content').innerHTML = `<div id="dropdown-language-container"></div>`;
                          
                          // const DropdownLanguage = require("./Views/DropdownLanguage").default;
                          // // DropdownLanguage._Request;
                          // var dropdownContainer = document.getElementById("dropdown-language-container");
                          // if (dropdownContainer) {   
                          //   ReactDOM.render(<DropdownLanguage/>, dropdownContainer);
                          // }

                  }),
              // renderMetadataHtml(applicationConfig.metadata.footerPathKey, '#istac-footer-container')
          ])
          .then(_ => applicationConfig)
          .catch(console.error);
      })
      .catch(err => {
          console.log('errr', err);
      })
  }
};

function generateElements(html: string, id: string) {
  const element = document.createElement('div');
  element.innerHTML = html;
  element.id = id;
  return element;
}


export default plugin;
