/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Transpose, entire dataset",
        navigation: "Entire Dataset",
        transposedDataset: "Enter a name for the transposed dataset",
        help: {
            title: "Transpose Entire Dataset",
            r_help: "help(t, package='base')",
            body: `
<b>Description</b></br>
Invokes the transpose function in the base package that transposes the dataset. You have to specify the name of the dataset that stores the transposed dataset. The new transposed dataset is displayed in the grid.
<br/>
<b>Usage</b>
<br/>
<code> 
Function called: base::t(x)
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











class transposeEntireDataset extends baseModal {
    constructor() {
        var config = {
            id: "transposeEntireDataset",
            label: localization.en.title,
            modalType: "one",
            splitProcessing:false,
            RCode: `
            #Transpose the dataset 
{{selected.transposedDataset | safe}} <- as.data.frame(base::t({{dataset.name}}))
#Refreshes the transposed dataset in the data grid
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
        }
        const content = {
            items: [objects.transposedDataset.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-transpose-dataset",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new transposeEntireDataset().render()