










var localization = {
    en: {
        title: "Stack Datasets",
        navigation: "Stack",
        out: "Enter the name of the stacked dataset",
        in1: "Select the 1st dataset",
        in2: "Select the 2nd dataset",
        label1: "Stack Options",
        label2: "Options below require both datasets to completely share the same variables",
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
This dialog will help you stack 2 datasets on top of each other. You can select one of the following options.<br/>
1. Bind Rows:  Stacks the 2 datasets exactly as they are. If a variable name is common to both datasets, values will fill in as you expect. If a dataset A contains a variable say var1 that is not present in the other dataset B, NA's will appear in variable var1 for all rows that correspond to dataset B.<br/>
All options below require that both datasets share the same variables.<br/>
2. Union: stacks the datasets and removes duplicates<br/>
3. Intersect: keeps rows common to both<br/>
4. Difference: Keeps rows in 1st dataset, not in 2nd<br/>
Depending on the option selected, the functions bind_rows, union, intersect and setdiff in the package dplyr are called.
NOTE: you can optionally track which dataset the original observation came from. The dataset ID (1st/2nd) is appended to the beginning of the dataset that contains the results.<br/>
<b>Package</b></br>
dplyr</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(bind_rows, package="dplyr") by creating a R code chunk by clicking + in the output window
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
{{selected.out | safe}} <- eval(parse(text = paste("{{selected.mergetype | safe}}" ,"(",{{selected.in1 | safe}}, ", ",{{selected.in2 | safe}}, ", .id = ", "{{selected.id | safe}}", ")", sep = "", collapse = "")))
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
                    type: "character",
                    required: true,
                }),
            },
            in1: {
                el: new dstVariable(config, {
                    label: localization.en.in1,
                    no: "in1",
                    filter: "Dataset",
                    extraction: "UseComma|Enclosed",
                    required: true,
                })
            },
            in2: {
                el: new dstVariable(config, {
                    label: localization.en.in2,
                    no: "in2",
                    filter: "Dataset",
                    extraction: "UseComma|Enclosed",
                    required: true,
                })
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 5, style: "mt-1", }) },
            bindrows: {
                el: new radioButton(config, { label: localization.en.bindrows, no: "mergetype", increment: "bindrows", value: "bind_rows", state: "checked", extraction: "ValueAsIs" })
            },
            label2: { el: new labelVar(config, { label: localization.en.label2, h: 6, style: "mt-1", }) },
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
                    extraction: "CreateArray",
                    type: "character",
                    value: "",
                }),
            },
        }
        const content = {
            head: [],
            left: [objects.dataset_var.el.content],
            right: [objects.out.el.content, objects.in1.el.content, objects.in2.el.content, objects.label1.el.content, objects.bindrows.el.content, objects.label2.el.content, objects.union.el.content, objects.intersect.el.content, objects.setdiff.el.content, objects.id.el.content],
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