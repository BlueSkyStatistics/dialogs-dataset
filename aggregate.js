













var localization = {
    en: {
        title: "Aggregate Data",
        navigation: "Aggregate",
        description: `Aggregates one or more numeric(scale) variables by one or more factor variables and creates a new aggregated dataset. For numeric variables we calculate the following:
        mean, median, sum, sd, n_distinct, max, min and var. 
        It also compute counts in the aggregated dataset.`,
        label1: "Aggregate options",
        upperdesc: "Select the function you want applied to the variables being aggregated",
        datasetname: "Enter the name of the aggregated dataset",
        showResultsinOutput: "Display results in the output window",
        groupBy: "Group by (Variables of type factor or date)",
        help: {
            title: "Aggregate to Dataset",
            r_help: "help(group_by, package=dplyr)",
            body: `
            <b>Description</b></br>
Aggregates one or more numeric(scale) variables by one or more factor variables and creates a new aggregated dataset. For numeric variables we calculate the following:
mean, median, sum, sd, n_distinct, max, min and var. 
It also compute counts in the aggregated dataset.
<br/>
<b>Usage</b>
<br/>
     <code> 
newDatasetName <- Dataset %>% dplyr::group_by(var1) %>% dplyr::summarize(Count=n(), newvarmean=mean(var2 ,na.rm =TRUE),newvarmedian=median(var3, na.rm =TRUE))</br>
## Refresh the dataset</br>
BSkyLoadRefresh("newDatasetName" )
   </code> <br/>
    <b>Arguments</b>
 <ul>
   <li>
var1: factor to group by
</li>
<li>
var2, var3: variable to aggregate
</li>
<li>
newvarmean: mean of var2 grouped by var1 in the aggregated dataset
</li>
<li>
​newvarmedian: median of var3 grouped by var1 in the aggregated dataset
</li>
</ul>
            `}
    }
}
class aggregate extends baseModal {
    constructor() {
        var config = {
            id: "aggregate",
            label: localization.en.title,
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
                    label: localization.en.datasetname,
                    placeholder: "",
                    required: true,
                    extraction: "TextAsIs",
                    overwrite: "dataset",
                    value: ""
                })
            },
            showResultsinOutput: {
                el: new checkbox(config, {
                    label: localization.en.showResultsinOutput,
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
                    label: localization.en.label1,
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
                    upperdesc: localization.en.upperdesc,
                })
            },
            groupBy: {
                el: new dstVariableList(config, {
                    label: localization.en.groupBy,
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
                name: localization.en.navigation,
                icon: "icon-aggregate",
                modal: config.id,
                description: localization.en.description
            },
            sizeleft: 3,
            sizeright: 9
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new aggregate().render()