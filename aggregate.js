/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */
















class aggregate extends baseModal {
    static dialogId = 'aggregate'
    static t = baseModal.makeT(aggregate.dialogId)

    constructor() {
        var config = {
            id: aggregate.dialogId,
            label: aggregate.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(dplyr)
#Aggregate the dataset
{{selected.datasetname | safe}} <- {{dataset.name}}{{selected.groupBy | safe}} %>% dplyr::summarize({{selected.summarize | safe}})\n
#Refresh the dataset in the data grid
BSkyLoadRefresh('{{selected.datasetname | safe}}')
{{if (options.selected.showResultsinOutput =="TRUE")}}\n#Display results in the output window\nBSkyFormat(as.data.frame({{selected.datasetname | safe}})){{/if}}
`,
        }
        var objects = {
            content_var: { el: new srcVariableList(config) },
            datasetname: {
                el: new input(config, {
                    no: 'datasetname',
                    label: aggregate.t('datasetname'),
                    placeholder: "",
                    required: true,
                    extraction: "TextAsIs",
                    overwrite: "dataset",
                    value: ""
                })
            },
            showResultsinOutput: {
                el: new checkbox(config, {
                    label: aggregate.t('showResultsinOutput'),
                    no: "showResultsinOutput",
                    bs_type: "valuebox",
                    style: "mt-2",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            wrapC: {
                el: new wrapControl(config, {
                    no: "summarize",
                    label: aggregate.t('label1'),
                    options: [
                        {
                            name: "mean",
                            wrapped: "mean(%, na.rm = TRUE)"
                        },
                        {
                            name: "median",
                            wrapped: "median(%, na.rm = TRUE)"
                        },
                        {
                            name: "sum",
                            wrapped: "sum(%, na.rm = TRUE)"
                        },
                        {
                            name: "sd",
                            wrapped: "sd(%, na.rm = TRUE)"
                        },
                        {
                            name: "n_distinct",
                            wrapped: "dplyr::n_distinct(%, na.rm = TRUE)"
                        },
                        {
                            name: "max",
                            wrapped: "max(%, na.rm = TRUE)"
                        },
                        {
                            name: "min",
                            wrapped: "min(%, na.rm = TRUE)"
                        },
                        {
                            name: "var",
                            wrapped: "var(%, na.rm = TRUE)"
                        }
                    ],
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    required: true,
                    extraction: "NoPrefix|UseComma",
                    counts: true,
                    upperdesc: aggregate.t('upperdesc'),
                })
            },
            groupBy: {
                el: new dstVariableList(config, {
                    label: aggregate.t('groupBy'),
                    no: "groupBy",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "CustomFormat",
                    wrapped: "%>% dplyr::group_by(%val%)"
                })
            },
        }
        const content = {
            head: [],
            left: [objects.content_var.el.content],
            right: [objects.datasetname.el.content, objects.showResultsinOutput.el.content, objects.wrapC.el.content, objects.groupBy.el.content,],
            bottom: [],
            nav: {
                name: aggregate.t('navigation'),
                icon: "icon-aggregate",
                modal: config.id,
                description: aggregate.t('description')
            },
            sizeleft: 3,
            sizeright: 9
        }
        super(config, objects, content);
        
        this.help = {
            title: aggregate.t('help.title'),
            r_help: aggregate.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: aggregate.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new aggregate().render()
}
