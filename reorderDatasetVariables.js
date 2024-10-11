





class reorderDatasetVariables extends baseModal {
    static dialogId = 'reorderDatasetVariables'
    static t = baseModal.makeT(reorderDatasetVariables.dialogId)

    constructor() {
        var config = {
            id: reorderDatasetVariables.dialogId,
            label: reorderDatasetVariables.t('title'),
            modalType: "one",
            splitProcessing:false,
            RCode: `
require(dplyr)
{{if (options.selected.rdgrp=="TRUE")}}#Reorder variables alphabetically in order A-Z\n{{dataset.name}} <- {{dataset.name}} %>%  dplyr::select(sort(names(.)))\n{{#else}}#Reorder variables alphabetically in order Z-A\n{{dataset.name}} <- {{dataset.name}} %>% dplyr::select(rev(sort(names(.))))\n{{/if}}
BSkyLoadRefresh("{{dataset.name}}" )
`
        }
        var objects = {
            label1: { el: new labelVar(config, { label: reorderDatasetVariables.t('label1'), h: 6 }) },
            rd1: { el: new radioButton(config, { label: reorderDatasetVariables.t('rd1'), no: "rdgrp", increment: "rd1", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            rd2: { el: new radioButton(config, { label: reorderDatasetVariables.t('rd2'), no: "rdgrp", increment: "rd2", value: "FALSE", state: "", extraction: "ValueAsIs" }) },
        }
        const content = {
            items: [objects.rd1.el.content, objects.rd2.el.content,],
            nav: {
                name: reorderDatasetVariables.t('navigation'),
                icon: "icon-reorder-variables",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: reorderDatasetVariables.t('help.title'),
            r_help: "help(data,package='utils')",
            body: reorderDatasetVariables.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new reorderDatasetVariables().render()
}
