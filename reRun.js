
var localization = {
    en: {
        title: "Rerun analysis on different datasets",
        navigation: "Rerun analysis",
        helpText:"Rerun or reproduce analysis in an output tab by swapping original dataset(s) with new dataset(s).\nFollow steps below.\n1. The output tab selected must contain the analysis to reproduce or rerun.\n2. The new dataset(s) you want to swap in must be open in the datagrid.\n3. Specify which new dataset will be swapped with the original (from the analysis in the active output tab)\n4. To do so, select the original dataset in the 1st list and the new dataset in the \n 2nd list and click the move button.\n5. Repeat step 4 to swap multiple datasets.\n6. Hit the execute button.\n",
        allDatasets: "Datasets to swap",
        datasetsFromOutput_BSky: "Original datasets",
        mapping: "Mapped datasets",
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
class reRun extends baseModal {
    constructor() {
        var config = {
            id: "reRun",
            label: localization.en.title,
            modalType: "three",
            splitProcessing:false,
            RCode: `
{{selected.mapping | safe}}

`,
        }
        var objects = {
            helpText: {
				el: new preVar(config, {
					no: "helpText",
					label: localization.en.helpText, 
					h:7
				})
			},
            dataset_var: { el: new srcDataSetListForRerun(config, { no: "allDatasets",
                label: localization.en.allDatasets,
                action: "move" }) },       
            datasetsFromOutput_BSky: {
                el: new reRunDatasetList(config, {
                  action: "move",
                  label: localization.en.datasetsFromOutput_BSky,
                  no: "datasetsFromOutput_BSky" 
                })
              },
            
              

              mapping: {
                el: new semModelTermsDest(config, {
                  action: "move",
                  no: "mapping", 
                  label: localization.en.mapping, 
                  filter: "String|Numeric|Logical|Ordinal|Nominal|Scale", 
                  extraction: "Enclosed", 
                  firstModelTermCtrl: "datasetsFromOutput_BSky", 
                  secondModelTermCtrl: "allDatasets"
                })
              },
            
            
        }
        const content = {
            head: [objects.helpText.el.content],
            left: [objects.datasetsFromOutput_BSky.el.content],
            center: [objects.dataset_var.el.content],
            right: [objects.mapping.el.content],
            sizeleft:3,
            sizecenter: 3,
            sizeright:6,

            
            nav: {
                name: localization.en.navigation,
                icon: "icon-stack",
                modal: config.id
            },
            
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new reRun().render()