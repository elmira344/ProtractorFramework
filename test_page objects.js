const { browser, element } = require("protractor");

class test_po {

//continue button after we upload the GNL
get continueBtn () {
    return element(by.css('.nv-button.primary.action'));
}

//to click either MAP or delete after we upload the file
async processBtn(btnName){
    return await element(by.css('#'+btnName+'Button'))
}

//to open column dropdowns
async dropDownBtn(dropdownName){
    return element(by.css("[aria-label='"+dropdownName+"'] + button"))
    // return element(by.xpath("//div[@aria-label='Posted Date']/following-sibling::button"))
}


//option to select after opening the drop down
async optionToSelect(option){
    return element(by.css("[title='"+option+"']"));
}

//map options under Document Type 
async mapColumnOptions(option){
    //return await element(by.xpath("//label[contains(text(),'"+option+"')]"))
    return await element(by.xpath("//label[contains(text(),'General Ledger Entries (GJ)')]/ancestor::li//*[@class='input']"))
}

//checkboxes to select under map options
async mapColumnCheckbox(checkboxName){
    return element(by.css("div[title='"+checkboxName+"'] nv-checkbox"))
}

get map(){
    return element(by.xpath("//button[contains(text(),'Map column values')]"))
}
//method for selecting checkboxes under Document type
async mapColumnValues(){
    await util.waits.waitAndClick(this.map,20000);
    //await this.map.click()
    const col1=await this.mapColumnOptions('General Ledger Entries (GJ)')
    await col1.click()
    const col2=await this.mapColumnCheckbox('Recurring')
    await col2.click()
    const col3=await this.mapColumnCheckbox('Sales')
    await col3.click()
}

get Debit(){
    return element(by.xpath("//button[@class='option-button ellipsis invalid']"))
}

//method for selecting radiobuttons under Debit-Amount Column
async DebitCreditOptions(optionToClick){
    await util.waits.waitAndClick(this.Debit,20000);
    // await this.Debit.click()
    const radioOption =await element(by.css("div[role='radio'][aria-label='"+optionToClick+"']"))
    await radioOption.click()
}

async btnToImport(btnName){
    const btn = await element(by.css("."+btnName+"-button > .nv-button"))
    // await btn.clik()
    await util.waits.waitAndClick(btn,20000);
}

//method to open dropdown and select options
async selectDropDownValue(name,option){
    const col1=await this.dropDownBtn(name)
    await col1.click()
    const col2=await this.optionToSelect(option)
    await col2.click()
}

//main method to select all dropdown values for GL process 
async importGNL(){
    await this.selectDropDownValue('Posted Date','Posting Date')
    await this.selectDropDownValue('Document Type','Document Type')
    await this.mapColumnValues()
    await this.selectDropDownValue('Account Identifier','Account Identifier')
    await this.selectDropDownValue('Main Account Description','Main Account Description')
    await this.selectDropDownValue('Entry Number','Entry Number')
    await this.selectDropDownValue('Entered Date','Entered Date')
    await this.selectDropDownValue('Document Number','Document Number')
    await this.selectDropDownValue('Entered By','Entered By')
    await this.selectDropDownValue('Detail Comment','Detail Comment')
   await this.selectDropDownValue('Debit - Amount','Amount')
   await this.DebitCreditOptions('Debit')
   await this.selectDropDownValue('Credit - Amount','Amount')
    await this.btnToImport('import')
}

//Method to process the GL
async configureInput(btnName){
await this.continueBtn.click()
const btn = await this.processBtn(btnName)
await btn.click()
}

// document.querySelector("[aria-label='Document Type'] + button").click()
// undefined
// document.querySelector("[title='Entry Number']").click()
// undefined
// document.querySelector("[title='Document Number']").click()
// undefined
// document.querySelector("[title='Document Type']").click()

// //button[contains(text(),'Map column values')]
// //label[contains(text(),'General Ledger Entries (GJ)')]
// //label[contains(text(),'General Ledger Entries (GJ)')]/ancestor::li//*[@class='multi-select']
// div[title='Recurring'] nv-checkbox

}

module.exports = test_po;