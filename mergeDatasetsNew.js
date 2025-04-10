/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */














class mergeDatasetsNew extends baseModal {
    static dialogId = 'mergeDatasetsNew'
    static t = baseModal.makeT(mergeDatasetsNew.dialogId)

    constructor() {
        var config = {
            id: mergeDatasetsNew.dialogId,
            label: mergeDatasetsNew.t('title'),
            modalType: "two",
            splitProcessing:false,
            RCode: `
{{selected.out | safe}} <- {{selected.mergetype | safe}}(
    {{dataset.name}},
    {{selected.select12 | safe}},
    c({{selected.join | safe}}),
    {{if(options.selected.suffix != "")}}suffix = {{selected.suffix | safe}}{{/if}}
    )
BSkyLoadRefreshDataframe("{{selected.out | safe}}")
`,
        }
        var objects = {
            select12: {
                el: new selectDataset(config, {
                    no: 'select12',
                    /*label: mergeDatasetsNew.t('selectAPackage'),*/
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: "",          
                })
            },  
             join: {
                el: new mergeJoin(config, {
                    no: 'join',
                    label: mergeDatasetsNew.t('join'),
                    multiple: false,
                    required:true,
                    extraction: "NoPrefix|UseComma",
                    options: [],
                    default: "", 
                })
            },               
            out: {
                el: new input(config, {
                    no: 'out',
                    label: mergeDatasetsNew.t('out'),
                    overwrite: "dataset",
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    type: "character",
                    required: true,
                }),
            },    
            label1: { el: new labelVar(config, { no: 'label1',  label: mergeDatasetsNew.t('label1'), h: 5, style: "mt-1", }) },
            leftjoin: {
                el: new radioButton(config, { label: mergeDatasetsNew.t('leftjoin'), no: "mergetype", increment: "leftjoin", value: "dplyr::left_join", state: "checked", extraction: "ValueAsIs" })
            },
            rightjoin: {
                el: new radioButton(config, { label: mergeDatasetsNew.t('rightjoin'), no: "mergetype", increment: "rightjoin", value: "dplyr::right_join", state: "", extraction: "ValueAsIs" })
            },
            innerjoin: {
                el: new radioButton(config, { label: mergeDatasetsNew.t('innerjoin'), no: "mergetype", increment: "innerjoin", value: "dplyr::inner_join", state: "", extraction: "ValueAsIs" })
            },
            fulljoin: {
                el: new radioButton(config, { label: mergeDatasetsNew.t('fulljoin'), no: "mergetype", increment: "fulljoin", value: "dplyr::full_join", state: "", extraction: "ValueAsIs" })
            },
            semijoin: {
                el: new radioButton(config, { label: mergeDatasetsNew.t('semijoin'), no: "mergetype", increment: "semijoin", value: "dplyr::semi_join", state: "", extraction: "ValueAsIs" })
            },
            antijoin: {
                el: new radioButton(config, { label: mergeDatasetsNew.t('antijoin'), no: "mergetype", increment: "antijoin", value: "dplyr::anti_join", state: "", extraction: "ValueAsIs" })
            },

            suffix: {
                el: new input(config, {
                    no: 'suffix',
                    style: "mt-3",
                    label: mergeDatasetsNew.t('suffix'),
                    placeholder: "",
                    style: "mt-3",
                    allow_spaces:true,
                    extraction: "CreateArray",
                    type: "character",
                    value: ".x,.y",
                })
            },
        }
        
        const content = {
            head: [],
           left: [  objects.select12.el.content],
            right: [objects.out.el.content, objects.join.el.content, objects.label1.el.content, objects.leftjoin.el.content, objects.rightjoin.el.content, objects.innerjoin.el.content, objects.fulljoin.el.content, objects.semijoin.el.content, objects.antijoin.el.content,objects.suffix.el.content],
           
            nav: {
                name: mergeDatasetsNew.t('navigation'),
                icon: "icon-merge_right",
                modal: config.id,
                description: mergeDatasetsNew.t('description')
            },
            sizeleft: 4,
            sizeright: 8
        }
        super(config, objects, content);
        
        this.help = {
            title: mergeDatasetsNew.t('help.title'),
            r_help: mergeDatasetsNew.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: mergeDatasetsNew.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new mergeDatasetsNew().render()
}
