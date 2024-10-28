












class mergeDatasets extends baseModal {
    static dialogId = 'mergeDatasets'
    static t = baseModal.makeT(mergeDatasets.dialogId)

    constructor() {
        var config = {
            id: mergeDatasets.dialogId,
            label: mergeDatasets.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
{{selected.out | safe}} <- {{selected.mergetype | safe}}(
    {{selected.in1 | safe}},
    {{selected.in2 | safe}},
    {{ if(options.selected.by != "c('')")}}by = {{selected.by | safe}},\n{{/if}} {{ if(options.selected.byDiffNames != "")}} by = c({{selected.byDiffNames | safe}}),\n{{/if}}
    {{if(options.selected.suffix != "")}}suffix = {{selected.suffix | safe}}{{/if}}
  \n)
cat("Warnings regarding differing attributes between merging variables can be safely ignored.")
BSkyLoadRefreshDataframe("{{selected.out | safe}}")

`,
        }
        var objects = {
            dataset_var: { el: new srcDataSetList(config, { action: "move" }) },
            out: {
                el: new input(config, {
                    no: 'out',
                    label: mergeDatasets.t('out'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    type: "character",
                    required: true,
                }),
            },
            in1: {
                el: new dstVariableList(config, {
                    label: mergeDatasets.t('in1'),
                    no: "in1",
                    filter: "Dataset",
                    extraction: "UseComma",
                    required: true,
                })
            },
            in2: {
                el: new dstVariable(config, {
                    label: mergeDatasets.t('in2'),
                    no: "in2",
                    filter: "Dataset",
                    extraction: "UseComma",
                    required: true,
                })
            },
            label1: { el: new labelVar(config, { label: mergeDatasets.t('label1'), h: 5, style: "mt-1", }) },
            leftjoin: {
                el: new radioButton(config, { label: mergeDatasets.t('leftjoin'), no: "mergetype", increment: "leftjoin", value: "left_join", state: "checked", extraction: "ValueAsIs" })
            },
            rightjoin: {
                el: new radioButton(config, { label: mergeDatasets.t('rightjoin'), no: "mergetype", increment: "rightjoin", value: "right_join", state: "", extraction: "ValueAsIs" })
            },
            innerjoin: {
                el: new radioButton(config, { label: mergeDatasets.t('innerjoin'), no: "mergetype", increment: "innerjoin", value: "inner_join", state: "", extraction: "ValueAsIs" })
            },
            fulljoin: {
                el: new radioButton(config, { label: mergeDatasets.t('fulljoin'), no: "mergetype", increment: "fulljoin", value: "full_join", state: "", extraction: "ValueAsIs" })
            },
            /*id: {
                el: new input(config, {
                    no: 'id',
                    label: mergeDatasets.t('id'),
                    placeholder: "",
                    allow_spaces:true,
                    extraction: "TextAsIs",
                    type: "character",
                    value: "",
                }),
            },*/
            label2: { el: new labelVar(config, { label: mergeDatasets.t('label2'), h: 5, style: "mt-2", }) },
            by: {
                el: new input(config, {
                    no: 'by',
                    label: mergeDatasets.t('by'),
                    placeholder: "",
                    allow_spaces:true,
                    extraction: "CreateArray",
                    type: "character",
                    value: "",
                }),
            },
            label3: { el: new labelVar(config, { label: mergeDatasets.t('label3'), h: 5, style: "mt-2", }) },
            byDiffNames: {
                el: new input(config, {
                    no: 'byDiffNames',
                    allow_spaces:true,
                    label: mergeDatasets.t('byDiffNames'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    type: "character",
                    value: "",
                }),
            },
            label4: { el: new labelVar(config, { label: mergeDatasets.t('label4'), h: 5, style: "mt-2", }) },
            suffix: {
                el: new input(config, {
                    no: 'suffix',
                    label: mergeDatasets.t('suffix'),
                    placeholder: "",
                    allow_spaces:true,
                    extraction: "CreateArray",
                    type: "character",
                    value: ".x,.y",
                }),
            },
        }
        var advOptions = {
            el: new optionsVar(config, {
                no: "advOptions",
                name: mergeDatasets.t('advOptions'),
                content: [
                    objects.label2.el,
                    objects.by.el,
                    objects.label3.el,
                    objects.byDiffNames.el,
                    objects.label4.el,
                    objects.suffix.el,
                ]
            })
        };
        const content = {
            head: [],
            left: [objects.dataset_var.el.content],
            right: [objects.out.el.content, objects.in1.el.content, objects.in2.el.content, objects.label1.el.content, objects.leftjoin.el.content, objects.rightjoin.el.content, objects.innerjoin.el.content, objects.fulljoin.el.content],
            bottom: [advOptions.el.content],
            nav: {
                name: mergeDatasets.t('navigation'),
                icon: "icon-merge_right",
                modal: config.id,
                description: mergeDatasets.t('description')
            },
            sizeleft: 3,
            sizeright: 9
        }
        super(config, objects, content);
        
        this.help = {
            title: mergeDatasets.t('help.title'),
            r_help: "help(data,package='utils')",
            body: mergeDatasets.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new mergeDatasets().render()
}
