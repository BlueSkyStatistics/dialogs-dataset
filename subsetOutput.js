









class subsetOutput extends baseModal {
    static dialogId = 'subsetOutput'
    static t = baseModal.makeT(subsetOutput.dialogId)

    constructor() {
        var config = {
            id: subsetOutput.dialogId,
            label: subsetOutput.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require (dplyr)
#BSkyFormat displays the subsetted dataset in the output
BSkyFormat(as.data.frame({{dataset.name}} {{selected.subsetexpression | safe}} {{selected.subsetvars | safe}}{{selected.distinct | safe}}{{selected.chkbox2 | safe }}),singleTableOutputHeader="Subset Results")
 `
        }
        var objects = {
            label0: { el: new labelVar(config, { label: subsetOutput.t('label0'), h: 6 }) },
            content_var: { el: new srcVariableList(config) },
            distinct: {
                el: new checkbox(config, {
                    label: subsetOutput.t('distinct'),
                    no: "distinct",
                    extraction: "Boolean",
                })
            },
            chkbox2: {
                el: new checkbox(config, {
                    label: subsetOutput.t('chkbox2'),
                    no: "chkbox2",
                    extraction: "Boolean",
                })
            },
            subsetvars: {
                el: new dstVariableList(config, {
                    label: subsetOutput.t('subsetvars'),
                    no: "subsetvars",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    wrapped: '%>%  dplyr::select(%val%),',
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            subsetexpression: {
                el: new input(config, {
                    no: 'subsetexpression',
                    label: subsetOutput.t('subsetexpression'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    wrapped: '%>% dplyr::filter(%val%),',
                    type: "character"
                })
            },
        }
        const content = {
            head: [objects.label0.el.content,],
            left: [objects.content_var.el.content],
            right: [objects.distinct.el.content, objects.chkbox2.el.content, objects.subsetvars.el.content, objects.subsetexpression.el.content,],
            nav: {
                name: subsetOutput.t('navigation'),
                icon: "icon-funnel",
                modal: config.id
            }
        }
        super(config, objects, content);
    }
}

module.exports = {
    render: () => new subsetOutput().render()
}
