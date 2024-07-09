// @ts-check


const { test, expect } = require('@playwright/test');
import {URL_TO_USE, THIRDPARTY_NAME} from './../ConfigLocal.spec';
import { checkModuleActivated, checkUserLogged } from './../moduleUtilsPlaywright';

test.describe.configure({ mode: 'serial' });

test.describe('Test page configuration  Module administration', () => {
// We must log in and be sure module tested is activated  before each tests
	test.beforeEach(async ({ page }) => {

		// Appel des fonctions de vérifications
		await checkUserLogged(page);
		await checkModuleActivated(page);

	});
	test('Div Open config Module', async ({ page }) => {
		// Localisez le lien en utilisant une combinaison d'attributs
		const configLink = page.locator('a[href*="/custom/usernavhistory/admin/setup.php"][title="Configuration"]');

		// Vérifiez que le lien est visible
		await expect(configLink).toBeVisible();

		// Cliquez sur le lien
		await configLink.click();

		// Vérifiez que nous sommes bien sur la nouvelle page
		await expect(page).toHaveURL(/\/custom\/usernavhistory\/admin\/setup\.php/);

	});
	test('update Conf value max', async ({ page }) => {

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

		// seteventMessage visible et ok
		//-------------------------------------------------------
		// Localiser le message de confirmation
		const confirmationMessage = page.locator('div').filter({ hasText: 'Configuration sauvegardée' }).nth(2);

		// Vérifier que le message est visible
		await expect(confirmationMessage).toBeVisible({ timeout: 3000 });

		// Vérifier le texte exact du message
		const messageText = await confirmationMessage.textContent();
		expect(messageText.trim()).toBe('Configuration sauvegardée');

		// Vérifier si le message disparaît après un certain temps
		await expect(confirmationMessage).toBeHidden({ timeout: 5000 });
	});
});


test.describe('Test lien visible', () => {

    // We must log in and be sure module tested is activated  before each tests
    test.beforeEach(async ({ page }) => {

		// Appel des fonctions de vérifications
		await checkUserLogged(page);
		await checkModuleActivated(page);

    });

	// Test div visible sur la page top
	test('Div unh visible on index.php', async ({ page }) => {
		await page.goto(URL_TO_USE + 'index.php/');
		const element  = page.locator('.usernavhistory');
		// Vérifier si l'élément existe
		await expect(element).toBeVisible();
	});

	/**
	 * CRÉATION OBJECT DEPENDANT DU TEST
	 * DE VISUALISATION DU BREADCRUMB DE L'OBJECT SELECTIONNÉ
	 */
	test('Creation Thirdparty test (only mandatory)', async({page}) => {
		await page.goto(URL_TO_USE + 'societe/card.php?action=create&mainmenu=companies');


		// Thirdparty name
		await page.locator('#name').fill(THIRDPARTY_NAME);

		// Thirdparty alias
		await page.locator('#name_alias_input').fill('[Playwright]');

		// Set thirdparty as "Customer only"
		await page.locator('#customerprospect').selectOption('1');

		// Set thirdparty as "Not Supplier"
		await page.locator('#fournisseur').selectOption('0');

		// Submit form
		await page.getByRole('button', { name: 'Créer tiers' }).click();

		await expect(page).toHaveTitle(THIRDPARTY_NAME+' - Fiche');
	});
	// test presence navhistory tiers créé
	test(' BREADCRUM Tiers VISIBLE ', async({page}) => {
		await page.goto(URL_TO_USE + 'societe/index.php?mainmenu=companies');

		// ===== JUST THE BEGINNING =====
		await page.getByRole('link', { name: 'Liste', exact: true }).first().click();
		await expect(page).toHaveTitle('Tiers');
		await expect(page).toHaveURL(/societe\/list\.php/);
		let firstRecord = page.getByRole('link', { name: THIRDPARTY_NAME });
		if(await firstRecord.count() > 1) firstRecord = firstRecord.first();
		await expect(firstRecord).toBeVisible();
		await firstRecord.click();
		await expect(page).toHaveTitle(/Fiche$/);

		// Test presence lien breadcrum
		// Localiser l'élément li contenant au moins le texte "T-ATM"
		const element = page.locator('li').filter({ hasText: THIRDPARTY_NAME });
		// Vérifier si l'élément existe et est visible
		await expect(element).toBeVisible();
		// 2. Vérifier qu'il n'y a qu'un seul élément correspondant
		const count = await element.count();
		expect(count).toBe(1);

	});
	// suppression apres verification de la presence du breadcrumb du tier
	test('Deletion tiers', async({page}) => {
		await page.goto(URL_TO_USE + 'societe/index.php?mainmenu=companies');

		// ===== JUST THE BEGINNING =====
		await page.getByRole('link', { name: 'Liste', exact: true }).first().click();
		await expect(page).toHaveTitle('Tiers');
		await expect(page).toHaveURL(/societe\/list\.php/);

		// Click on the first record
		let firstRecord = page.getByRole('link', { name: THIRDPARTY_NAME });
		if(await firstRecord.count() > 1) firstRecord = firstRecord.first();

		await expect(firstRecord).toBeVisible();
		await firstRecord.click();

		await expect(page).toHaveTitle(/Fiche$/);

		const deleteButton = page.locator('#action-delete');
		await expect(deleteButton).toBeVisible();
		await expect(deleteButton).toBeEnabled();

		// ===== ACTUAL DELETION =====
		await deleteButton.click();
		await expect(page.locator('.statusref')).toBeVisible();

		const dialogYesButton = page.getByRole('button', { name: 'Oui' })
		await expect(dialogYesButton).toBeVisible();

		await dialogYesButton.click();
		await expect(page).toHaveURL(/societe\/list\.php/);
	});
});
