describe('Todo List', () => {
  describe('Given I on the Todo list page', () => {
    before(() => {
      cy.visit('/');
    });

    it('Then I see the empty state message', () => {
      cy.findByText('No tasks in the list.').should('be.visible');
    });

    context('When I click on the Add task button And type the task name And click Save button', () => {
      beforeEach(() => {
        cy.findByText('Add task').click();
        cy.findAllByPlaceholderText('Task name').type('This is first task');
        cy.findAllByPlaceholderText('Description').type('This is task description');

        cy.findByText('Save').click();
      });

      it('Then I see the new task on the list', () => {
        cy.findByText('This is first task').should('be.visible');
        cy.findByText('This is task description').should('be.visible');
      });
    });

    context('When I add more 5 tasks', () => {
      const tasks = [
        {
          name: 'Clear out garage',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          priority: 'High',
        },
        {
          name: 'Call Mom',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          priority: 'Normal',
        },
        {
          name: 'Meet Julie for coffee',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          priority: 'Medium',
        },
      ];

      before(() => {
        tasks.forEach(task => {
          cy.findAllByPlaceholderText('Task name').type(task.name);
          cy.findAllByPlaceholderText('Description').type(task.description);
          cy.get('[data-cy="priority-selection-button"]').first().click();
          cy.findByText(task.priority).click();
          cy.findByText('Save').click();
        });
      });

      it('Then I see the total is 6 tasks', () => {
        cy.findByText('Total: 4').should('be.visible');
      });

      it('Then I see the fist task of the task list is: ' + tasks[tasks.length - 1].name, () => {
        cy.get('[data-cy="task-name"]')
          .first()
          .should('have.text', tasks[tasks.length - 1].name);
      });

      context('When I select sort by task name', () => {
        beforeEach(() => {
          cy.get('[data-cy="sort-by-button"]').first().click();
          cy.findByText('Name').click();
        });

        it('Then I see the fist task of the task list is: Call Mom', () => {
          cy.get('[data-cy="task-name"]').first().should('have.text', 'Call Mom');
        });
      });

      context('When I select sort by task priority', () => {
        beforeEach(() => {
          cy.get('[data-cy="sort-by-button"]').first().click();
          cy.findByText('Priority').click();
        });

        it('Then I see the fist task of the task list is: Clear out garage', () => {
          cy.get('[data-cy="task-name"]').first().should('have.text', 'Clear out garage');
        });
      });

      context('And When I delete first task', () => {
        beforeEach(() => {
          cy.get('[data-cy="delete-task-button"]').first().click();
          cy.findByText('Delete').click();
        });

        it('Then I see the total task count is 5', () => {
          cy.findByText('Total: 3').should('be.visible');
        });
      });

      context('And When I click on the checkbox of the first task', () => {
        beforeEach(() => {
          cy.get('[data-cy="task-item"] input').first().click();
        });

        it('Then I see the completed tasks is 1', () => {
          cy.findByText('Completed: 1').should('be.visible');
        });
      });
    });
  });
});
