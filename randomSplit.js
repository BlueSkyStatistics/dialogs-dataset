













class randomSplit extends baseModal {
    static dialogId = 'randomSplit'
    static t = baseModal.makeT(randomSplit.dialogId)

    constructor() {
        var config = {
            id: randomSplit.dialogId,
            label: randomSplit.t('title'),
            modalType: "one",
            splitProcessing:false,
            RCode: `
require(caret)
require(klaR)
{{ if(options.selected.seed != "")}}## set the seed to make your partition reproductible\nset.seed({{selected.seed | safe}})\n{{/if}}
trainIndex  <- base::sample(x=seq_len(nrow({{dataset.name}})), replace ={{selected.replace | safe}}, size = base::floor(({{selected.split | safe}} / 100) * nrow({{dataset.name}})))
{{selected.traindataset | safe}} <- {{dataset.name}}[trainIndex , ]
{{selected.testdataset | safe}} <- {{dataset.name}}[-trainIndex , ]
BSkyLoadRefresh("{{selected.traindataset | safe}}")
BSkyLoadRefresh("{{selected.testdataset | safe}}") 


`
        }
        var objects = {
            traindataset: {
                el: new input(config, {
                    no: 'traindataset',
                    label: randomSplit.t('traindataset'),
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
                    label: randomSplit.t('testdataset'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    required: true,
                    type: "character",
                    value: "testdata",
                    overwrite: "dataset",
                })
            },
            split: {
                el: new inputSpinner(config, {
                    no: 'split',
                    label: randomSplit.t('split'),
                    min: 0,
                    max: 100,
                    step: 1,
                    value: 80,
                    extraction: "NoPrefix|UseComma"
                })
            },
            replace: { el: new checkbox(config, { label: randomSplit.t('replace'), no: "replace", extraction: "Boolean" }) },
            seed: {
                el: new inputSpinner(config, {
                    no: 'seed',
                    label: randomSplit.t('seed'),
                    min: 0,
                    max: 9999999,
                    step: 1,
                    value: 12345,
                    required: true,
                    extraction: "NoPrefix|UseComma"
                })
            },
        }
        const content = {
            items: [objects.traindataset.el.content, objects.testdataset.el.content, objects.split.el.content, objects.replace.el.content, objects.seed.el.content],
            nav: {
                name: randomSplit.t('navigation'),
                icon: "icon-dice",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: randomSplit.t('help.title'),
            r_help: randomSplit.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: randomSplit.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new randomSplit().render()
}
