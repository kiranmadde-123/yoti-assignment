public  class YotiDemoClass {
   
    @AuraEnabled(cacheable=true)
    public static List<E_Sign_Request__c> geteSignRequestList(){

        List<E_Sign_Request__c> eSignRequestList =[Select Id, Envelope_name__c, Sent_to__c, Signing_Status__c, Sent_on__c,View_Details__c From E_Sign_Request__c];
       return eSignRequestList;
    }
}