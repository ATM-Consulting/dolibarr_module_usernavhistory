// @ts-check


const { test, expect } = require('@playwright/test');


//
import { checkModuleActivated, checkUserLogged } from './../../moduleUtilsPlaywright';



test.describe('Test page configuration  Module administration', () => {

	// We must log in and be sure module tested is activated  before each tests
	test.beforeEach(async ({ page }) => {

		// Appel des fonctions de vérifications
		await checkUserLogged(page);
		await checkModuleActivated(page);

	});

	test('T-01 Div Open config Module', async ({ page }) => {
		// Localisez le lien en utilisant une combinaison d'attributs
		const configLink = page.locator('a[href*="/custom/usernavhistory/admin/setup.php"][title="Configuration"]');

		// Vérifiez que le lien est visible
		await expect(configLink).toBeVisible();

		// Cliquez sur le lien
		await configLink.click();

		// Vérifiez que nous sommes bien sur la nouvelle page
		await expect(page).toHaveURL(/\/custom\/usernavhistory\/admin\/setup\.php/);

	});
	// test mise à jour de conf
	test('T-02 update Conf value max', async ({ page }) => {

		// Localisez le lien en utilisant une combinaison d'attributs
		const configLink = page.locator('a[href*="/custom/usernavhistory/admin/setup.php"][title="Configuration"]');

		// Vérifiez que le lien est visible
		await expect(configLink).toBeVisible();

		// Cliquez sur le lien
		await configLink.click();
		// Localiser le lien "Modifier"
		const modifierLink = page.getByRole('link', { name: 'Modifier' });

		// Vérifier que le lien est visible avant de cliquer
		await expect(modifierLink).toBeVisible();

		// Cliquer sur le lien
		await modifierLink.click();

		// Vérifications après le clic
		//-------------------------
		// Vérifier si l'URL a changé
		await expect(page).toHaveURL(/\/?action=edit/);
		// Localiser le champ de saisie
		const inputField = page.locator('#setup-USERNAVHISTORY_MAX_ELEMENT_NUMBER');
		// Vérifier que le champ est visible et interactif
		await expect(inputField).toBeVisible();
		await expect(inputField).toBeEditable();

		// Effacer le contenu actuel et saisir la nouvelle valeur
		await inputField.clear();
		await inputField.fill('2');

		// Vérifier que la valeur a bien été changée
		await expect(inputField).toHaveValue('2');

		// Localiser et cliquer sur le bouton Enregistrer
		const saveButton = page.getByRole('button', { name: 'Enregistrer' });
		await expect(saveButton).toBeVisible();
		await saveButton.click();
		await page.reload();


		// Localiser l'élément avec le rôle 'cell' et le nom '2'
		const cellElement = page.getByRole('cell', { name: '2' });

		// Vérifier si l'élément est présent
		await expect(cellElement).toBeVisible();

		// seteventMessage visible et ok
		//-------------------------------------------------------
		// Localiser le message de confirmation

	});

	test('T-03 should apply configuration settings correctly', async ({ page }) => {
		//

	});


});


