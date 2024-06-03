const { Page } = require('@playwright/test');
const { time } = require('console');
const {test , expect} = require('@playwright/test')

async function clickButtonByText(page, buttonText, type = null) {

    if (type === null) {
        let button = await page.locator(`text("${buttonText}")`);
        if (button.isEnabled && button.isVisible) {
            let expected_url = await button.getAttribute('href');
            await button.click();
            let current_url = await page.url();

            if (current_url == expected_url) {
                console.log('URLs match. Expected:', expected_url, 'Actual:', current_url);
            } else {
                console.log('URLs do not match. Expected:', expected_url, 'Actual:', current_url);
            }
        } else {
            throw new Error('Button is not enabled and visible');
        }
    }
    else if (type === 'button') {
        let button = await page.locator(`button:text("${buttonText}")`);
        if (button.isEnabled && button.isVisible) {
            let expected_url = await button.getAttribute('href');
            await button.click();
            let current_url = await page.url();

            if (current_url == expected_url) {
                console.log('URLs match. Expected:', expected_url, 'Actual:', current_url);
            } else {
                console.log('URLs do not match. Expected:', expected_url, 'Actual:', current_url);
            }
        } else {
            throw new Error('Button is not enabled and visible');
        }
    }

    else if (type === 'link') {
        let button = await page.getByRole('link', { name: `${buttonText}` , exact : true}).first();

        if (button.isEnabled && button.isVisible) {
            let expected_url_1 = button.getAttribute('href');
            let expected_url = (await expected_url_1).toString();

            await button.click();
            // await page.waitForTimeout(2000);
            let current_url = await page.url();

            let expected_url_slug = expected_url.split('/').slice(-1)[0];
            if (expected_url_slug == ""){
                expected_url_slug = expected_url.split('/').slice(-2)[0];
            }

            let current_url_slug = current_url.split('/').slice(-1)[0];
            if (current_url_slug == ""){
                current_url_slug = current_url.split('/').slice(-2)[0];
            }

            console.log(`Current Url Slug : ${current_url_slug}, Expected Url Slug : ${expected_url_slug}`);

            try {
                test.expect(current_url_slug).toEqual(expected_url_slug);
            } catch (error) {
                // Assertion failed, take a screenshot and add a description
                await page.screenshot({ path: 'failed_assertion.png' });
                test.fail(`URLs do not match. Expected: ${expected_url_slug}, Actual: ${current_url_slug}`);
            }

            await page.goBack();
            return;
        } 
        
        else {
            await page.screenshot({ path: 'failed_assertion.png' });
            test.fail('Button is not enabled and visible');
            return;
        }
    } 

    else if (type === 'any') {
        let button = await page.locator(buttonText);
        if (button.isEnabled && button.isVisible) {
            let expected_url = await button.getAttribute('href');
            await button.click();
            let current_url = await page.url();

            if (current_url == expected_url) {
                console.log('URLs match. Expected:', expected_url, 'Actual:', current_url);
            } else {
                console.log('URLs do not match. Expected:', expected_url, 'Actual:', current_url);
            }
        } else {
            await page.screenshot({ path: 'failed_assertion.png' });
            test.fail('Button is not enabled and visible');
            return;
        }
            await page.goBack();
            return;
    } 
    
    else if (type === 'click') {
        let button = await page.locator(buttonText);

        if (button.isEnabled && button.isVisible) {
            await button.click();

        } 
        
        else {
            await page.screenshot({ path: 'failed_assertion.png' });
            test.fail('Button is not enabled and visible');
            return;
        }
    } 

    else {
        let button = await page.locator(`${type}:text("${buttonText}")`);

        if (button.isEnabled && button.isVisible) {
            let expected_url = await button.getAttribute('href');
            await button.click();
            let current_url = await page.url();

            if (current_url == expected_url) {
                console.log('URLs match. Expected:', expected_url, 'Actual:', current_url);
            } else {
                console.log('URLs do not match. Expected:', expected_url, 'Actual:', current_url);
            }
        } else {
            throw new Error('Button is not enabled and visible');
        }
    }

}



async function hoverOverMenu(page, menuName) {
    const menuElement = await page.locator(`text="${menuName}"`);
    await menuElement.hover();
}

async function selectDropdown(page, option) {
    // Select the desired option from the dropdown.
    const selectedOption = 'Your Selected Option';
    await page.locator('select[name="department"]').selectOption(option);

    // Locate all card elements.
    const cardElements = await page.$$('.career-slider-card-content');

    // Iterate through the card elements and verify the category.
    for (const card of cardElements) {
        const categoryElement = await card.$('h5');
        const categoryText = await categoryElement.textContent();
        test.expect(categoryText).toEqual(option);
        
        if (categoryText !== option) {
            console.log('Category does not match for a card:', categoryText);
        }
    }
}

// Add more utility functions as needed

module.exports = { clickButtonByText, hoverOverMenu , selectDropdown};