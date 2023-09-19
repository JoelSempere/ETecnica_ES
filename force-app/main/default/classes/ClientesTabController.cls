public  class ClientesTabController {

    @AuraEnabled
    public static List<Cliente__c> getClients() {
        return [
                    SELECT Id, Name, Apellidos__c, Telefono__c, Email__c
                    FROM Cliente__c
                ];
    }

    @AuraEnabled
    public static void saveClient(Cliente__c client) {
        System.debug(client);
        insert client;
    }
}