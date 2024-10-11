

class stackDatasets extends baseModal {
    static dialogId = 'stackDatasets'
    static t = baseModal.makeT(stackDatasets.dialogId)

    constructor() {
        var config = {
            id: stackDatasets.dialogId,
            label: stackDatasets.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(dplyr)
{{selected.out | safe}} <- {{selected.mergetype | safe}}( {{selected.in1 | safe}} {{selected.id | safe}})
BSkyLoadRefreshDataframe( "{{selected.out | safe}}" )
`,
        }
        var objects = {
            dataset_var: { el: new srcDataSetList(config, { action: "move" }) },
            out: {
                el: new input(config, {
                    no: 'out',
                    label: stackDatasets.t('out'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    overwrite: "dataset",
                    type: "character",
                    required: true,
                }),
            },
            in1: {
                el: new dstVariableList(config,{
                  label: stackDatasets.t('in1'),
                  no: "in1",
                  filter: "Dataset",
                  extraction: "UseComma",
                  required: true,
                })
              },
            label1: { el: new labelVar(config, { label: stackDatasets.t('label1'), h: 5, style: "mt-1", }) },
            bindrows: {
                el: new radioButton(config, { label: stackDatasets.t('bindrows'), no: "mergetype", increment: "bindrows", value: "bind_rows", state: "checked", extraction: "ValueAsIs" })
            },
            label2: { el: new labelVar(config, { label: stackDatasets.t('label2'), h: 5, style: "mt-3", }) },
            union: {
                el: new radioButton(config, { label: stackDatasets.t('union'), no: "mergetype", increment: "union", value: "union", state: "", extraction: "ValueAsIs" })
            },
            intersect: {
                el: new radioButton(config, { label: stackDatasets.t('intersect'), no: "mergetype", increment: "intersect", value: "intersect", state: "", extraction: "ValueAsIs" })
            },
            setdiff: {
                el: new radioButton(config, { label: stackDatasets.t('setdiff'), no: "mergetype", increment: "setdiff", value: "setdiff", state: "", extraction: "ValueAsIs" })
            },
            id: {
                el: new input(config, {
                    no: 'id',
                    label: stackDatasets.t('id'),
                    placeholder: "",
                    extraction: "ValueAsIs",
                    wrapped: ", .id =\"%val%\"",
                    type: "character",
                    value: "",
                    style: "mt-3",
                }),
            },
        }
        const content = {
            head: [],
            left: [objects.dataset_var.el.content],
            right: [objects.out.el.content, objects.in1.el.content,  objects.label1.el.content, objects.bindrows.el.content, objects.label2.el.content, objects.union.el.content, objects.intersect.el.content, objects.setdiff.el.content, objects.id.el.content],
            bottom: [],
            nav: {
                name: stackDatasets.t('navigation'),
                icon: "icon-stack",
                modal: config.id
            },
            sizeleft: 3,
            sizeright: 9
        }
        super(config, objects, content);
        
        this.help = {
            title: stackDatasets.t('help.title'),
            r_help: "help(data,package='utils')",
            body: stackDatasets.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new stackDatasets().render()
}
