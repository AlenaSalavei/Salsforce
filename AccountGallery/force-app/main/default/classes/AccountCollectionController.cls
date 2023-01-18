/**
 * Created by ElenaSolovey
 * on 12/14/2022.
 *
 * controller class for accountCollection component
 */

public with sharing class AccountCollectionController {

    /**
     * @description
     * @return list of Account records
     */
    @AuraEnabled
    public static List<Account> getAccountRecords(){
        List<Account> accountList = [SELECT Id, Name, Type, Budget__c, NumberOfEmployees__c, Owner.Name FROM Account];
        return accountList;
    }
}