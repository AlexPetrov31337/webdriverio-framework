describe('Fleetpal TEST', () => {

    it('TC-01 Verify that the "Create Vendor" form consists of three sections', async() => {
        await browser.maximizeWindow();
        await browser.url('https://testing.fleetpal.io/vendors/create');


        const emailAddress = await $('#email');
        const password = await $('#password');
        const submitButton = await $('//button[text()="Sign in"]');

        await emailAddress.setValue("adx1@abv.bg");
        await password.setValue("Alpetrov31337$");
        await submitButton.click();

        const CompanyDetails = await $('//p[text()="Company Details"]');
        await expect(CompanyDetails).toHaveText('Company Details');

        const CDweight = await CompanyDetails.getCSSProperty('font-weight');

        const Address = await $('//p[text()="Address"]');
        await expect(Address).toHaveText('Address');

        const Addressweight = await Address.getCSSProperty('font-weight');

        const FinInf =await $('//p[text()="Financial Information"]');
        await expect(FinInf).toHaveText('Financial Information');

        const FinInfweight = await FinInf.getCSSProperty('font-weight');


    });

    it('TC-02 Verify the controls in the "Company Details" section', async() => {

        const VendorsType = await $('#vendors-type');
        await expect(VendorsType).toBeClickable();

        const VendorsName = await $('#vendors-name');
        await expect(VendorsName).toBeClickable();

        const UploadLogo = await $('//span[contains(text(),"Upload Logo")]');
        await expect(UploadLogo).toHaveTextContaining('UPLOAD LOGO');
        await expect(UploadLogo).toBeClickable();

        const VendorsPhone = await $('#vendors-phone');
        await expect(VendorsPhone).toBeClickable();

        const VendorsEmail = await $('#vendors-email');
        await expect(VendorsEmail).toBeClickable();

        const VendorsWebsite = await $('#vendors-website');
        await expect(VendorsWebsite).toBeClickable();

    });


    it('TC-03 Verify the controls in the "Address" section', async() => {

        const vendorsaddress = await $('#vendors-address');
        await expect(vendorsaddress).toBeClickable();

        const vendorsaddress2 = await $('#vendors-address2');
        await expect(vendorsaddress2).toBeClickable();

        const vendorsstateBTN = await $('#vendors-state');
        await expect(vendorsstateBTN).toBeClickable();
        await vendorsstateBTN.click();

        const NCbtn = await $('//li[contains(text(),"NC")]');
        await NCbtn.click();

        const Zip = await $('#vendors-zip_code');
        await Zip.setValue("9000");



    });

    it ('TC-04 Verify the controls in the "Financial Information" section', async() => {

        const vendorstaxid = await $('#vendors-tax_id');
        await vendorstaxid.setValue("test");

        const vendorsnationalaccountlabel = await $('#vendors-national_account-label');
        await vendorsnationalaccountlabel.isDisplayed();   // not clickable; can't input test

        const vendorspaymentmethod = await $('#vendors-payment_method');
        await expect(vendorspaymentmethod).toBeClickable();       // open iframe and block webpage

        const paymenttermspaymentterm = await $('#payment-terms-payment_term');
        await paymenttermspaymentterm.click();

        const Net60 = await $('//div[contains(text(),"Net 60")]');
        await Net60.isDisplayed();              // not clickable; can't input test



    });


    it ('TC-05 Validate the "Create button" ', async() => {

        await browser.newWindow('https://testing.fleetpal.io/vendors');

        const CreateBTN = await $('//a[text()="Create Vendor"]');
        await CreateBTN.isDisplayed();
        await expect(CreateBTN).toBeClickable();
        await CreateBTN.click();

        const CreateDisBTN = await $('//button[text()="CREATE"]');
        await CreateDisBTN.isDisplayed();
        await CreateDisBTN.isClickable();

        // const CreateDisBTN = await CreateDisBTN.getCSSProperty('font-weight');     can't find any  CSSProperty

    });

    it ('TC-06 Verify that the "Name" text field is marked as required', async() => {

        await browser.url('https://testing.fleetpal.io/vendors/create');

        const CreateBTN1 = await $('//button[text()="CREATE"]');
        await expect(CreateBTN1).toBeDisplayed();
        await expect(CreateBTN1).toBeDisabled();


        const VendorsName = await $('#vendors-name');
        await expect(VendorsName).toBeClickable();

        await VendorsName.setValue("TEST123");

        await expect(CreateBTN1).toBeDisplayed();
        await expect(CreateBTN1).toBeEnabled();

        await VendorsName.clearValue(); //clearValue is not functioning

        console.log(VendorsName);

        await VendorsName.clearValue();
        await VendorsName.setValue("TEST456"); //clearValue is not functioning




    });

    it ('TC-07 Verify that the "Name" text field accepts up to 70 characters', async() => {

        await browser.newWindow('https://testing.fleetpal.io/vendors/create');

        const VendorsName = await $('#vendors-name');
        await VendorsName.setValue("ABCD Consulting Services");

        const CreateBTN1 = await $('//button[text()="CREATE"]');
        await expect(CreateBTN1).toBeDisplayed();
        await expect(CreateBTN1).toBeEnabled();
        await VendorsName.clearValue();
        await VendorsName.setValue("asdfghjkl /werthfghjmnki23sdf13453455we4567803456056785hjfj fjgktktktkyt2");

        await expect(CreateBTN1).toBeDisplayed();
        await expect(CreateBTN1).toBeDisabled();


    });

    it ('TC-08 Verify that an error message appears when more than 70 characters are entered in the "Name" text field ', async() => {

        await browser.newWindow('https://testing.fleetpal.io/vendors/create');

        const VendorsName = await $('#vendors-name');
        await VendorsName.setValue("asdfghjkl /werthfghjmnki23sdf13453455we4567803456056785hjfj fjgktktktkytmm");

        const Message = await $('#vendors-name-helper-text');
        await expect(Message).toBeDisplayed();
        await VendorsName.clearValue();
        await VendorsName.setValue("asdfghjkl /werthfghjmnki23sdf13453455we4567803456056785hjfj fjgktktktkyt2asdfghjkl");
        await expect(Message).toBeDisplayed();


    });

    it ('TC-09 Verify that the "Name" field accepts only unique values within the company', async() => {
        await browser.newWindow('https://testing.fleetpal.io/vendors/create');

        const VendorsName = await $('#vendors-name');
        await VendorsName.setValue("ABCD Payment Services 2");
        const CreateBTN2 = await $('//button[text()="CREATE"]');
        await CreateBTN2.click();

        await browser.newWindow('https://testing.fleetpal.io/vendors/create');
        await VendorsName.setValue("ABCD Payment Services 2");
        await CreateBTN2.click();
        const Message = await $('#vendors-name-helper-text');
        await expect(Message).toBeDisplayed();
        await expect(Message).toHaveTextContaining('Vendor name exists');


    });

    it ('TC-10 Verify that the "Vendor type" field is predefined and not editable.', async() => {

        await browser.newWindow('https://testing.fleetpal.io/vendors/create');

        const VendorType = await $('#vendors-type');
        await expect(VendorType).toBeDisplayed();
        await VendorType.isEnabled();
        await expect(VendorType).toBeClickable();
        await expect(VendorType).not.toBeSelected();




    });

    

});
