({
    doInit : function(component, event, helper) {
        helper.columns(component);
        helper.initClients(component, helper);
    },

    handleSave : function(component, event, helper) {
        let client = component.get('v.cliente');
        let isValid = helper.checkValidity(component, helper);
        if(isValid) {
            helper.saveRecord(component, helper, client);
        }
        else {
            helper.showToast('WARNING', 'Por favor, complete los campos antes de guardar', 'warning');
        }
    }
})