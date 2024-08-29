const { DATA_HOTEL_CREATION } = require('../../support/constants');

describe('Hotel Create 1411', () => {
  beforeEach(() => {
    // Đăng nhập admin
    cy.login();

    // Click Hotel trong Navigation
    cy.get('.sidebar-admin').trigger('mouseover');

    // Click Accommodation
    cy.get('.MuiTypography-body2').contains('Accommodation').click();

    // Click Hotel
    cy.get('.MuiTypography-body2').contains('Hotel').click();

    //Click nút Create Hotel
    cy.get('.MuiButton-colorPrimary').contains('Create Hotel').click();
  });

  it('Verify that the Hotel Vendor Creation will open when clicking "+ Create hotel" on listing', () => {
    // Kiểm tra xem popup có hiển thị hay không
    cy.get('h2.MuiTypography-h6').contains('Hotel Vendor Creation');
  });

  it('Display "Hotel Vendor Creation" popup includes below info: Hotel Name, Address, Illustration, ...', () => {
    // Kiểm tra xem Hotel Name * có hay không
    cy.get('form .MuiStack-root')
      .first()
      .within(() => {
        cy.contains('p', 'Hotel name').should('exist');
        cy.contains('p', '*').should('exist');
        cy.get('input[placeholder="Enter hotel name"]').should('exist');
      });

    // Kiểm tra xem Address * có hay không
    cy.get('form .MuiStack-root')
      .eq(1)
      .within(() => {
        cy.contains('p', 'Address').should('exist');
        cy.contains('p', '*').should('exist');
        cy.get('textarea[placeholder="Enter hotel address"]').should('exist');
      });

    // Kiểm tra xem Illustration có hay không
    cy.get('.MuiBox-root.ceh-0')
      .first()
      .within(() => {
        cy.contains('p.MuiTypography-gutterBottom', 'Illustration').should(
          'exist'
        );
        cy.get('input[type="file"]').should('exist');
      });

    cy.get('.MuiBox-root.ceh-0')
      .eq(1)
      .within(() => {
        // Kiểm tra xem Distance to CLV - Km(s) có hay không
        cy.get('.MuiBox-root')
          .first()
          .within(() => {
            cy.contains('p', 'Distance to CLV - Km(s)').should('exist');
            cy.get('input[placeholder="Enter distance"]').should('exist');
          });

        // Kiểm tra xem Distance to city center - Km(s) có hay không
        cy.get('.MuiBox-root')
          .eq(1)
          .within(() => {
            cy.contains('p', 'Distance to city center - Km(s)').should('exist');
            cy.get('input[placeholder="Enter distance"]').should('exist');
          });
      });

    cy.get('.MuiBox-root.ceh-0')
      .eq(2)
      .within(() => {
        // Kiểm tra xem Check-in time * có hay không
        cy.get('.MuiBox-root')
          .first()
          .within(() => {
            cy.contains('p', 'Check-in time').should('exist');
            cy.contains('p', '*').should('exist');
            cy.get('input[placeholder="hh:mm aa"]').should('exist');
          });

        // Kiểm tra xem Check-out time * có hay không
        cy.get('.MuiBox-root')
          .eq(1)
          .within(() => {
            cy.contains('p', 'Check-out time').should('exist');
            cy.contains('p', '*').should('exist');
            cy.get('input[placeholder="hh:mm aa"]').should('exist');
          });
      });

    // Kiểm tra xem Benefits có hay không
    cy.get('.MuiBox-root.ceh-0')
      .eq(3)
      .within(() => {
        cy.contains('p', 'Benefits').should('exist');
        cy.get('input[placeholder="Select benefit"]').should('exist');
      });

    // Kiểm tra xem Contact có hay không
    cy.get('form .MuiStack-root')
      .last()
      .within(() => {
        cy.contains('p', 'Contact').should('exist');
        cy.get('textarea[placeholder="Enter contact"]').should('exist');
      });

    // Check button Cancel và Create
    cy.get('button.MuiButton-colorPrimary').contains('Cancel').should('exist');

    cy.get('button.MuiButton-colorPrimary').contains('Create').should('exist');
  });

  it('Display tooltip when hovering the info icon located next to the Illustration', () => {
    cy.get('svg.iconify--icon-park-solid').trigger('mouseover');
    cy.get('.MuiTooltip-tooltip.MuiTooltip-tooltipArrow').within(() => {
      cy.get('p.MuiTypography-root')
        .first()
        .should('contain.text', 'Valid Format');
      cy.get('p.MuiTypography-root')
        .eq(1)
        .should('contain.text', 'File type: PNG or JPG');
      cy.get('p.MuiTypography-root')
        .last()
        .should('contain.text', 'Max size: 5MB');
    });
  });

  it('Upload invalid image (not PNG, JPG)', () => {
    cy.get('input[type="file"]').attachFile('pdf_sample.pdf', {
      subjectType: 'input',
    });

    cy.wait(500);

    cy.get('.MuiFormHelperText-root').should(
      'contain.text',
      'Failed to upload the image. The format is not supported.'
    );
  });

  it('Upload invalid image (over 5MB)', () => {
    cy.get('input[type="file"]').attachFile('image_10mb.jpg', {
      subjectType: 'input',
    });

    cy.wait(500);

    cy.get('.MuiFormHelperText-root').should(
      'contain.text',
      'Failed to upload the image. Your image is too large to upload (over 5MB).'
    );
  });

  it('Upload valid image', () => {
    cy.get('input[type="file"]').attachFile('valid_image.png', {
      subjectType: 'input',
    });

    cy.wait(500);

    cy.get('img[alt="Uploaded"]')
      .should('be.visible')
      .and($img => {
        // Kiểm tra tỉ lệ 1:1 bằng cách so sánh chiều rộng và chiều cao
        const width = $img[0].naturalWidth;
        const height = $img[0].naturalHeight;
        expect(width).to.equal(height, 'Image is not 1:1 ratio');
      });

    cy.get('button[aria-label="Delete"]').should('exist');
    cy.get('button[aria-label="Replace"]').should('exist');
  });

  it('Click on replace icon re-upload another image as well, click on delete icon disappearing that image on Illustration section', () => {
    cy.get('input[type="file"]').attachFile('valid_image.png', {
      subjectType: 'input',
    });

    cy.wait(500);

    cy.get('button[aria-label="Replace"]').should('exist').click();

    cy.get('input[type="file"]').should('exist');

    cy.get('button[aria-label="Delete"]').should('exist').click();

    cy.wait(500);

    cy.get('img[alt="Uploaded"]').should('not.exist');
  });

  it('Create new Hotel successfully without illustration', () => {
    cy.get('input[placeholder="Enter hotel name"]').type(
      DATA_HOTEL_CREATION.hotelName
    );

    cy.get('textarea[placeholder="Enter hotel address"]').type(
      DATA_HOTEL_CREATION.address
    );

    cy.get('input[placeholder="Enter distance"]')
      .first()
      .type(DATA_HOTEL_CREATION.distanceToCLV);

    cy.get('input[placeholder="Enter distance"]')
      .eq(1)
      .type(DATA_HOTEL_CREATION.distanceToCityCenter);

    cy.get('input[placeholder="hh:mm aa"]')
      .first()
      .type(DATA_HOTEL_CREATION.checkInTime);

    cy.get('input[placeholder="hh:mm aa"]')
      .eq(1)
      .type(DATA_HOTEL_CREATION.checkOutTime);

    cy.get('textarea[placeholder="Enter contact"]').type(
      DATA_HOTEL_CREATION.contact
    );

    cy.get('#testing-multiple-form-2').click();

    cy.wait(500);

    cy.get('#ceh-customized-hook-listbox')
      .children()
      .eq(0)
      .should('exist')
      .click();
    cy.get('#ceh-customized-hook-listbox')
      .children()
      .eq(1)
      .should('exist')
      .click();

    cy.get('body').type('{esc}');

    cy.get('.MuiDialog-root').within(() => {
      cy.get('button.MuiButton-colorPrimary')
        .contains('Create')
        .should('exist')
        .click();
    });
  });
});
