/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var localization = {
    en: {
        title: "Down Sample",
        navigation: "Sample, Down Sample",
        description: `Down-Sampling Imbalanced Data. DownSample will randomly sample a data set so that all classes have the same frequency as the minority class`,
        downsample: "Enter the name of the dataset",
        seed: "Set seed",
        dependent: "Variable to down sample by",
        help: {
            title: "Down Sample",
            r_help: "help(createDataPartition, package=\"caret\")",
            body: `
<b>Description</b></br>
Down-Sampling Imbalanced Data. Randomly keeps, from each class of the selected variable, as many rows as the smallest class has, so that all classes have the same frequency as the minority class. All rows of the smallest class are kept.
<br/>
<b>Usage</b>
<br/>
<code> 
BSkyDownSample(data, dependent)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
data: a data frame
</li>
<li>
dependent: the name of the variable whose classes (levels or distinct values) are balanced, as a character string
</li>
</ul>
<b>Details</b></br>
Simple random sampling is used to down-sample the majority class(es). Rows where the selected variable is missing (NA) are left out, with a warning. Factor levels that no row has are ignored. Set seed makes the result reproducible.</br>
<b>Value</b><br/>
A data frame with the same columns, in the same order, as the original dataset. Rows keep their original order.</br>
<b>Examples</b></br>
<code> 
set.seed(12345)</br>
DownSample <- BSkyDownSample(data = Dataset2, dependent = \"gender\")</br>
table(DownSample$gender)</br>
</code> <br/>
<b>Package</b></br>
BlueSky</br>
<b>Help</b></br>
help(BSkyDownSample, package ='BlueSky')
`}
    }
}
class downSample extends baseModal {
    constructor() {
        var config = {
            id: "downSample",
            label: localization.en.title,
            modalType: "two",
            splitProcessing:false,
            RCode: `
set.seed({{selected.seed | safe}})
{{selected.downsample | safe}} <- BSkyDownSample(data = {{dataset.name}}, dependent = "{{selected.dependent | safe}}")
BSkyLoadRefresh("{{selected.downsample | safe}}")
`
        }
        var objects = {
            downsample: {
                el: new input(config, {
                    no: 'downsample',
                    label: localization.en.downsample,
                    placeholder: "",
                    extraction: "TextAsIs",
                    required: true,
                    type: "character",
                    value: "DownSample",
                    overwrite: "dataset",
                })
            },
            seed: {
                el: new inputSpinner(config, {
                    no: 'seed',
                    label: localization.en.seed,
                    min: 0,
                    max: 9999999,
                    step: 0,
                    required: true,
                    value: 12345,
                    extraction: "NoPrefix|UseComma"
                })
            },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            dependent: {
                el: new dstVariable(config, {
                    label: localization.en.dependent,
                    no: "dependent",
                    filter: "String|Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            head: [objects.downsample.el.content, objects.seed.el.content],
            left: [objects.content_var.el.content],
            right: [objects.dependent.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-arrow_down",
                modal: config.id,
                description: localization.en.description
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new downSample().render()