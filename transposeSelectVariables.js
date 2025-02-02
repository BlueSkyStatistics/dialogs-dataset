












class transposeSelectVariables extends baseModal {
    static dialogId = 'transposeSelectVariables'
    static t = baseModal.makeT(transposeSelectVariables.dialogId)

    constructor() {
        var config = {
            id: transposeSelectVariables.dialogId,
            label: transposeSelectVariables.t('title'),
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
                    label: transposeSelectVariables.t('transposedDataset'),
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
                    label: transposeSelectVariables.t('destination'),
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
                name: transposeSelectVariables.t('navigation'),
                icon: "icon-transpose-variables",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: transposeSelectVariables.t('help.title'),
            r_help: transposeSelectVariables.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: transposeSelectVariables.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new transposeSelectVariables().render()
}
