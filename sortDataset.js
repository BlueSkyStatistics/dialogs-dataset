/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Sort Dataset",
        navigation: "Dataset",
        label1: "Sort Options",
        target: "Select the variable(s) you want to sort by",
        selectctrl: "Specify a sort order, select asc for ascending, desc for descending.",
        showResultsinOutput: "Show results in output window",
    }
}









class sortDataset extends baseModal {
    constructor() {
        var config = {
            id: "sortDataset",
            label: localization.en.title,
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(dplyr)
 #Save the attributes of the dataset
bskyattr <- attributes({{dataset.name}} )
#Perform the sort
{{dataset.name}}  <-{{if (options.selected.selectctrl == "asc")}}{{dataset.name}} %>% arrange( {{selected.target | safe}}  )  {{#else}}{{dataset.name}} %>% arrange( desc({{selected.target | safe}} ) ){{/if}}
#Restore the attributes
attributes({{dataset.name}} ) <- bskyattr
#Refresh the dataset in the data grid
BSkyLoadRefresh("{{dataset.name}}")
{{if (options.selected.showResultsinOutput == "TRUE")}}BSkyFormat(as.data.frame({{dataset.name}}), singleTableOutputHeader = paste("Output sorted by", "{{selected.selectctrl | safe}}")) {{/if}}
`,
        }
        var objects = {
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            target: {
                el: new dstVariableList(config, {
                    label: localization.en.target,
                    no: "target",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            selectctrl: {
                el: new comboBox(config, {
                    no: 'selectctrl',
                    label: localization.en.selectctrl,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    required: true,
                    default: "asc",
                    options: ["asc", "desc"]
                })
            },
            showResultsinOutput: {
                el: new checkbox(config, {
                    label: localization.en.showResultsinOutput,
                    no: "showResultsinOutput",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
        }
        const content = {
            left: [objects.label1.el.content, objects.content_var.el.content],
            right: [objects.selectctrl.el.content, objects.target.el.content, objects.showResultsinOutput.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-sort_vertical",
                modal: config.id
            }
        }
        super(config, objects, content);
    }
}
module.exports.item = new sortDataset().render()