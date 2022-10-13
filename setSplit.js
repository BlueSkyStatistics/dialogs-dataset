
var localization = {
    en: {
        title: "Set Split",
        navigation: "Split",
        label0: "Splits allow you to seperate the dataset into groups defined by one or more split variables. Analysis is performed seperately for each group.",
        SelectedVars: "Select variables to split by",
        help: {
            title: "Set Split",
            r_help: "",
            body: `<b>Description</b></br>
        Splits the data into groups based on the factors selected, once the dataset is split, the analysis you select is performed independently for each split. For example if you run a crosstabulation analysis or a hypothesis test, this analysis is performed independently for each split (the output of the analysis is also generated separately for each split). 
         <br/>
                <b>Usage</b>
                <br/>
                     <code> 
        BSkySetDataFrameSplit(col.names, datasetnameorindex, removeall.splits = FALSE)
          </code> <br/>
            <b>Arguments</b><br/>
                 <ul>
                   <li>
        col.names: These are the column names/variable names that you want to split the dataset by, e.g. col.names =c("var1", "var2").
         </li>
                <li>
        datasetnameorindex: this is the name of the index.​
          </li>
                <li>
        removeall.splits: TRUE splits are removed, FALSE splits are added.
         </li>
                </ul>
            <b>Package</b></br>
               Not applicable, this function is an internal function in the BlueSky package. This function basically sets attributes on the dataset. Based on these attributes, we run the analysis on each split independently.</br>
                <b>Help</b></br>
        NA
        `}
    }
}






class setSplit extends baseModal {
    constructor() {
        var config = {
            id: "setSplit",
            label: localization.en.title,
            modalType: "two",
            splitProcessing:false,
            RCode: `
BSkySetDataFrameSplit(c({{selected.SelectedVars | safe}}),'{{dataset.name}}')
`
        }
        var objects = {
            label0: { el: new labelVar(config, { label: localization.en.label0, h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            SelectedVars: {
                el: new dstVariableList(config, {
                    label: localization.en.SelectedVars,
                    no: "SelectedVars",
                    filter: "String|Numeric|Date|Ordinal|Nominal",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            head: [objects.label0.el.content],
            left: [objects.content_var.el.content],
            right: [objects.SelectedVars.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-switch_on",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new setSplit().render()