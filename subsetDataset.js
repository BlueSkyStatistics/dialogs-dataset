



class subsetDataset extends baseModal {
    static dialogId = 'subsetDataset'
    static t = baseModal.makeT(subsetDataset.dialogId)

    constructor() {
        var config = {
            id: subsetDataset.dialogId,
            label: subsetDataset.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `



require (dplyr)
{{if (options.selected.rd =="#$*BSkyOutputTrue#$*")}}
#Create the subsetted dataset
\nBSkyTempObjForSubset <- {{dataset.name}} {{if (options.selected.subsetexpression != "")}}%>%\n\tdplyr::filter({{selected.subsetexpression | safe}}){{/if}} {{selected.subsetvars | safe}}{{selected.distinct | safe}}{{selected.chkbox2 | safe }}
\n#Convert the results to a dataframe for compatibility with BSkyFormat
BSkyTempObjForSubset <- as.data.frame(BSkyTempObjForSubset)
BSkyFormat(BSkyTempObjForSubset, singleTableOutputHeader="Subset Results")
{{#else}}
#Creates the subsetted dataset
{{if (options.selected.newdatasetname !== "")}}{{selected.newdatasetname | safe}}{{#else}}{{selected.rd | safe}}{{/if}} <- {{dataset.name}} {{if (options.selected.subsetexpression != "")}}%>%\n\tdplyr::filter({{selected.subsetexpression | safe}}){{/if}} {{selected.subsetvars | safe}}{{selected.distinct | safe}}{{selected.chkbox2 | safe}}
\n#Refreshes the subsetted dataset in the data grid
BSkyLoadRefresh({{if (options.selected.newdatasetname !== "")}}'{{selected.newdatasetname | safe}}'{{#else}}'{{selected.rd | safe}}'{{/if}})
{{/if}}
{{if (options.selected.rd =="#$*BSkyOutputTrue#$*")}}
if (exists('BSkyTempObjForSubset')) rm(BSkyTempObjForSubset)
{{/if}}
`
        }
        var objects = {
            label0: { el: new labelVar(config, { label: subsetDataset.t('label0'), h: 6 }) },
            content_var: { el: new srcVariableList(config, {scroll:true}) },
            label1: { el: new labelVar(config, { label: subsetDataset.t('label1'), h: 5 }) },
            New: { el: new radioButton(config, { label: subsetDataset.t('New'), no: "rd", increment: "New", required: true, value: "TRUE", state: "checked", extraction: "ValueAsIs", dependant_objects: ['newdatasetname'] }) },
            newdatasetname: {
                el: new input(config, {
                    no: 'newdatasetname',
                    label: subsetDataset.t('newdatasetname'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    type: "character",
                    overwrite: "dataset",
                    ml: 4,
                })
            },
            Existing: { el: new radioButton(config, { label: subsetDataset.t('Existing'), no: "rd", increment: "Existing", value: "X", state: "", syntax: "{{dataset.name}}", extraction: "ValueAsIs" }) },
            Output: { el: new radioButton(config, { label: subsetDataset.t('Output'), no: "rd", increment: "Output", value: "#$*BSkyOutputTrue#$*", state: "", extraction: "ValueAsIs" }) },
            //   Output: { el: new radioButton(config, {label: subsetDataset.t('Output'), no: "rd", increment: "Output", value: "TRUE", state: "", extraction: "ValueAsIs" })},
            distinct: {
                el: new checkbox(config, {
                    label: subsetDataset.t('distinct'),
                    no: "distinct",
                    style: "mt-2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "%>%\n\tdistinct",
                    false_value: " ",
                    newline: true,
                })
            },
            chkbox2: {
                el: new checkbox(config, {
                    label: subsetDataset.t('chkbox2'),
                    no: "chkbox2",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: " %>%\n\tdroplevels()",
                    false_value: " ",
                    newline: true,
                })
            },
            subsetvars: {
                el: new dstVariableList(config, {
                    label: subsetDataset.t('subsetvars'),
                    no: "subsetvars",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    wrapped: '%>%\n\tdplyr::select(%val%)',
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            subsetexpression: {
                el: new advancedTextBox(config, {
                    no: 'subsetexpression',
                    label: subsetDataset.t('subsetexpression'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    wrapped: '%>%\n\tdplyr::filter(%val%)',
                    type: "character",
                    allow_spaces:true
                })
            },
           /*  subsetexpression: {
                el: new input(config, {
                    no: 'subsetexpression',
                    label: subsetDataset.t('subsetexpression'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    wrapped: '%>%\n\tdplyr::filter(%val%)',
                    type: "character",
                    allow_spaces:true
                })
            },
 */

            label12: { el: new preVar(config, { no: "label12", label: subsetDataset.t('label12'), h: 6 }) },


        }
        const content = {
            head: [objects.label0.el.content,],
            left: [objects.content_var.el.content],
            right: [objects.label1.el.content, objects.New.el.content, objects.newdatasetname.el.content, objects.Existing.el.content, objects.Output.el.content, objects.distinct.el.content, objects.chkbox2.el.content, objects.subsetvars.el.content, objects.label12.el.content, objects.subsetexpression.el.content],
            nav: {
                name: subsetDataset.t('navigation'),
                icon: "icon-funnel",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: subsetDataset.t('help.title'),
            r_help: subsetDataset.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: subsetDataset.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new subsetDataset().render()
}
