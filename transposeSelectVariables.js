/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Transpose Dataset, select variables",
        navigation: "Select Variables",
        transposedDataset: "Enter a name for the transposed dataset",
        destination: "Select variables to transpose",
        help: {
            title: "Transpose Selected Variables",
            r_help: "help(t, package='base')",
            body: `
<b>Description</b></br>
Invokes the transpose function in the base package that transposes the variables selected and stores the results in the new dataset. You have to specify the name of the dataset that stores the transposed dataset. The new transposed dataset is displayed in the grid.
<br/>
<b>Usage</b>
<br/>
<code> 
base::t(x)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x: is a matrix or dataframe
</li>
</ul>
<b>Value</b><br/>
A matrix, with dim and dimnames constructed appropriately from those of x, and other attributes except names copied across.<br/>
<b>Package</b></br>
base<br/>
<b>Help</b></br>
help(t, package='base')
`}
    }
}











class transposeSelectVariables extends baseModal {
    constructor() {
        var config = {
            id: "transposeSelectVariables",
            label: localization.en.title,
            modalType: "two",
            splitProcessing:false,
            RCode: `
#Create a new dataset with the transposed variables
{{selected.transposedDataset | safe}} <- as.data.frame(base::t({{dataset.name}}[,c({{selected.destination | safe}}) ]))
#Refresh the dataset in the data grid
BSkyLoadRefresh("{{selected.transposedDataset | safe}}")
                `
        }
        var objects = {
            transposedDataset: {
                el: new input(config, {
                    no: 'transposedDataset',
                    label: localization.en.transposedDataset,
                    placeholder: "",
                    extraction: "TextAsIs",
                    required: true,
                    type: "character",
                    value: "",
                })
            },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            destination: {
                el: new dstVariableList(config, {
                    label: localization.en.destination,
                    no: "destination",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            head: [objects.transposedDataset.el.content],
            left: [objects.content_var.el.content],
            right: [objects.destination.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-transpose-variables",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new transposeSelectVariables().render()