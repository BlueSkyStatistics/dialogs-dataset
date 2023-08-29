
var localization = {
    en: {
        title: "Subset Dataset",
        navigation: "Subset",
        label0: "You can choose to save the results in a new dataset or overwrite the existing dataset",
        label1: "Options",
        New: "Save results to a new dataset",
        newdatasetname: "Enter a dataset name",
        Existing: "Overwrite existing dataset",
        Output: "Display results in the output window",
        distinct: "Select distinct cases",
        chkbox2: "Remove unused factor levels",
        subsetvars: "Select variables to include in subsetted dataset",
        label12: "\n\nSubsetting criteria is applied against each row, see examples below. \n1: Select rows where var 1 is non empty and var2 is empty specify:\n!is.na(var1) & is.na(var2) \n2: Select rows where var1 > 30 and var 2 is Male specify:\nvar1>30 & var2=='Male' \n3: Complex and or criteria specify:\n(var1 !=10 & var2>20) | var3==40 \n4: Pattern match (xxx) or an exact match (abc) specify:\n(grepl(\"xxx\",var1) ==TRUE) | var1==\"abc\" \n5: Match a substring by position specify: substr(var1,2,4) ==\"abc\"",
        subsetexpression: "Enter subsetting criteria.",
        help: {
            title: "Subset Dataset",
            r_help: "help(select, package=dplyr)",
            body: `
            <b>Description</b></br>
Subset datasets/dataframe. Returns a subset of the dataframe/dataset. You can specify the columns/variables that you want in the smaller dataset. You can also specify selection criteria to be applied against each row of the dataframe.
<br/>
<b>Usage</b>
<br/>
<code> 
subset(x, subset, select)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x: object to be subsetted.
</li>
<li>
subset: logical expression indicating elements or rows to keep: missing values are taken as false.
</li>
<li>
select: expression, indicating columns to select from a data frame.
</li>
</ul>
<b>Value</b><br/>
Returns a subsetted dataset<br/>
<b>Package</b></br>
dplyr<br/>  
<b>Help</b></br>
help(select, package=dplyr)
`}
    }
}


class subsetDataset extends baseModal {
    constructor() {
        var config = {
            id: "subsetDataset",
            label: localization.en.title,
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
            label0: { el: new labelVar(config, { label: localization.en.label0, h: 6 }) },
            content_var: { el: new srcVariableList(config, {scroll:true}) },
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 5 }) },
            New: { el: new radioButton(config, { label: localization.en.New, no: "rd", increment: "New", required: true, value: "TRUE", state: "checked", extraction: "ValueAsIs", dependant_objects: ['newdatasetname'] }) },
            newdatasetname: {
                el: new input(config, {
                    no: 'newdatasetname',
                    label: localization.en.newdatasetname,
                    placeholder: "",
                    extraction: "TextAsIs",
                    type: "character",
                    overwrite: "dataset",
                    ml: 4,
                })
            },
            Existing: { el: new radioButton(config, { label: localization.en.Existing, no: "rd", increment: "Existing", value: "X", state: "", syntax: "{{dataset.name}}", extraction: "ValueAsIs" }) },
            Output: { el: new radioButton(config, { label: localization.en.Output, no: "rd", increment: "Output", value: "#$*BSkyOutputTrue#$*", state: "", extraction: "ValueAsIs" }) },
            //   Output: { el: new radioButton(config, {label: localization.en.Output, no: "rd", increment: "Output", value: "TRUE", state: "", extraction: "ValueAsIs" })},
            distinct: {
                el: new checkbox(config, {
                    label: localization.en.distinct,
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
                    label: localization.en.chkbox2,
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
                    label: localization.en.subsetvars,
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
                    label: localization.en.subsetexpression,
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
                    label: localization.en.subsetexpression,
                    placeholder: "",
                    extraction: "TextAsIs",
                    wrapped: '%>%\n\tdplyr::filter(%val%)',
                    type: "character",
                    allow_spaces:true
                })
            },
 */

            label12: { el: new preVar(config, { no: "label12", label: localization.en.label12, h: 6 }) },


        }
        const content = {
            head: [objects.label0.el.content,],
            left: [objects.content_var.el.content],
            right: [objects.label1.el.content, objects.New.el.content, objects.newdatasetname.el.content, objects.Existing.el.content, objects.Output.el.content, objects.distinct.el.content, objects.chkbox2.el.content, objects.subsetvars.el.content, objects.label12.el.content, objects.subsetexpression.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-funnel",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new subsetDataset().render()