
class downSample extends baseModal {
    static dialogId = 'downSample'
    static t = baseModal.makeT(downSample.dialogId)

    constructor() {
        var config = {
            id: downSample.dialogId,
            label: downSample.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(caret)
require(klaR)
set.seed({{selected.seed | safe}})
{{selected.downsample | safe}} <-downSample( x={{dataset.name}}[-BSkygetIndexesOfCols(c("{{selected.dependent | safe}}"), c("{{dataset.name}}"))], y={{dataset.name}}\${{selected.dependent | safe}}, list =FALSE, yname =c("{{selected.dependent | safe}}"))
BSkyLoadRefresh("{{selected.downsample | safe}}")
`
        }
        var objects = {
            downsample: {
                el: new input(config, {
                    no: 'downsample',
                    label: downSample.t('downsample'),
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
                    label: downSample.t('seed'),
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
                    label: downSample.t('dependent'),
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
                name: downSample.t('navigation'),
                icon: "icon-arrow_down",
                modal: config.id,
                description: downSample.t('description')
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: downSample.t('help.title'),
            r_help: downSample.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: downSample.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new downSample().render()
}
