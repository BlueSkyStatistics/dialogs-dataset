










class sortDataset extends baseModal {
    static dialogId = 'sortDataset'
    static t = baseModal.makeT(sortDataset.dialogId)

    constructor() {
        var config = {
            id: sortDataset.dialogId,
            label: sortDataset.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(dplyr)
 #Save the attributes of the dataset
bskyattr <- attributes({{dataset.name}} )
#Perform the sort
{{dataset.name}}  <-{{if (options.selected.selectctrl == "asc")}}{{dataset.name}} %>% arrange( {{selected.target | safe}}  )  {{#else}}{{dataset.name}} %>% arrange( desc({{selected.target | safe}} ) ){{/if}}
#Restore the attributes
attributes({{dataset.name}} ) <- bskyattr
#Refresh the dataset in the data grid
BSkyLoadRefresh("{{dataset.name}}")
{{if (options.selected.showResultsinOutput == "TRUE")}}BSkyFormat(as.data.frame({{dataset.name}}), singleTableOutputHeader = paste("Output sorted by", "{{selected.selectctrl | safe}}")) {{/if}}
`,
        }
        var objects = {
            label1: { el: new labelVar(config, { label: sortDataset.t('label1'), h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            target: {
                el: new dstVariableList(config, {
                    label: sortDataset.t('target'),
                    no: "target",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            selectctrl: {
                el: new comboBox(config, {
                    no: 'selectctrl',
                    label: sortDataset.t('selectctrl'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    required: true,
                    default: "asc",
                    options: ["asc", "desc"]
                })
            },
            showResultsinOutput: {
                el: new checkbox(config, {
                    label: sortDataset.t('showResultsinOutput'),
                    no: "showResultsinOutput",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
        }
        const content = {
            left: [objects.label1.el.content, objects.content_var.el.content],
            right: [objects.selectctrl.el.content, objects.target.el.content, objects.showResultsinOutput.el.content],
            nav: {
                name: sortDataset.t('navigation'),
                icon: "icon-sort_vertical",
                modal: config.id
            }
        }
        super(config, objects, content);
    }
}

module.exports = {
    render: () => new sortDataset().render()
}
