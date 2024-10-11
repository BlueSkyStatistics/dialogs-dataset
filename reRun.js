

class reRun extends baseModal {
    static dialogId = 'reRun'
    static t = baseModal.makeT(reRun.dialogId)

    constructor() {
        var config = {
            id: reRun.dialogId,
            label: reRun.t('title'),
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
					label: reRun.t('helpText'), 
					h:7
				})
			},
            dataset_var: { el: new srcDataSetListForRerun(config, { no: "allDatasets",
                label: reRun.t('allDatasets'),
                action: "move" }) },       
            datasetsFromOutput_BSky: {
                el: new reRunDatasetList(config, {
                  action: "move",
                  label: reRun.t('datasetsFromOutput_BSky'),
                  no: "datasetsFromOutput_BSky" 
                })
              },
            
              

              mapping: {
                el: new semModelTermsDest(config, {
                  action: "move",
                  no: "mapping", 
                  label: reRun.t('mapping'), 
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
                name: reRun.t('navigation'),
                icon: "icon-stack",
                modal: config.id
            },
            
        }
        super(config, objects, content);
        
        this.help = {
            title: reRun.t('help.title'),
            r_help: "help(data,package='utils')",
            body: reRun.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new reRun().render()
}
