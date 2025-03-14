/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */









class setSplit extends baseModal {
    static dialogId = 'setSplit'
    static t = baseModal.makeT(setSplit.dialogId)

    constructor() {
        var config = {
            id: setSplit.dialogId,
            label: setSplit.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
BSkySetDataFrameSplit(c({{selected.SelectedVars | safe}}),'{{dataset.name}}')
`
        }
        var objects = {
            label0: { el: new labelVar(config, { label: setSplit.t('label0'), h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            SelectedVars: {
                el: new dstVariableList(config, {
                    label: setSplit.t('SelectedVars'),
                    no: "SelectedVars",
                    filter: "String|Numeric|Date|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            head: [objects.label0.el.content],
            left: [objects.content_var.el.content],
            right: [objects.SelectedVars.el.content],
            nav: {
                name: setSplit.t('navigation'),
                icon: "icon-switch_on",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: setSplit.t('help.title'),
            r_help: setSplit.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: setSplit.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new setSplit().render()
}
