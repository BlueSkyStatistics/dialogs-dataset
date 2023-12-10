
var localization = {
    en: {
        title: "Stack Datasets",
        navigation: "Stack",
        out: "Enter the name of the stacked dataset",
        in1: "Select 2 or more datasets",
        in2: "Select the 2nd dataset",
        label1: "Stack Options",
        label2: "All the options below require 2 datasets with exactly the same variable names",
        bindrows: "Bind Rows (stack datasets as is, may result in duplicate rows)",
        union: "Union (Stack datasets and remove exact duplicates)",
        intersect: "Intersect (Keep rows common to both datasets)",
        setdiff: "Difference (Keep only rows in 1st dataset but not in 2nd)",
        id: "If you would like to track which data set each observation came from, specify a name for that variable here. NOTE: The new variable gets appended to the beginning of the resulting dataset.",
        help: {
            title: "Stack Datasets",
            r_help: "help(bind_rows, package=dplyr)",
            body: `
            <b>Description</b></br>
This dialog will help you stack 2 or more datasets on top of each other. You can select one of the following options.<br/>
1. Bind Rows:  Stacks the 2 or more datasets exactly as they are. If a variable name is common to both datasets, values will fill in as you expect. If a dataset A contains a variable say var1 that is not present in the other dataset B, NA's will appear in variable var1 for all rows that correspond to dataset B.<br/>
All options below operate on ONLY 2 datasets and require that both datasets share the same variables.<br/>
2. Union: stacks the datasets and removes duplicates<br/>
3. Intersect: keeps rows common to both<br/>
4. Difference: Keeps rows in 1st dataset, not in 2nd<br/>
Depending on the option selected, the functions bind_rows, union, intersect and setdiff in the package dplyr are called.
NOTE: you can optionally track which dataset the original observation came from. The dataset ID (1st/2nd) is appended to the beginning of the dataset that contains the results.<br/>
<b>Package</b></br>
dplyr</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(bind_rows, package="dplyr") in the R syntax window
            `,
        }
    }
}
class stackDatasets extends baseModal {
    constructor() {
        var config = {
            id: "stackDatasets",
            label: localization.en.title,
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
                    label: localization.en.out,
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
                  label: localization.en.in1,
                  no: "in1",
                  filter: "Dataset",
                  extraction: "UseComma",
                  required: true,
                })
              },
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 5, style: "mt-1", }) },
            bindrows: {
                el: new radioButton(config, { label: localization.en.bindrows, no: "mergetype", increment: "bindrows", value: "bind_rows", state: "checked", extraction: "ValueAsIs" })
            },
            label2: { el: new labelVar(config, { label: localization.en.label2, h: 5, style: "mt-3", }) },
            union: {
                el: new radioButton(config, { label: localization.en.union, no: "mergetype", increment: "union", value: "union", state: "", extraction: "ValueAsIs" })
            },
            intersect: {
                el: new radioButton(config, { label: localization.en.intersect, no: "mergetype", increment: "intersect", value: "intersect", state: "", extraction: "ValueAsIs" })
            },
            setdiff: {
                el: new radioButton(config, { label: localization.en.setdiff, no: "mergetype", increment: "setdiff", value: "setdiff", state: "", extraction: "ValueAsIs" })
            },
            id: {
                el: new input(config, {
                    no: 'id',
                    label: localization.en.id,
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
                name: localization.en.navigation,
                icon: "icon-stack",
                modal: config.id
            },
            sizeleft: 3,
            sizeright: 9
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new stackDatasets().render()