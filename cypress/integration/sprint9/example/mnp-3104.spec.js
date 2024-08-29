const dataGroupCreation = {
  step1: {
    groupName: 'Group Special 1',
    description: 'Group Special 1 Description',
  },
};

describe('[GGROUP][STEP2]: Change Step Icon and Step Label', () => {
  before(() => {
    cy.login();

    // Di chuyển tới trang /group-list
    cy.visit('/group-list');

    // Tìm và nhấn vào nút có text là "Create Group"
    cy.contains('button', 'Create Group').should('exist').click();

    // Kiểm tra xem có modal được bật lên hay không
    cy.get('.MuiTypography-h6.MuiDialogTitle-root').should(
      'contain.text',
      'Group Creation'
    );
  });

  it('should check step 1 in guest group list creation', () => {
    // Kiểm tra xem step 1 có active hay không
    cy.get('.MuiStepLabel-label.Mui-active').should(
      'contain.text',
      'General Information'
    );

    // Nhập STEP 1 Group Name
    cy.get('input[placeholder="Enter group name"]')
      .should('exist')
      .type(dataGroupCreation.step1.groupName);

    // Nhập STEP 2 Duration Start date
    cy.get('p.MuiTypography-body2').contains('Start date').click();

    // Lấy ngày hiện tại và chọn Start Date (vd: 1-31)
    const today = new Date().getDate();

    // Chọn ngày hiện tại cho Start Date
    cy.get('button.MuiPickersDay-dayWithMargin').contains(today).click();

    // Bấm ra ngoài để thoát
    cy.get('body').type('{esc}');

    // Nhập STEP 2 Duration End date
    cy.get('p.MuiTypography-body2').contains('End date (Optional)').click();
    cy.get('button.MuiPickersDay-dayWithMargin').contains(today).click();

    // Bấm ra ngoài để thoát
    cy.get('body').type('{esc}');

    // Nhập hotline contact
    cy.get('#testing-multiple-form-2').click();

    // Chọn 2 item đầu
    cy.get('.MuiListItem-root.MuiListItem-gutters').eq(0).click();
    cy.get('.MuiListItem-root.MuiListItem-gutters').eq(1).click();

    // Bấm ra ngoài để thoát
    cy.get('body').type('{esc}');

    // Nhập description
    cy.get('textarea[placeholder="Enter description"]').type(
      dataGroupCreation.step1.description
    );

    // Nhấn nút Next qua Step 2
    cy.get('button').contains('Next').click();
  });
});
