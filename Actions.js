describe('Actions demo',() => {
   
    it('Open Juliemr website', function () {
      
    
        browser.get("http://juliemr.github.io/protractor-demo/");
        element(by.model("userInputQuery")).sendKeys("river");
        
       
    });
})