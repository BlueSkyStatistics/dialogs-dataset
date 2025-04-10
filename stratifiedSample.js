/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */















class stratifiedSample extends baseModal {
    static dialogId = 'stratifiedSample'
    static t = baseModal.makeT(stratifiedSample.dialogId)

    constructor() {
        var config = {
            id: stratifiedSample.dialogId,
            label: stratifiedSample.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(caret)
require(klaR)
set.seed({{selected.seed | safe}})
trainIndex <- caret::createDataPartition({{dataset.name}}\${{selected.dependent | safe}}, p={{selected.split | safe}} / 100 , list=FALSE)
{{selected.traindataset | safe}} <- {{dataset.name}}[ trainIndex,]
{{selected.testdataset | safe}} <- {{dataset.name}}[-trainIndex,]
BSkyLoadRefresh("{{selected.traindataset | safe}}")
BSkyLoadRefresh("{{selected.testdataset | safe}}")
`
        }
        var objects = {
            traindataset: {
                el: new input(config, {
                    no: 'traindataset',
                    label: stratifiedSample.t('traindataset'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    required: true,
                    type: "character",
                    value: "traindata",
                    overwrite: "dataset",
                })
            },
            testdataset: {
                el: new input(config, {
                    no: 'testdataset',
                    label: stratifiedSample.t('testdataset'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    required: true,
                    type: "character",
                    value: "testdata",
                    overwrite: "dataset",
                })
            },
            /*   split: {
                  el: new input(config, {
                      no: 'split',
                      label: stratifiedSample.t('split'),
                      placeholder: "",
                      extraction: "TextAsIs",
                      required: true,
                      type: "numeric",
                      value:80,
                  })
              }, */
            split: {
                el: new inputSpinner(config, {
                    no: 'split',
                    label: stratifiedSample.t('split'),
                    min: 0,
                    max: 100,
                    step: 1,
                    value: 80,
                    required: true,
                    extraction: "NoPrefix|UseComma"
                })
            },
            /*  seed: {
                 el: new input(config, {
                     no: 'seed',
                     label: stratifiedSample.t('seed'),
                     placeholder: "",
                     extraction: "TextAsIs",
                     required: true,
                     type: "numeric",
                     value:123,
                 })
             }, */
            seed: {
                el: new inputSpinner(config, {
                    no: 'seed',
                    label: stratifiedSample.t('seed'),
                    min: 0,
                    max: 9999999,
                    step: 1,
                    value: 12345,
                    extraction: "NoPrefix|UseComma"
                })
            },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            dependent: {
                el: new dstVariable(config, {
                    label: stratifiedSample.t('dependent'),
                    no: "dependent",
                    filter: "String|Numeric|Logical|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            head: [objects.traindataset.el.content, objects.testdataset.el.content, objects.split.el.content, objects.seed.el.content],
            left: [objects.content_var.el.content],
            right: [objects.dependent.el.content],
            nav: {
                name: stratifiedSample.t('navigation'),
                icon: "icon-stack",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: stratifiedSample.t('help.title'),
            r_help: stratifiedSample.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: stratifiedSample.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new stratifiedSample().render()
}
