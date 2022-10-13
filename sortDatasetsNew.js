













var localization = {
    en: {
        title: "Sort Dataset",
        navigation: "Sort",
        ctrlName: "Sort Options",
        upperdesc: "Specify a sort order, select asc for ascending, desc for descending",
        lowerdescdesc: "Drag and drop the variables you want to sort",
        label1: "**To sort a variable in descending order, you must select desc from the sort options and move the variable you want to sort by.",
        label2: "ONLY WHEN YOU SEE DESC(VARIABLE NAME) IN THE LIST IS THE VARIABLE SORTED IN DESCENDING ORDER",
        showResultsinOutput: "Show results in output",
    }
}
class sortDatasetsNew extends baseModal {
    constructor() {
        var config = {
            id: "sortDatasetsNew",
            label: localization.en.title,
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
                    label: localization.en.ctrlName,
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
                    upperdesc: localization.en.upperdesc,
                    lowerdescdesc: localization.en.lowerdescdesc,
                })
            },
            showResultsinOutput: {
                el: new checkbox(config, {
                    label: localization.en.showResultsinOutput,
                    no: "showResultsinOutput",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 6 }) },
            label2: { el: new labelVar(config, { label: localization.en.label2, h: 6 }) },
        }
        const content = {
            head: [],
            left: [objects.content_var.el.content],
            right: [objects.sortO.el.content, objects.label1.el.content, objects.label2.el.content, objects.showResultsinOutput.el.content],
            bottom: [],
            nav: {
                name: localization.en.navigation,
                icon: "icon-sort_vertical",
                modal: config.id
            },
            sizeleft: 3,
            sizeright: 9
        }
        super(config, objects, content);
    }
}
module.exports.item = new sortDatasetsNew().render()