const {test , expect} = require('@playwright/test')
const utils = require('../../common_utilities/utilities.spec');
const { time, assert } = require('console');
const { equal } = require('assert');

test('Login with API Validation', async({request, page}) => {

     await test.step('Go to the Home page', async ()=> {
        await page.goto('https://bookanbe.addwebprojects.com/accounts/login/')    
    });

        await test.step('Validate the title of the page', async ()=> {
        await expect(page).toHaveTitle(" Login Account ")
    });

    let email = await page.locator('#id_username');
    let pass = await page.locator('#id_password');
    let submit = await page.locator('.auth-form-btn');

    await email.type('aayushi.d@addwebsolution.in');
    await pass.type('Addweb@123');
    await submit.click();

    await page.waitForTimeout(5000);

    let account_link = await page.locator(`text="Accounts"`);

    await account_link.click();

    await page.waitForTimeout(5000);

    await test.step('Go to the Login page', async ()=> {
        await page.goto('https://linkfluencerstg.addwebprojects.com/admin/login')    
    });

    await test.step('Validate the title of the page', async ()=> {
        await expect(page).toHaveTitle("Linkfluencer")
    });

    await test.step('Enter Email and Password', async ()=> {
        let email = await page.locator('#email');
        let pass = await page.locator('#password');
        let submit = await page.locator('.btn-primary');

        await email.type('rutu@yopmail.com');
        await pass.type('Addweb@123');
        await submit.click();

        await page.waitForTimeout(5000);

        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    });

    await test.step('Validate the API response for Login', async ()=> {

        const formData = new URLSearchParams();
        formData.append('email', 'rutu@yopmail.com');
        formData.append('password', 'Addweb@123');

        const response = await request.post('https://linkfluencerstg.addwebprojects.com/api/v1/login',{
            headers:{
                'Accept': 'application/json',
            },
            data:{
                 "email": "rutu@yopmail.com",
                 "password": "Addweb@123",    
            }
        })

        // Get response status code
        const statusCode = response.status();

        // Get response body
        const response_json = await response.json();

        console.log("message : " , response_json.message);
        console.log("Data : " , response_json.data);
        console.log("email : " , response_json.data.email);

        // Validate response status code and body
        if (statusCode === 200 && response_json.data.email == 'rutu@yopmail.com') {
            console.log('Login successful.');
            console.log('Response body:', response_json);
        } else {
            console.error('Login failed. Status code:', statusCode);
            console.error('Response body:', response_json);
        }
    });

}) 