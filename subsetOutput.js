
var localization = {
    en: {
        title: "Subset Dataset",
        navigation: "Subset, results in output",
        label0: "The results will be shown in the output window",
        label1: "Options",
        New: "Save results to a new dataset",
        newdatasetname: "Enter a dataset name",
        Existing: "Overwrite existing dataset",
        distinct: "Select distinct cases",
        chkbox2: "Remove unused factor levels",
        subsetvars: "Select variables to include in subsetted dataset",
        subsetexpression: "Enter subsetting criteria. Subsetting criteria is applied against each dataset row. Example 1: !is.na(var1) & is.na(var2). Example 2: var1>30 & var2=='male'. Example 3: (var1 !=10 & var2>20) | var3==40. Example 4: (grepl(\"xxx\",var1) ==TRUE) | var1==\"abc\". Example 5: substr(var1,2,4) ==\"abc\"",
    }
}








class subsetOutput extends baseModal {
    constructor() {
        var config = {
            id: "subsetOutput",
            label: localization.en.title,
            modalType: "two",
            splitProcessing:false,
            RCode: `
require (dplyr)
#BSkyFormat displays the subsetted dataset in the output
BSkyFormat(as.data.frame({{dataset.name}} {{selected.subsetexpression | safe}} {{selected.subsetvars | safe}}{{selected.distinct | safe}}{{selected.chkbox2 | safe }}),singleTableOutputHeader="Subset Results")
 `
        }
        var objects = {
            label0: { el: new labelVar(config, { label: localization.en.label0, h: 6 }) },
            content_var: { el: new srcVariableList(config) },
            distinct: {
                el: new checkbox(config, {
                    label: localization.en.distinct,
                    no: "distinct",
                    extraction: "Boolean",
                })
            },
            chkbox2: {
                el: new checkbox(config, {
                    label: localization.en.chkbox2,
                    no: "chkbox2",
                    extraction: "Boolean",
                })
            },
            subsetvars: {
                el: new dstVariableList(config, {
                    label: localization.en.subsetvars,
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
                    label: localization.en.subsetexpression,
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
                name: localization.en.navigation,
                icon: "icon-funnel",
                modal: config.id
            }
        }
        super(config, objects, content);
    }
}
module.exports.item = new subsetOutput().render()