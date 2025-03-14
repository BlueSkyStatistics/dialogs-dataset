/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */














class transposeEntireDataset extends baseModal {
    static dialogId = 'transposeEntireDataset'
    static t = baseModal.makeT(transposeEntireDataset.dialogId)

    constructor() {
        var config = {
            id: transposeEntireDataset.dialogId,
            label: transposeEntireDataset.t('title'),
            modalType: "one",
            splitProcessing:false,
            RCode: `
            #Transpose the dataset 
{{selected.transposedDataset | safe}} <- as.data.frame(base::t({{dataset.name}}))
#Refreshes the transposed dataset in the data grid
BSkyLoadRefresh("{{selected.transposedDataset | safe}}")
    `
        }
        var objects = {
            transposedDataset: {
                el: new input(config, {
                    no: 'transposedDataset',
                    label: transposeEntireDataset.t('transposedDataset'),
                    placeholder: "",
                    extraction: "TextAsIs",
                    required: true,
                    type: "character",
                    value: "",
                })
            },
        }
        const content = {
            items: [objects.transposedDataset.el.content],
            nav: {
                name: transposeEntireDataset.t('navigation'),
                icon: "icon-transpose-dataset",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: transposeEntireDataset.t('help.title'),
            r_help: transposeEntireDataset.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: transposeEntireDataset.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new transposeEntireDataset().render()
}
