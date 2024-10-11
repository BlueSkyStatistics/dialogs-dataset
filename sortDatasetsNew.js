














class sortDatasetsNew extends baseModal {
    static dialogId = 'sortDatasetsNew'
    static t = baseModal.makeT(sortDatasetsNew.dialogId)

    constructor() {
        var config = {
            id: sortDatasetsNew.dialogId,
            label: sortDatasetsNew.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(dplyr)
#Save the attributes of the dataset
bskyattr <- attributes({{dataset.name}} )
#Perform the sort
{{dataset.name}}  <-{{dataset.name}} %>% dplyr::arrange({{selected.sortOrder | safe}})
#Restore the attributes
attributes({{dataset.name}}) <- bskyattr
{{if (options.selected.showResultsinOutput=="TRUE")}}#Display results in the output window\nBSkyFormat({{dataset.name}}){{#else}}#Refresh the dataset in the data grid\nBSkyLoadRefresh('{{dataset.name}}'){{/if}}
`,
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            sortO: {
                el: new wrapControl(config, {
                    no: "sortOrder",
                    label: sortDatasetsNew.t('ctrlName'),
                    options: [
                        {
                            name: "asc",
                            wrapped: "%"
                        },
                        {
                            name: "desc",
                            wrapped: "desc(%)"
                        },
                    ],
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    required: true,
                    extraction: "NoPrefix|UseComma",
                    upperdesc: sortDatasetsNew.t('upperdesc'),
                    lowerdescdesc: sortDatasetsNew.t('lowerdescdesc'),
                })
            },
            showResultsinOutput: {
                el: new checkbox(config, {
                    label: sortDatasetsNew.t('showResultsinOutput'),
                    no: "showResultsinOutput",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            label1: { el: new labelVar(config, { label: sortDatasetsNew.t('label1'), h: 6 }) },
            label2: { el: new labelVar(config, { label: sortDatasetsNew.t('label2'), h: 6 }) },
        }
        const content = {
            head: [],
            left: [objects.content_var.el.content],
            right: [objects.sortO.el.content, objects.label1.el.content, objects.label2.el.content, objects.showResultsinOutput.el.content],
            bottom: [],
            nav: {
                name: sortDatasetsNew.t('navigation'),
                icon: "icon-sort_vertical",
                modal: config.id
            },
            sizeleft: 3,
            sizeright: 9
        }
        super(config, objects, content);
    }
}

module.exports = {
    render: () => new sortDatasetsNew().render()
}
