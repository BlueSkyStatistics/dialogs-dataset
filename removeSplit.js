/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */






class removeSplit extends baseModal {
    static dialogId = 'removeSplit'
    static t = baseModal.makeT(removeSplit.dialogId)

    constructor() {
        var config = {
            id: removeSplit.dialogId,
            label: removeSplit.t('title'),
            modalType: "one",
            splitProcessing:false,
            RCode: `
BSkySetDataFrameSplit(c(),'{{dataset.name}}')
                `
        }
        var objects = {

            label1: {el: new labelVar(config, {no: 'label1', label: removeSplit.t('label1'), h: 9}) },
          }
        const content = {
            items: [objects.label1.el.content],
            nav: {
                name: removeSplit.t('navigation'),
                icon: "icon-switch_off",
				positionInNav: 0,				
                modal: config.id
            }
        }
        super(config, objects, content);
    }
}

module.exports = {
    render: () => new removeSplit().render()
}
