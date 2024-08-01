// @ts-check


const { test, expect } = require('@playwright/test');
// INTERNAL VALUES
import {URL_TO_USE, THIRDPARTY_NAME} from './../../ConfigLocal.spec';



import { checkModuleActivated, checkUserLogged  } from './../../moduleUtilsPlaywright';




test.describe('T-01 Should see icon module on top left', () => {

    // We must log in and be sure module tested is activated  before each tests
    test.beforeEach(async ({ page }) => {
		// Appel des fonctions de vérifications
		await checkUserLogged(page);
		await checkModuleActivated(page);
    });

	// Test div visible sur la page top
	test('T-01-1 Div unh visible on index.php', async ({ page }) => {
		await page.goto(URL_TO_USE + 'index.php/');
		const element  = page.locator('.usernavhistory');
		// Vérifier si l'élément existe
		await expect(element).toBeVisible();
	});


});



// Test de visibilité d'un élément après séléction dans la liste usernavHistory
test.describe('T-02 Main test link on nav', () => {
	// We must log in and be sure module tested is activated  before each tests
	test.beforeEach(async ({ page }) => {
		// Appel des fonctions de vérifications
		await checkUserLogged(page);
		await checkModuleActivated(page);
	});
	test('T-02-1 should see thirdparty on nav module ', async({page}) => {
		await page.goto(URL_TO_USE + 'societe/index.php?mainmenu=companies');

		// ===== JUST THE BEGINNING =====
		await page.getByRole('link', { name: 'Liste', exact: true }).first().click();
		await expect(page).toHaveTitle('Tiers');
		await expect(page).toHaveURL(/societe\/list\.php/);

		const firstRecord = page.locator(`a.classfortooltip.refurl.valignmiddle:has-text("${THIRDPARTY_NAME}")`).first();
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

});
