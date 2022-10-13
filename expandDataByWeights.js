
var localization = {
    en: {
        title: "Expand Weights",
        navigation: "Expand",
        datasetname: "Name of the dataset with weights expanded",
        destination: "Enter column that contains the weights",
        help: {
            title: "Expand Weights",
            r_help: "help(expandRows, package=splitstackshape)",
            body: `<b>Description</b></br>
        Creates a new dataset with rows expanded as per weights. Expands (replicates) the rows of a data.frame  by a value contained in one of the columns in the source data.frame or data.table. BSkySetWeights() calls expandRows() from the package splitstackshape.
        <br/>
        <b>Usage</b>
        <br/>
             <code> 
        BSkySetWeight(weights, data, newdata)
        </code> <br/>
          <b>Arguments</b><br/>
         <ul>
           <li>
        weights: The dataset variable that contains the weights. 
        </li>
        <li>
        data: The input data.frame or data.table.
        </li>
        <li>
        newdata: The new dataset where the rows are replicated for the weights specified.
        </li>
        </ul>
        <b>Package</b></br>
        splitstackshape</br>
        <b>Help</b></br>
        help (expandRows)
        `}
    }
}

class expandDataByWeights extends baseModal {
    constructor() {
        var config = {
            id: "expandDataByWeights",
            label: localization.en.title,
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(splitstackshape)
# expanding the dataset according to the weights
BSkybool = BSkySetWeight( weights="{{selected.destination | safe}}", data="{{dataset.name}}", newdata="{{selected.datasetname | safe}}")
# Loading the dataset in the grid if the operation above is successful
BSkyLoadRefresh(bskyDatasetName="{{selected.datasetname | safe}}",load.dataframe=BSkybool )
# removing the BSkybool object
rm(BSkybool)
`
        };
        var objects = {
            datasetname: {
                el: new input(config, {
                    no: 'datasetname',
                    label: localization.en.datasetname,
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    required: true,
                    type: "character",
                    overwrite: "dataset",
                })
            },
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            destination: {
                el: new dstVariable(config, {
                    label: localization.en.destination,
                    no: "destination",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
        };
        const content = {
            head: [objects.datasetname.el.content],
            left: [objects.content_var.el.content],
            right: [objects.destination.el.content,],
            nav: {
                name: localization.en.navigation,
                // icon: "icon-iconfinder_gn-s_basic_arrows_r_0010-28_1048413",
                icon: "icon-expand",
                modal: config.id
            }
        };
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new expandDataByWeights().render()