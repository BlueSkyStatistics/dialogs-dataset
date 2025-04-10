/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */









class sample extends baseModal {
    static dialogId = 'sample'
    static t = baseModal.makeT(sample.dialogId)

    constructor() {
        var config = {
            id: sample.dialogId,
            label: sample.t('title'),
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
            label1: { el: new labelVar(config, { label: sample.t('label1'), h: 5 }) },
            radio2: { el: new radioButton(config, { label: sample.t('radio2'), no: "grp1", increment: "radio2", value: "", required: true, state: "checked", extraction: "ValueAsIs", dependant_objects: ['dsname'] }) },
            dsname: {
                el: new input(config, {
                    no: 'dsname',
                    label: sample.t('dsname'),
                    placeholder: "",
                    ml: 3,
                    extraction: "TextAsIs",
                    overwrite: "dataset"
                })
            },
            radio1: { el: new radioButton(config, { label: sample.t('radio1'), no: "grp1", increment: "radio1", value: "", syntax: "{{dataset.name}}",style: "mb-2", state: "", extraction: "ValueAsIs" }) },
            label2: { el: new labelVar(config, { label: sample.t('label2'), h: 5 }) },
            rd1: { el: new radioButton(config, { label: sample.t('rd1'), no: "rdgrp", increment: "rd1", required: true, value: "sampleAPercentage", state: "checked", extraction: "ValueAsIs", dependant_objects: ['percentage'] }) },
            percentage: {
                el: new inputSpinner(config, {
                    no: 'percentage',
                    label: sample.t('percentage'),
                    style: "ml-2",
                    min: 0,
                    max: 100,
                    step: 1,
                    value: 80,
                    extraction: "NoPrefix|UseComma"
                })
            },
            rd2: { el: new radioButton(config, { label: sample.t('rd2'), no: "rdgrp", required: true, increment: "rd2", value: "sampleNoOfRows", state: "", extraction: "ValueAsIs", dependant_objects: ['sizeBSky'] }) },
            size: {
                el: new inputSpinner(config, {
                    no: 'sizeBSky',
                    label: sample.t('size'),
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
                    label: sample.t('chk2'),
                    no: "chk2",
                    style: "mt-2",
                    extraction: "Boolean",
                })
            },
            textn: {
                el: new input(config, {
                    no: 'textn',
                    label: sample.t('textn'),
                    placeholder: "",
                    extraction: "TextAsIs",
                })
            },
            seed: {
                el: new inputSpinner(config, {
                    no: 'seed',
                    label: sample.t('seed'),
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
                name: sample.t('navigation'),
                icon: "icon-sample",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: sample.t('help.title'),
            r_help: sample.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: sample.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new sample().render()
}
