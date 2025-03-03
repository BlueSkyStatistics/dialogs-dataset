/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Sample Data",
        navigation: "Sample",
        label1: "Dataset options",
        radio2: "Save results to a new dataset",
        dsname: "Enter a name of a dataset",
        radio1: "Overwrite dataset",
        label2: "Sampling options",
        rd1: "Specify the percentage of the dataset to sample",
        percentage: "Enter the percentage",
        rd2: "Specify the number of rows to select",
        size: "Enter the number of rows",
        textn: "Optionally enter a variable name or formula for weights",
        seed: "Optionally set a seed for data reproducibility",
        chk2: "Sample with replacement",
        help: {
            title: "Sample Dataset",
            r_help: "help(sample_n, package='dplyr')",
            body: `
<b>Description</b></br>
Takes a random sample of the rows from the existing dataset. Samples a % of rows or a specified number of rows with or without replacement. Saves the result to a new dataset or overwrites the existing dataset.
<br/>
<b>Usage</b>
<br/>
<code> 
#Samples a specified number of rows</br>
sample_n(tbl, size, replace = FALSE, weight = NULL)</br>
#Samples a fraction of the rows</br>
sample_frac(tbl, size = 1, replace = FALSE, weight = NULL)</br>
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
tbl: table of data. See ‘Details.’
</li>
<li>
size: For sample_n(), the number of rows to select. For sample_frac(), the fraction of rows to select. 
</li>
<li>
replace: Should sampling be with replacement?
</li>
<li>
weights: Sampling weights. This must evaluate to a vector of non-negative numbers the same length as the input. Weights are automatically standardised to sum to 1.
</li>
</ul>
<b>Package</b></br>
dplyr
<b>Help</b></br>
help(sample_n, package='dplyr')
`}
    }
}






class sample extends baseModal {
    constructor() {
        var config = {
            id: "sample",
            label: localization.en.title,
            modalType: "one",
            splitProcessing:false,
            RCode: `
require (dplyr)
{{ if(options.selected.seed != "")}}set.seed({{selected.seed | safe}}){{/if}}
\n#Either size should not exceed row count in current dataset or replace should be TRUE
{{if (options.selected.rdgrp =='sampleAPercentage') }} .GlobalEnv\${{selected.grp1 | safe}}{{selected.dsname | safe}}  <- sample_frac({{dataset.name}}, size ={{selected.percentage | safe}}/100 , replace ={{selected.chk2 | safe}}{{if (options.selected.textn !== "")}} , weight = {{selected.textn | safe}} {{/if}})\n{{/if}}
{{if (options.selected.rdgrp =='sampleNoOfRows') }}.GlobalEnv\${{selected.grp1 | safe}}{{selected.dsname | safe}}  <- sample_n({{dataset.name}}, size ={{selected.sizeBSky | safe}}, replace ={{selected.chk2 | safe}}{{if (options.selected.textn !== "")}} , weight = {{selected.textn | safe}} {{/if}})\n{{/if}}
BSkyLoadRefresh('{{selected.grp1 | safe}}{{selected.dsname | safe}}')
`
        }
        var objects = {
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 5 }) },
            radio2: { el: new radioButton(config, { label: localization.en.radio2, no: "grp1", increment: "radio2", value: "", required: true, state: "checked", extraction: "ValueAsIs", dependant_objects: ['dsname'] }) },
            dsname: {
                el: new input(config, {
                    no: 'dsname',
                    label: localization.en.dsname,
                    placeholder: "",
                    ml: 3,
                    extraction: "TextAsIs",
                    overwrite: "dataset"
                })
            },
            radio1: { el: new radioButton(config, { label: localization.en.radio1, no: "grp1", increment: "radio1", value: "", syntax: "{{dataset.name}}",style: "mb-2", state: "", extraction: "ValueAsIs" }) },
            label2: { el: new labelVar(config, { label: localization.en.label2, h: 5 }) },
            rd1: { el: new radioButton(config, { label: localization.en.rd1, no: "rdgrp", increment: "rd1", required: true, value: "sampleAPercentage", state: "checked", extraction: "ValueAsIs", dependant_objects: ['percentage'] }) },
            percentage: {
                el: new inputSpinner(config, {
                    no: 'percentage',
                    label: localization.en.percentage,
                    style: "ml-2",
                    min: 0,
                    max: 100,
                    step: 1,
                    value: 80,
                    extraction: "NoPrefix|UseComma"
                })
            },
            rd2: { el: new radioButton(config, { label: localization.en.rd2, no: "rdgrp", required: true, increment: "rd2", value: "sampleNoOfRows", state: "", extraction: "ValueAsIs", dependant_objects: ['sizeBSky'] }) },
            size: {
                el: new inputSpinner(config, {
                    no: 'sizeBSky',
                    label: localization.en.size,
                    min: 1,
                    max: 9999999,
                    step: 1,
                    style: "ml-2",
                    value: 1,
                    extraction: "NoPrefix|UseComma"
                })
            },
            chk2: {
                el: new checkbox(config, {
                    label: localization.en.chk2,
                    no: "chk2",
                    style: "mt-2",
                    extraction: "Boolean",
                })
            },
            textn: {
                el: new input(config, {
                    no: 'textn',
                    label: localization.en.textn,
                    placeholder: "",
                    extraction: "TextAsIs",
                })
            },
            seed: {
                el: new inputSpinner(config, {
                    no: 'seed',
                    label: localization.en.seed,
                    min: 0,
                    max: 9999999,
                    step: 1,
                    value: 12345,
                    extraction: "NoPrefix|UseComma"
                })
            },
        }
        const content = {
            items: [objects.label1.el.content, objects.radio2.el.content, objects.dsname.el.content, objects.radio1.el.content, objects.label2.el.content, objects.rd1.el.content, objects.percentage.el.content, objects.rd2.el.content, objects.size.el.content, objects.chk2.el.content, objects.textn.el.content, objects.seed.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-sample",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new sample().render()