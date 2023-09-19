({
    columns : function(component) {
        component.set('v.columns', [
            { label: 'Nombre', fieldName:"Name"},
            { label: 'Apellidos', fieldName: "Apellido__c"},
            { label: 'Teléfono', fieldName: "Telefono__c"},
            { label: 'Email', fieldName: "Email__c"},
        ]);
    },

    initClients : function(component, helper) {
        let isLoading = true;
        let action = component.get('c.getClients');
        component.set('v.isLoading', isLoading);
        try {
            action.setCallback(this, function(response) {
                
                if(response.getState() === 'SUCCESS') {
                    component.set('v.clientes', response.getReturnValue());
                }else {
                    helper.showToast('ERROR', 'No han podido recuperarse los registros', 'error');
                }
                component.set('v.isLoading', !isLoading);
            
            });
        }catch(e) {
            helper.showToast('ERROR', 'No han podido recuperarse los registros', 'error');
            console.error(e.getError());
            component.set('v.isLoading', !isLoading);
        }
        $A.enqueueAction(action);   
    },

    checkValidity : function(component, helper) {
        let canSave = true;
        let fields = component.find("field");
        for (let f of fields) {
            f.reportValidity();
            if(!f.get('v.validity').valid) {
                canSave = !canSave;
                break;    
            }   
        }
        return canSave;
    },

    saveRecord : function(component, helper, client) {
        let isLoading = true;
        let action = component.get('c.saveClient');
        action.setParams({
            client : client    
        });
        component.set('v.isLoading', isLoading);
        try {
            action.setCallback(this, function(response) {
        
            if(response.getState() === 'SUCCESS') {
                helper.showToast('Cliente registrado', 'Cliente registrado satisfactoriamente', 'success');
                helper.addToTable(component, client);
                helper.clearFields(component, client);
                
            }else {
                helper.showToast('ERROR', 'No han podido registrarse el nuevo cliente', 'error');
            }
            component.set('v.isLoading', !isLoading);
        
        });
        }catch(e) {
            helper.showToast('ERROR', 'No han podido registrarse el nuevo cliente', 'error');
            console.error(e.getError());
            component.set('v.isLoading', !isLoading);
        }
        $A.enqueueAction(action);    
    },

    clearFields : function(component, client) {
        client = {};
        component.set('v.cliente', client);
    },

    addToTable : function(component, client) {
        let clients = component.get('v.clientes');
        clients.push(client);
        component.set('v.clientes', clients);
    },

    showToast : function(title, message, type) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message,
            "type": type
        });
        toastEvent.fire();
    },
})