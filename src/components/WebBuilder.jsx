import React from "react";
import { useEffect } from "react";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import "./webBuilder.css";

function WebBuilder() {
  useEffect(() => {
    const editor = grapesjs.init({
      container: "#gjs",

      fromElement: true,

      height: "900px",
      width: "auto",

      storageManager: false,

      //Bottom Panel
      blockManager: {
        appendTo: "#blocks",
        blocks: [
          {
            id: "section", // id is mandatory
            label: "<b>Section</b>", // You can use HTML/SVG inside labels
            attributes: { class: "gjs-block-section" },
            content: `<section>
              <h1>This is a simple title</h1>
              <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
              <div>This is a componet for the section drop and down</div>
            
            </section>`,
            activate: true,
          },
          {
            id: "text",
            label: "Text",
            content: '<div data-gjs-type="text">Insert your text here</div>',
            activate: true,
          },
          {
            id: "image",
            label: "Image",
            media: `<svg style="width:24px;height:20px" viewBox="0 0 24 24">
            <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
            </svg>`,
            select: true,
            // You can pass components as a JSON instead of a simple HTML string,
            // in this case we also use a defined component type `image`
            content: { type: "image" },
            // This triggers `active` event on dropped components and the `image`
            // reacts by opening the AssetManager
            activate: true,
          },
        ],
      },

      //Side panel
      layerManager: {
        appendTo: ".layers-container",
      },

      panels: {
        defaults: [
          {
            id: "layers",
            appendTo: "#blocks",
            el: ".panel__right",
            // Make the panel resizable
            resizable: {
              maxDim: 900,
              minDim: 900,
              tc: 0, // Top handler
              cl: 1, // Left handler
              cr: 0, // Right handler
              bc: 0, // Bottom handler
              // Being a flex child we need to change `flex-basis` property
              // instead of the `width` (default)
              keyWidth: "flex-basis",
            },

          },
        ],
      },

     


    });

      //TOP PANEL
    editor.Panels.addPanel({
      id: "panel-top",
      el: ".panel__top",
      buttons: [
        {
          id: "visibility",
          active: true, // active by default
          className: "btn-toggle-borders",
          label: "<span>B</span>",
          command: "sw-visibility", // Built-in command
        },
        {
          id: "export",
          className: "btn-open-export",
          label: "Exp",
          context: "export-template", // For grouping context of buttons from the same panel
        },
        {
          id: "show-json",
          className: "btn-show-json",
          label: "JSON",
          context: "show-json",
          command(editor) {
            editor.Modal.setTitle("Components JSON")
              .setContent(
                `<textarea style="width:100%; height: 230px;">
                ${JSON.stringify(editor.getComponents())}
              </textarea>`
              )
              .open();
          },
        },
      ],
    });




  }, []);

  return (
    <>
      <div class="panel__top">
        <div class="panel__devices"></div>
        <div class="panel__switcher"></div>
      </div>
      <div class="editor-row">
        <div class="editor-canvas">
          <div id="gjs">...</div>
        </div>
        <div class="panel__right">
          <div class="layers-container"></div>
          <div class="styles-container"></div>
        </div>
      </div>
      <div id="blocks"></div>
    </>
  );
}
export default WebBuilder;
