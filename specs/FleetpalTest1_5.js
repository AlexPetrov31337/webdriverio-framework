describe('Fleetpal TEST', () => {
    // beforeEach(async () => {            
    //     await browser.maximizeWindow();
    //     await browser.url('https://testing.fleetpal.io/login');
    //     const EmailAddress = await $('#email');
    //     const Password = await $('#password');
    //     const SubmitButton = await $('//button[text()="Sign in"]');
    //     await EmailAddress.setValue("adx1@abv.bg");
    //     await Password.setValue("Alpetrov31337$");
    //     await SubmitButton.click();
    //     await browser.pause(5000);                   // Solve the problem with false 'Log in'
    // });
    // afterEach    
    //     Can't find button element for log out.  Can not log out.
    //     When the test is started, the user is logged on. Can not log in before each case.
    // });
    
    it ('TC-01 Verify that the "Create Vendor" form consists of three sections', async() => {
        
        await browser.maximizeWindow();
        await browser.url('https://testing.fleetpal.io/login');
        const EmailAddress = await $('#email');
        const Password = await $('#password');
        const SubmitButton = await $('//button[text()="Sign in"]');
        await EmailAddress.setValue("adx1@abv.bg");
        await Password.setValue("Alpetrov31337$");
        await SubmitButton.click();
        await browser.pause(7000);  

        await browser.url('https://testing.fleetpal.io/vendors/create');
        const CompanyDetails = await $('//p[text()="Company Details"]');
        await expect(CompanyDetails).toHaveText('Company Details');
        await CompanyDetails.isDisplayed();    // 1. 'Company Details' are visible on the page
        const CompanyDetailsFontWeight = await CompanyDetails.getCSSProperty('font-weight'); // The headings are bolded and readable
        console.log(CompanyDetailsFontWeight); // 2. The headings are bolded ??? Can't compare getCSSProperty with 'toHaveText', 'toHaveValueContaining' etc. 
        
        const Address = await $('//p[text()="Address"]');
        await expect(Address).toHaveText('Address');
        await Address.isDisplayed(); // 1. 'Address' is visible on the page
        const AddressWeight = await Address.getCSSProperty('font-weight'); 
        console.log(AddressWeight); // 2. The headings are bolded ??? Can't compare getCSSProperty with 'toHaveText', 'toHaveValueContaining' etc.
        
        const FinInfo =await $('//p[text()="Financial Information"]'); 
        await expect(FinInfo).toHaveText('Financial Information');
        await FinInfo.isDisplayed(); //Financial Information is visible on the page
        const FinInfoWeight = await FinInfo.getCSSProperty('font-weight');
        console.log(FinInfoWeight); // 2. The headings are bolded ??? Can't compare getCSSProperty with 'toHaveText', 'toHaveValueContaining' etc.
    });

    it('TC-02 Verify the controls in the "Company Details" section', async() => {
        
        const VendorsName = await $('#vendors-name');
        await expect(VendorsName).toBeDisplayed();
        await expect(VendorsName).toBeClickable(); // 1. Name field is available.
        
        const VendorsType = await $('#vendors-type');
        await expect(VendorsType).toBeDisplayed(); // 1. Vendor type field is available.

        const UploadLogo = await $('//span[contains(text(),"Upload Logo")]');
        await expect(UploadLogo).toBeDisplayed();
        await expect(UploadLogo).toBeClickable(); // 1. Upload photo tool is available.

        const VendorsPhone = await $('#vendors-phone');
        await expect(VendorsPhone).toBeDisplayed();
        await expect(VendorsPhone).toBeClickable(); // 1. Company phone field is available.

        const VendorsEmail = await $('#vendors-email');
        await expect(VendorsEmail).toBeDisplayed();
        await expect(VendorsEmail).toBeClickable(); // 1. Company email is available.

        const VendorsWebsite = await $('#vendors-website');
        await expect(VendorsWebsite).toBeDisplayed();
        await expect(VendorsWebsite).toBeClickable(); // 1. Company Website field is available.
        // 2. The elements are aligned ???
    });

    it ('TC-03 Verify the controls in the "Address" section', async() => {

        const AddressLine1 = await $('#vendors-address');
        await expect(AddressLine1).toBeClickable();
        await expect(AddressLine1).toBeDisplayed(); // 1. Street Address field is available.

        const AddressLine2 = await $('#vendors-address2');
        await expect(AddressLine2).toBeClickable();
        await expect(AddressLine2).toBeDisplayed(); // 1. Address line 2 is available.
        
        const City = await $('#vendors-city');
        await expect(City).toBeClickable();
        await expect(City).toBeDisplayed(); // 1. City is available.
        
        const ZipCode = await $('#vendors-zipCode');
        await expect(ZipCode).toBeClickable();
        await expect(ZipCode).toBeDisplayed(); // 1.  ZIP code field is available.
       
        const VendorsStateButton = await $('#vendors-state');
        await expect(VendorsStateButton).toBeClickable();
        await expect(VendorsStateButton).toBeDisplayed(); // 1. State dropdown list is available.
        await VendorsStateButton.click(); 
        const WyomingButton = await $('//li[contains(text(),"WY")]');
        await WyomingButton.click();    //2. The section can be expanded and collapsed
        await browser.pause(2000);
        // 3. The elements are aligned ???
    });

    it ('TC-04 Verify the controls in the "Financial Information" section', async() => {
        
        const TaxId = await $('#vendors-taxId');
        await expect(TaxId).toBeDisplayed();
        await expect(TaxId).toBeClickable(); // 1. Tax ID field is available.

        const NationaAccount = await $('#vendors-nationalAccount');
        await expect(NationaAccount).toBeDisplayed();
        await expect(NationaAccount).toBeClickable(); // 1. National Account field is available.

        const DefaultPaymentMethod = await $('#vendors-paymentMethod');
        await expect(DefaultPaymentMethod).toBeDisplayed();
        await expect(DefaultPaymentMethod).toBeClickable(); // 1. Default payment dropdown is available.

        const DefaultPaymentTerm = await $('#payment-terms-paymentTerm');
        await expect(DefaultPaymentTerm).toBeDisplayed();
        await expect(DefaultPaymentTerm).toBeClickable(); // 1. Default payment term dropdown list are available.
        // 2. 2. The elements are aligned ???
    });


    it ('TC-05 Validate the "Create button" ', async() => {
        
        // 1. The 'CREATE' button is positioned in the top right corner of the 'Create Vendor' page ???
        // 2. The 'Create button has a rectangular shape. There is a '+' icon on the button ???
        
        const CreateButton = await $('//button[text()="CREATE"]');
        await expect(CreateButton).toBeDisplayed();
        await expect(CreateButton).not.toBeClickable(); // 3. The button is transparent and cannot be clicked when in disabled state
        
        const VendorsName = await $('#vendors-name');
        await VendorsName.setValue("TEST123");
        await expect(CreateButton).toBeDisplayed();
        await expect(CreateButton).toBeClickable(); // 4. The button is highlighted on hover ??? and can be clicked when in enabled state.
        await browser.pause(4000);
    });
});
