/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Up Sample",
        navigation: "Sample, Up Sample",
        downsample: "Enter the name of the dataset",
        seed: "Set seed",
        dependent: "Variable to up sample by",
        help: {
            title: "Up Sample",
            r_help: "help(BSkyUpSample, package=\"BlueSky\")",
            body: `
<b>Description</b></br>
Up-Sampling Imbalanced Data. Keeps all rows and adds randomly chosen repeats of rows (sampling with replacement) to each class of the selected variable until it has as many rows as the largest class, so that the class distributions are equal.
<br/>
<b>Usage</b>
<br/>
<code> 
BSkyUpSample(data, dependent)
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
All the original rows are kept, and additional rows are sampled with replacement from the minority class(es). Rows where the selected variable is missing (NA) are left out, with a warning. Factor levels that no row has are ignored. Set seed makes the result reproducible.</br>
<b>Value</b><br/>
A data frame with the same columns, in the same order, as the original dataset. Rows keep their original order, with the repeated rows next to the rows they copy.<br/>
<b>Examples</b><br/>
<code> set.seed(12345)</br>
UpSample <- BSkyUpSample(data = Dataset2, dependent = \"gender\")</br>
table(UpSample$gender)</br>
</code> <br/>
<b>Package</b></br>
BlueSky</br>
<b>Help</b></br>
help(BSkyUpSample, package ='BlueSky')
`}
    }
}












class upSample extends baseModal {
    constructor() {
        var config = {
            id: "upSample",
            label: localization.en.title,
            modalType: "two",
            splitProcessing:false,
            RCode: `
set.seed({{selected.seed | safe}})
{{selected.downsample | safe}} <- BSkyUpSample(data = {{dataset.name}}, dependent = "{{selected.dependent | safe}}")
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
                    value: "UpSample",
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
                icon: "icon-arrow_up",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new upSample().render()