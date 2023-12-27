

var localization = {
    en: {
        title: "Split (or Collapse) a Dataset with Repeating Group of Columns",
        navigation: "Repeating Columns",
		
		removeColsWithConstantChk:"Remove all columns with constant values before splitting or collapsing",
		resultDatasetNameSuffix: "(Optional) A string to be used as the suffix for the output dataset name(s)",
		splitDatasetRad: "Split the dataset into multiple datasets based on the repeating column group",
		autoDetectColGroupLengthRad: "Automatically detect the repeating column group to split or collapse",
		manualColGroupLengthRad: "Specify the length of the repeating column group to be used for splitting or collapsing", 
		manualRepeatingColumnGroupLength: "Length of the column group",
		outputColumnNames: "(Optional) List of column names (comma separated) to be used for the output dataset(s)",
		collapseDatasetRad: "Collapse to create one long dataset instead of splitting into multiple datasets",
		collapseGpIDPrefix: "(Collapsed dataset) Prefix to use to ID the rows for the dataset they belong to",
		collapseGpIDColName: "(Collapsed dataset) Dataset group ID column name",
		makeCollapseGpIDColFactorChk: "(Collapsed dataset) Make Dataset group ID column a factor",
		label1: "Detection of repeating column group",
		label2: "Split or Collapse the dataset?",
		
		
        help: {
            title: "Split (or Collapse) a Dataset with Repeating Group of Columns",
            r_help: "",
            body: `
            <b>Description</b></br>
            This dialog is used to split (into multiple datasets) or collapse (into one long dataset) a datset with repeated set of columns
			<br/>
			<br/>
			To try this, you may use the sample dataset file called multiProcData.xlsx (under Split_Collapse_Repeated_Columns subdir). 
			Open the file and choose the multProcess tab with file open menu to open in the data grid 			
			<br/>
			<br/>
`}
    }
}


