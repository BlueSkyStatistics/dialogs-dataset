
var localization = {
    en: {
        title: "Remove Split",
        navigation:"Remove Split",
        label1: "Removes the split (if a split is set on the dataset). Click the button on the top right to execute the dialog",
        help: {
            title: "Remove Split",
            r_help: "",
            body: `<b>Description</b></br>
        Removes the split on the dataset. Splits, see Data>Group By>Set Split splits the data into groups based on the factors selected, once the dataset is split, the analysis you select is performed independently for each split. For example if you run a crosstabulation analysis or a hypothesis test, this analysis is performed independently for each split (the output of the analysis is also generated separately for each split). 
         <br/>
                <b>Usage</b>
                <br/>
                     <code> 
        BSkySetDataFrameSplit(colnames =c(),datasetnameorindex='dataset name')
          </code> <br/>
            <b>Arguments</b><br/>
                 <ul>
                   <li>
        col.names: These are the column names/variable names that you want to split the dataset by, e.g. col.names =c("var1", "var2"). To reset the split, set to c()
         </li>
                <li>
        datasetnameorindex: this is the name of the dataset.​
          </li>
               
                </ul>
            <b>Package</b></br>
               Not applicable, this function is an internal function in the BlueSky package. This function basically removes the split attribute on the dataset. </br>
                <b>Help</b></br>
        NA
        `}
    }
}



class removeSplit extends baseModal {
    constructor() {
        var config = {
            id: "removeSplit",
            label: localization.en.title,
            modalType: "one",
            splitProcessing:false,
            RCode: `
BSkySetDataFrameSplit(c(),'{{dataset.name}}')
                `
        }
        var objects = {

            label1: {el: new labelVar(config, {no: 'label1', label: localization.en.label1, h: 9}) },
          }
        const content = {
            items: [objects.label1.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-switch_off",
				positionInNav: 0,				
                modal: config.id
            }
        }
        super(config, objects, content);
    }
}
module.exports.item = new removeSplit().render()