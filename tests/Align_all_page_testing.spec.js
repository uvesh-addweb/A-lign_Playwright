const {test , expect} = require('@playwright/test')
const utils = require('../common_utilities/utilities.spec');
const { time } = require('console');

test('Home page Validations ', async({page}) => {

    await test.step('Go to the Home page', async ()=> {
        await page.goto('https://alignorgstg:e3f1ccf1@stg.a-lign.com')    
    });

    await test.step('Validate the title of the page', async ()=> {
        await expect(page).toHaveTitle("A-LIGN | Compliance, Cybersecurity, Cyber Risk & Privacy")
    });

    await test.step('Click on "Accept All Cookies" button', async ()=> {
        await utils.clickButtonByText(page , '#onetrust-accept-btn-handler' , 'click');
        await page.waitForTimeout(2000);
    });

    await test.step('Verify the "SOC 2" Button link', async ()=> {
        await utils.clickButtonByText(page , 'SOC 2' , 'link');
        await page.waitForTimeout(2000);
    });
    
    await test.step('Verify the "ISO 27001" Button link', async ()=> {
        await utils.clickButtonByText(page , 'ISO 27001' , 'link');
        await page.waitForTimeout(2000);
    });
    
    await test.step('Verify the "HITRUST" Button link', async ()=> {
        await utils.clickButtonByText(page , 'HITRUST' , 'link');
        await page.waitForTimeout(2000);
    });
    
    await test.step('Verify the "FedRAMP" Button link', async ()=> {
        await utils.clickButtonByText(page , 'FedRAMP' , 'link');
        await page.waitForTimeout(2000);
    });
    
    await test.step('Verify the "PCI DSS" Button link', async ()=> {
        await utils.clickButtonByText(page , 'PCI DSS' , 'link');
        await page.waitForTimeout(2000);
    });
    
    await test.step('Verify the "CMMC" Button link', async ()=> {
        await utils.clickButtonByText(page , 'CMMC' , 'link');
        await page.waitForTimeout(2000);    

        await page.evaluate(() => {
            window.scrollBy(0, 400);
        });
    });
    
    await test.step('Verify the "Penetration Testing" Button link', async ()=> {
        await utils.clickButtonByText(page , 'Penetration Testing' , 'link');
        await page.waitForTimeout(2000);
    });

    await test.step('Verify the "Ransomware Preparedness" Button link', async ()=> {
        await utils.clickButtonByText(page , 'Ransomware Preparedness' , 'link');
        await page.waitForTimeout(2000);
    });
    
    await test.step('Verify the "Social Engineering" Button link', async ()=> {
        await utils.clickButtonByText(page , 'Social Engineering' , 'link');
        await page.waitForTimeout(2000);
    });
    
    await test.step('Verify the "GDPR" Button link', async ()=> {
        await utils.clickButtonByText(page , 'GDPR' , 'link');
        await page.waitForTimeout(2000);
    });
    
    await test.step('Verify the Filter functionality for "Job Listed" section', async ()=> {
        await utils.selectDropdown(page , 'Compliance');
        await page.waitForTimeout(2000);
    });

})