class splitRepeatCols extends baseModal {
    constructor() {
        var config = {
            id: "splitRepeatCols",
            label: localization.en.title,
            modalType: "one",
            RCode:`
	
	BSkySplitCollapseDatasetWithRepeatingColumns(
						datasetNameStr = '{{dataset.name}}', 
						splitDatsetSuffix = "{{selected.resultDatasetNameSuffix | safe}}", 
						removeColsWithConstant = {{selected.removeColsWithConstantChk | safe}},
{{if(options.selected.autoColGroupRad === "auto")}}
						columnGpLength = 0,
{{#else}}
						columnGpLength = c({{selected.manualRepeatingColumnGroupLength | safe}}),
{{/if}}
						outputColumnNames = {{selected.outputColumnNames | safe}},
						collapseDataset = {{selected.splitCollapseRad | safe}},
						collapseGpIDPrefix ="{{selected.collapseGpIDPrefix | safe}}", 
						collapseGpIDColName="{{selected.collapseGpIDColName | safe}}", 
						makeCollapseGpIDColFactor = {{selected.makeCollapseGpIDColFactorChk | safe}}
						)
					
`
        }
        var objects = {
            resultDatasetNameSuffix: {
                el: new input(config, {
                    no: 'resultDatasetNameSuffix',
                    label: localization.en.resultDatasetNameSuffix,
                    placeholder: "",
                    value:"",
                    extraction: "NoPrefix|UseComma",
                    required: false,
                    type: "character",
					style: "mb-2",
                })
            },
			removeColsWithConstantChk: { 
                el: new checkbox(config, {
                    label: localization.en.removeColsWithConstantChk, 
					no: "removeColsWithConstantChk",
                    bs_type: "valuebox",
					required: false,
                    style: "mb-3",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					newline: true,
                })
            },
			label2: { el: new labelVar(config, { label: localization.en.label2, style:"mt-2",h: 6 }) },
			splitDatasetRad: {
				el: new radioButton(config, {
				  label: localization.en.splitDatasetRad,
				  no: "splitCollapseRad",
				  increment: "FALSE",
				  value: "FALSE",
				  state: "checked",
				  extraction: "ValueAsIs",
				  //dependant_objects: ["autoDetectColGroupLengthRad", "manualColGroupLengthRad", "manualRepeatingColumnGroupLength"],
				})
			},
			collapseDatasetRad: {
				el: new radioButton(config, {
				  label: localization.en.collapseDatasetRad,
				  no: "splitCollapseRad",
				  increment: "TRUE",
				  value: "TRUE",
				  state: "",
				  extraction: "ValueAsIs",
				  dependant_objects: ["collapseGpIDPrefix","collapseGpIDColName","makeCollapseGpIDColFactorChk"],
				})
			},
			label1: { el: new labelVar(config, { label: localization.en.label1, style:"mt-2",h: 6 }) },
			autoDetectColGroupLengthRad: {
				el: new radioButton(config, {
				  label: localization.en.autoDetectColGroupLengthRad,
				  no: "autoColGroupRad",
				  increment: "auto",
				  value: "auto",
				  state: "checked",
				  extraction: "ValueAsIs",
				  //style: "mb-3",
				})
			},
			manualColGroupLengthRad: {
				el: new radioButton(config, {
				  label: localization.en.manualColGroupLengthRad,
				  no: "autoColGroupRad",
				  increment: "manual",
				  value: "manual",
				  //required: true,
				  state: "",
				  extraction: "ValueAsIs",
				  //style: "mb-3",
				  dependant_objects: ["manualRepeatingColumnGroupLength", "outputColumnNames"],
				})
			},
			manualRepeatingColumnGroupLength: {
                el: new input(config, {
                    no: 'manualRepeatingColumnGroupLength',
                    label: localization.en.manualRepeatingColumnGroupLength,
                    placeholder: "",
                    value:"0",
                    //extraction: "NoPrefix|UseComma",
					extraction: "TextAsIs",
                    required: false,
                    type: "numeric",
					allow_spaces:true,
					style: "ml-5",
					width: "w-25",
                })
            },
			outputColumnNames: {
                el: new input(config, {
                    no: 'outputColumnNames',
                    label: localization.en.outputColumnNames,
                    placeholder: "",
                    value:"",
                    required: false,
                    type: "character",
					allow_spaces:true,
					//extraction: "TextAsIs",
					extraction: "CreateArray",
                    //value: "",
					//wrapped: '%val%',
					style: "ml-5 mb-3",
                })
            },
			collapseGpIDPrefix: {
                el: new input(config, {
                    no: 'collapseGpIDPrefix',
                    label: localization.en.collapseGpIDPrefix,
                    placeholder: "",
                    value:"",
                    extraction: "NoPrefix|UseComma",
                    required: false,
                    type: "character",
					style: "ml-5 mb-2",
                })
            },
			collapseGpIDColName: {
                el: new input(config, {
                    no: 'collapseGpIDColName',
                    label: localization.en.collapseGpIDColName,
                    placeholder: "",
                    value:"OrigDatasetID",
                    extraction: "NoPrefix|UseComma",
                    required: false,
                    type: "character",
					style: "ml-5 mb-2",
                })
            },
			makeCollapseGpIDColFactorChk: { 
                el: new checkbox(config, {
                    label: localization.en.makeCollapseGpIDColFactorChk, 
					no: "makeCollapseGpIDColFactorChk",
                    bs_type: "valuebox",
					required: false,
                    style: "ml-5 mb-2",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
					state: "checked",
					newline: true,
                })
            },
        };
        const content = {
            items:  [
				objects.resultDatasetNameSuffix.el.content,
				objects.removeColsWithConstantChk.el.content,
				//objects.collapseDatasetChk.el.content, 
				objects.label1.el.content,
				objects.autoDetectColGroupLengthRad.el.content,
				objects.manualColGroupLengthRad.el.content,
				objects.manualRepeatingColumnGroupLength.el.content,
				objects.outputColumnNames.el.content,
				objects.label2.el.content,
				objects.splitDatasetRad.el.content, 
				objects.collapseDatasetRad.el.content,
				objects.collapseGpIDPrefix.el.content,
				objects.collapseGpIDColName.el.content,
				objects.makeCollapseGpIDColFactorChk.el.content,
			],
            nav: {
                name: localization.en.navigation,
                icon: "icon-binary-code-g",
				//datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new splitRepeatCols().render()