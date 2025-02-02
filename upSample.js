













class upSample extends baseModal {
    static dialogId = 'upSample'
    static t = baseModal.makeT(upSample.dialogId)

    constructor() {
        var config = {
            id: upSample.dialogId,
            label: upSample.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(caret)
require(klaR)
set.seed({{selected.seed | safe}})
{{selected.downsample | safe}} <-upSample( x={{dataset.name}}[-BSkygetIndexesOfCols(c("{{selected.dependent | safe}}"), c("{{dataset.name}}"))], y={{dataset.name}}\${{selected.dependent | safe}}, list =FALSE, yname =c("{{selected.dependent | safe}}"))
BSkyLoadRefresh("{{selected.downsample | safe}}")
`
        }
        var objects = {
            downsample: {
                el: new input(config, {
                    no: 'downsample',
                    label: upSample.t('downsample'),
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
                    label: upSample.t('seed'),
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
                    label: upSample.t('dependent'),
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
                name: upSample.t('navigation'),
                icon: "icon-arrow_up",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: upSample.t('help.title'),
            r_help: upSample.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: upSample.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new upSample().render()
}
