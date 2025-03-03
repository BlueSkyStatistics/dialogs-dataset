/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */




class expandDataByWeights extends baseModal {
    static dialogId = 'expandDataByWeights'
    static t = baseModal.makeT(expandDataByWeights.dialogId)

    constructor() {
        var config = {
            id: expandDataByWeights.dialogId,
            label: expandDataByWeights.t('title'),
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
                    label: expandDataByWeights.t('datasetname'),
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
                    label: expandDataByWeights.t('destination'),
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
                name: expandDataByWeights.t('navigation'),
                // icon: "icon-iconfinder_gn-s_basic_arrows_r_0010-28_1048413",
                icon: "icon-expand",
                modal: config.id
            }
        };
        super(config, objects, content);
        
        this.help = {
            title: expandDataByWeights.t('help.title'),
            r_help: expandDataByWeights.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: expandDataByWeights.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new expandDataByWeights().render()
}
