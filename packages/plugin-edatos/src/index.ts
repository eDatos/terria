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
          
          function getMetadataValue(metadataValueKey: string) {
              var metadataEndpoint = applicationConfig.metadata.endpoint;
              return fetch(`${metadataEndpoint}/properties/${metadataValueKey}?_type=json`)
                  .then(res => res.json())
                  .then(jsonResponse => jsonResponse.value);
          }

          return Promise.all([
              getMetadataValue(applicationConfig.metadata.navbarPathKey)
                  .then(value => fetch(`${value}?appName=${viewState.terria.appName}`))
                  .then(res => res.text())
                  .then(html => {
                    const header = generateElements(html, 'istac-navbar-container');

                    // See lib\Views\render.jsx
                    const ui = document.getElementById("ui");
                    if (ui) {
                      ui.prepend(header); 
                    }
                 })
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
  element.appendChild(document.createRange().createContextualFragment(html));
  element.id = id;
  return element;
}

export default plugin;
