it('should update the stats', () => {
	cy.visit('/u/text-counter')

	cy
		.findAllByPlaceholderText('Start writing here...')
		.type('This is a simple test for the text counter.')

	cy.findAllByTestId('collapse').filter(':contains("Stats")').last().as('stats')

	cy.get('@stats').findByTestId('stat-value-characters').should('have.text', '43')
	cy.get('@stats').findByTestId('stat-value-whitespaces').should('have.text', '8')
	cy.get('@stats').findByTestId('stat-value-sentences').should('have.text', '1')
	cy.get('@stats').findByTestId('stat-value-paragraphs').should('have.text', '1')

	cy.findAllByPlaceholderText('Start writing here...').type('{enter}{enter}This is a new line. With two paragraphs.')

	cy.get('@stats').findByTestId('stat-value-words').should('have.text', '17')
	cy.get('@stats').findByTestId('stat-value-characters').should('have.text', '85')
	cy.get('@stats').findByTestId('stat-value-whitespaces').should('have.text', '16')
	cy.get('@stats').findByTestId('stat-value-sentences').should('have.text', '3')
	cy.get('@stats').findByTestId('stat-value-paragraphs').should('have.text', '2')
})

it('should expand/collapse', () => {
	const width = 800
	const height = 600

	cy.viewport(width, height)
	cy.visit('/u/text-counter')

	cy.findByRole('button', { name: 'expand' }).click()

	cy.findByTestId('text-counter').as('text-counter')

	cy.get('@text-counter').should('have.css', 'height', `${height}px`)
	cy.get('@text-counter').should('have.css', 'width', `${width}px`)
	cy.get('@text-counter').should('have.css', 'position', 'fixed')

	cy.findByRole('button', { name: 'collapse' }).click()

	cy.get('@text-counter').should('not.have.css', 'position', 'fixed')
})

it('should update the keywords', () => {
	cy.visit('/u/text-counter')

	cy
		.findAllByPlaceholderText('Start writing here...')
		.type('This is a simple test for the text counter with words repeated here and there. This simple test')

	cy.findAllByTestId('collapse').filter(':contains("Keywords")').last().as('keywords')

	cy.get('@keywords')
		.findByTestId('collapse-toggle')
		.last()
		.check()

	cy.get('@keywords').findByTestId('keyword-0-label').invoke('text').should('match', /(this|simple|test):/i)
	cy.get('@keywords').findByTestId('keyword-0').should('have.text', '2 (11%)')
	cy.get('@keywords').findByTestId('keyword-1-label').invoke('text').should('match', /(this|simple|test):/i)
	cy.get('@keywords').findByTestId('keyword-1').should('have.text', '2 (11%)')
	cy.get('@keywords').findByTestId('keyword-2-label').invoke('text').should('match', /(this|simple|test):/i)
	cy.get('@keywords').findByTestId('keyword-2').should('have.text', '2 (11%)')
})

it('should display only the first 5 keywords', () => {
	cy.visit('/u/text-counter')

	cy
		.findAllByPlaceholderText('Start writing here...')
		.type('This is a simple test for the text counter with words repeated here and there. This simple test')

	cy.findAllByTestId('collapse').filter(':contains("Keywords")').last().as('keywords')

	cy.get('@keywords')
		.findByTestId('collapse-toggle')
		.last()
		.check()

	cy.get('@keywords').findAllByTestId('keyword-list').children().should('have.length', 5)
})

it('should allow to show more keywords', () => {
	cy.visit('/u/text-counter')

	cy
		.findAllByPlaceholderText('Start writing here...')
		.type('This is a simple test for the text counter with words repeated here and there. This simple test')

	cy.findAllByTestId('collapse').filter(':contains("Keywords")').last().as('keywords')

	cy.get('@keywords')
		.findByTestId('collapse-toggle')
		.last()
		.check()

	cy.get('@keywords').findAllByTestId('keyword-list').children().should('have.length', 5)

	cy.get('@keywords').findAllByText('Show more').click()

	cy.get('@keywords').findAllByTestId('keyword-list').children().should('have.length', 15)

	cy.get('@keywords').findAllByText('Show less').click()

	cy.get('@keywords').findAllByTestId('keyword-list').children().should('have.length', 5)
})
